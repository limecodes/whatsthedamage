import React, { useState } from 'react'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { Category } from '@app/types'

interface SelectCategoryProps {
  categories: Category[]
  // selectedCategory?: string
  // onAddCategory: (category: string) => void
  // onSelectCategory: (category: string) => void
}

const filter = createFilterOptions<Category>()

export function SelectCategory({
  categories,
  // selectedCategory,
  // onAddCategory,
  // onSelectCategory,
}: SelectCategoryProps) {
  const [value, setValue] = useState<Category | null>(null)

  return (
  	<Autocomplete
      value={value}
      onChange={(event, newValue) => {
        if (typeof newValue === 'string') {
          setValue({
            name: newValue,
          })
        } else if (newValue && newValue.inputValue) {
          setValue({
            name: newValue.inputValue,
          })
        } else {
          setValue(newValue)
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params)

        const { inputValue } = params

        const isExisting = options.some((option) => inputValue === option.name)
        if (inputValue !== '' && !isExisting) {
          filtered.push({
            inputValue,
            name: `Add "${inputValue}"`,
          })
        }

        return filtered
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="select-category"
      options={categories}
      getOptionLabel={(option) => {
        if (typeof option === 'string') {
          return option
        }

        if (option.inputValue) {
          return option.inputValue
        }

        return option.name
      }}
      freeSolo
      renderOption={(props, option) => <li {...props}>{option.name}</li>}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Add category"
          margin="normal"
          variant="outlined"
        />
      )}
    />
  )
}
