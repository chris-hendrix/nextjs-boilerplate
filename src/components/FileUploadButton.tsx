import React, { useEffect } from 'react'
import { useUploadFileMutation } from '@/store'

interface ImageUploaderProps {
  buttonComponent?: React.ReactNode,
  bucketDirectory?: string,
  onFileUpload?: (fileUrl: string) => void,
  onError?: (error: any) => void
}

const FileUploadButton: React.FC<ImageUploaderProps> = ({
  buttonComponent,
  bucketDirectory = '',
  onFileUpload,
  onError,
}) => {
  const [uploadFile, { error }] = useUploadFileMutation()

  useEffect(() => { onError && onError(error) }, [error])

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0]
    if (!file) return
    const data = new FormData()
    data.append('directory', bucketDirectory)
    data.append('file', file)
    const res = await uploadFile(data)
    const url = 'data' in res && res.data.publicUrl
    url && onFileUpload && onFileUpload(url)
  }

  return (
    <>
      <input
        type="file"
        className="hidden"
        id="fileInput"
        onChange={handleFileChange}
      />
      <label htmlFor="fileInput" >
        {buttonComponent || <button>Upload</button>}
      </label>
    </>
  )
}

export default FileUploadButton
