import { useEffect, useState } from 'react'
import { PersistedTransaction, PersistedCategory, PersistedBudget, PersistedDataValue, StorageKey } from '@app/types'
import { Storage } from '@app/utils'

interface PersistedData {
	transactions: PersistedTransaction[]
	categories: PersistedCategory[]
	budget: PersistedBudget
}

const initialState: PersistedData = {
	transactions: [],
	categories: [],
	budget: {},
}

function getParsedItem(key: StorageKey): PersistedTransaction[] | PersistedCategory[] | PersistedBudget | undefined {
	const persistedData = Storage.getItem(key)

	if (!persistedData) {
		return undefined
	}

	return JSON.parse(persistedData)
}

function getPersistedTransactions(): PersistedTransaction[] {
	const persistedTransaction = getParsedItem(StorageKey.transactions) as PersistedTransaction[]
	return persistedTransaction ? persistedTransaction : []
}

function getPersistedCategories(): PersistedCategory[] {
	const persistedCategories = getParsedItem(StorageKey.categories) as PersistedCategory[]
	return persistedCategories ? persistedCategories : []
}

function getPersistedBudget(): PersistedBudget {
	const persistedBudget = getParsedItem(StorageKey.budget) as PersistedBudget
	return persistedBudget ? persistedBudget : {}
}

export function usePersistedData(): PersistedData {
	const [data, setData] = useState<PersistedData>(initialState)

	useEffect(() => {
		if (Storage.isAvailable()) {
			const transactions = getPersistedTransactions()
			const categories = getPersistedCategories()
			const budget = getPersistedBudget()

			setData({ transactions, categories, budget })
		}
	}, [])

	const saveData = (key: StorageKey, value: PersistedDataValue) => {
		if (Storage.isAvailable()) {
			Storage.setItem(key, JSON.stringify(value))
		}
	}

	useEffect(() => {
		saveData(StorageKey.transactions, data.transactions)
		saveData(StorageKey.categories, data.categories)
		saveData(StorageKey.budget, data.budget)
	}, [data])

	return data
}
