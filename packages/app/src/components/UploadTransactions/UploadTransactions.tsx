import React, {
  ChangeEvent,
  ReactNode,
  useRef,
  useCallback,
  useState,
} from 'react'
import Papa, { ParseResult } from 'papaparse'
import { useTransactions } from '@app/contexts'
import { DataInputResult } from '@app/types'

interface UploadTransactionsProps {
  onComplete: (results: ParseResult<DataInputResult>) => void
  onError: (err: Error) => void
  onContinue: () => void
}

export function UploadTransactions({
  onComplete,
  onError,
  onContinue,
}: UploadTransactionsProps) {
  const { transactions } = useTransactions()

  const inputRef = useRef<HTMLInputElement | null>(null)

  // useCallback here doesn't give an advantage
  // using it mainly for consistency
  const handleClick = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }, [])

  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]

    if (file) {
      Papa.parse(file, {
        complete: onComplete,
        error: onError,
      })
    }
  }

  return transactions.length === 0 ? (
    <div>
      <input
        type="file"
        style={{ display: 'none' }}
        ref={inputRef}
        onChange={handleFile}
      />
      <button onClick={handleClick}>Select File</button>
    </div>
  ) : (
    <button onClick={onContinue}>Continue</button>
  )
}
