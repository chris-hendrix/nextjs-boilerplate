import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '@/config'

export const storageApi = createApi({
  reducerPath: 'storageApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (build) => ({
    uploadFile: build.mutation<{ publicUrl: string }, FormData>({
      query: (formData) => ({
        url: 'storage',
        method: 'POST',
        body: formData,
        responseHandler: async (res) => res.json(),
      }),
    })
  }),
})

export const { useUploadFileMutation } = storageApi
