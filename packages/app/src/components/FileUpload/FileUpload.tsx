import React, { ChangeEvent, useRef } from 'react'
import Papa from 'papaparse'

export function FileUpload() {
	const inputRef = useRef<HTMLInputElement | null>(null)

	function handleClick() {
		if (inputRef.current) {
			inputRef.current.click()
		}
	}

	function handleFile(event: ChangeEvent<HTMLInputElement>) {
		const file = event.target.files && event.target.files[0]
		if (file) {
			Papa.parse(file, {
				complete: function(results) {
					console.log('results', results.data)
				}
			})
		}
	}

  return (
    <div>
      <input
        type="file"
        style={{ display: 'none' }}
        ref={inputRef}
        onChange={handleFile}
      />
      <button onClick={handleClick}>Select File</button>
    </div>
  )
}
