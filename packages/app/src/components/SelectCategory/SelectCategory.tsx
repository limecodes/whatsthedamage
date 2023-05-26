import React, { useState, useCallback, ChangeEvent } from 'react'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import { Category } from '../types'

interface SelectCategoryProps {
  categories: string[]
  onAddCategory: (category: string) => void
  onSelectCategory: (category: string) => void
}

export function SelectCategory({
  categories,
  onAddCategory,
  onSelectCategory,
}: SelectCategoryProps) {
	const [category, setCategory] = useState('')
	const [selectedCategory, setSelectedCategory] = useState('')

	function handleSelectCategory(event: SelectChangeEvent) {
		setSelectedCategory(event.target.value)
		onSelectCategory(event.target.value)
	}

	function handleAddCategory() {
		setSelectedCategory(category)
		setCategory('')
		onAddCategory(category)
	}

  return (
    <Select onChange={handleSelectCategory} value={selectedCategory}>
      {categories.map((category, index) => (
        <MenuItem key={`${category}-${index}`} value={category}>
          {category}
        </MenuItem>
      ))}
      <TextField
        placeholder="Add new category"
        value={category}
        onChange={(event) => setCategory(event.target.value)}
        InputProps={{
          endAdornment: (
            <IconButton onClick={handleAddCategory}>
              <AddIcon />
            </IconButton>
          ),
        }}
      />
    </Select>
  )
}
