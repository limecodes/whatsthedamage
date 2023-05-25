import React from 'react'

export function FileUpload() {
  return (
    <div>
      <input
        type="file"
        onChange={() => {
          console.log('upload attempt')
        }}
      />
      <button>Upload</button>
    </div>
  )
}
