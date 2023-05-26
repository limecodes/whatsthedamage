import React, { useState, useCallback, ChangeEvent } from 'react'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import { Category } from '../types'

interface SelectCategoryProps {
  categories: Category[]
  onAddCategory: (categoryName: string) => void
  onSelectCategory: (categoryValue: string) => void
}

export function SelectCategory({
  categories,
  onAddCategory,
  onSelectCategory,
}: SelectCategoryProps) {
  const [categoryName, setCategoryName] = useState('')

  const handleSelectCategory = (event: SelectChangeEvent) => {
  	onSelectCategory(event.target.value)
  }

  const handleAddCategory = () => {
  	onAddCategory(categoryName)
  	setCategoryName('')
  }

  const handleChangeCategoryName = (event: ChangeEvent<HTMLInputElement>) => {
  	setCategoryName(event.target.value)
  }

  return (
    <Select onChange={handleSelectCategory}>
      {categories.map(({ value, name }, index) => (
        <MenuItem key={`${value}-${index}`} value={value}>
          {name}
        </MenuItem>
      ))}
      <TextField
        placeholder="Add new category"
        value={categoryName}
        onChange={handleChangeCategoryName}
      />
      <button onClick={handleAddCategory}>
        +
      </button>
    </Select>
  )
}
