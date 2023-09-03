import React from 'react'

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
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0]
    if (!file) return

    try {
      const data = new FormData()
      data.append('directory', bucketDirectory)
      data.append('file', file)
      const res = await fetch('/api/storage', {
        method: 'POST',
        body: data
      })
      onFileUpload && onFileUpload(await res.json())
    } catch (error: any) {
      onError && onError(error)
    }
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
