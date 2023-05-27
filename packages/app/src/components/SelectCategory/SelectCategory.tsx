import React, { useState } from 'react'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'

interface SelectCategoryProps {
  categories: string[]
  selectedCategory?: string
  onAddCategory: (category: string) => void
  onSelectCategory: (category: string) => void
}

export function SelectCategory({
  categories,
  selectedCategory,
  onAddCategory,
  onSelectCategory,
}: SelectCategoryProps) {
  const [value, setValue] = useState()
  const [inputValue, setInputValue] = useState('')

  const filter = createFilterOptions<string>()

  return selectedCategory ? (
    <span>{selectedCategory}</span>
  ) : (
    <Autocomplete
      freeSolo
      value={value}
      inputValue={inputValue}
      onChange={(_, newValue) => {
        setValue(newValue)
      }}
      onInputChange={(_, newInputValue) => {
        setInputValue(newInputValue)
      }}
      options={categories}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Add category"
          margin="normal"
          variant="outlined"
        />
      )}
      filterOptions={(options, params) => {
        const filtered = filter(options, params)

        const { inputValue } = params

        const isExisting = options.some((option) => inputValue === option)

        if (inputValue !== '' && !isExisting) {
          filtered.push(inputValue)
        }

        return filtered
      }}
    />
  )
}
