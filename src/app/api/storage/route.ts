/* eslint-disable import/prefer-default-export */
import { NextRequest, NextResponse } from 'next/server'
import supabase from '@/lib/supabase'
import { SUPABASE_BUCKET } from '@/config'
import { ApiError, routeWrapper, withSessionUser } from '@/utils/api'

export const POST = routeWrapper(async (req: NextRequest) => {
  if (!supabase) throw new ApiError('Supabase storage not setup')
  await withSessionUser() // user must be logged in

  const formData = await req.formData()
  const file: File | null = formData.get('file') as unknown as File
  const directory = formData.get('directory') as unknown as string
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const storageApi = supabase.storage.from(SUPABASE_BUCKET)
  const path = `${directory}/${file.name}`

  // clear existing files
  const { data: list, error: listError } = await storageApi.list(`${directory}/`)
  if (listError) throw new ApiError(listError.message)
  if (list?.length) {
    const { error: removeError } = await storageApi.remove(list?.map((f) => `${directory}/${f.name}`) || [])
    if (removeError) throw new ApiError(removeError.message)
  }

  // upload new file
  const { error: uploadError } = await storageApi.upload(path, buffer, {
    contentType: file.type, upsert: true
  })
  if (uploadError) throw new ApiError(uploadError.message)

  // get public url
  const { data: { publicUrl } } = await storageApi.getPublicUrl(path)

  return NextResponse.json({ publicUrl })
})
