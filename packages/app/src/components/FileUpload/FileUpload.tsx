import React, { ChangeEvent, useRef } from 'react'

interface FileUploadProps {
  onFileUpload: (event: ChangeEvent<HTMLInputElement>) => void
}

export function FileUpload({ onFileUpload }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)

  function handleClick() {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  return (
    <div>
      <input
        type="file"
        style={{ display: 'none' }}
        ref={inputRef}
        onChange={onFileUpload}
      />
      <button onClick={handleClick}>Select File</button>
    </div>
  )
}
