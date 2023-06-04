import React, { useState, SyntheticEvent, HTMLAttributes, useRef } from 'react'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'
import { FilterOptionsState } from '@mui/material/useAutocomplete'
import TextField from '@mui/material/TextField'
import { Category } from '@app/types'

type SelectedValue = string | Category | null

interface SelectCategoryProps {
  categories: Category[]
  selectedCategory: Category | null
  onSelectCategory: (selectedValue: Category | null) => void
  onAddCategory: (newCategory: Category) => void
  onClearCategory: () => void
}

const filter = createFilterOptions<Category>()

export function SelectCategory({
  categories,
  selectedCategory,
  onAddCategory,
  onSelectCategory,
  onClearCategory,
}: SelectCategoryProps) {
  const handleInputChange = (event: SyntheticEvent, value: string) => {
    if (selectedCategory && value === '') {
      onClearCategory()
    }
  }

  const handleSelectCategory = (
    event: SyntheticEvent,
    selectedValue: SelectedValue,
  ) => {
    if (typeof selectedValue === 'string') {
      // Handle a selected category that exists but a value that's typed in
      onSelectCategory({
        name: selectedValue,
      })
    } else if (selectedValue && selectedValue.inputValue) {
      // Handle the value from the input value, in this a new category
      onSelectCategory({
        name: selectedValue.inputValue,
      })

      onAddCategory({
        name: selectedValue.inputValue,
      })
    } else {
      // In all other cases a selected value by pointer
      onSelectCategory(selectedValue)
    }
  }

  const setFilterOptions = (
    categories: Category[],
    params: FilterOptionsState<Category>,
  ) => {
    const filtered = filter(categories, params)
    const { inputValue } = params
    const isExisting = categories.some(
      (category) => inputValue === category.name,
    )

    if (inputValue !== '' && !isExisting) {
      filtered.push({
        inputValue,
        name: `Add "${inputValue}"`,
      })
    }

    return filtered
  }

  const getOptionLabel = (option: string | Category) => {
    if (typeof option === 'string') {
      return option
    }

    if (option.inputValue) {
      return option.inputValue
    }

    return option.name
  }

  return (
    <Autocomplete
      freeSolo
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="select-category"
      value={selectedCategory}
      options={categories}
      filterOptions={setFilterOptions}
      getOptionLabel={getOptionLabel}
      onChange={handleSelectCategory}
      onInputChange={handleInputChange}
      renderOption={(props, option) => <li {...props}>{option.name}</li>}
      renderInput={(params) => (
        <TextField
          {...params}
          label={selectedCategory ? 'Change category' : 'Add Category'}
          margin="normal"
          variant="outlined"
        />
      )}
    />
  )
}
