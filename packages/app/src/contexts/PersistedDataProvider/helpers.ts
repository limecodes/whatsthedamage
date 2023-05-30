import { LocalStorage } from '@app/utils'
import { StorageKey } from './types'

export function getPersistedData<T>(key: StorageKey, defaultValue: T): T {
  const parsedData = getParsedItem<T>(key)

  return parsedData ? parsedData : defaultValue
}

export function persistData<T>(key: StorageKey, value: T) {
  if (LocalStorage.isAvailable()) {
    LocalStorage.setItem(key, JSON.stringify(value))
  }
}

export function isAvailable() {
  return LocalStorage.isAvailable()
}

function getParsedItem<T>(key: StorageKey): T | undefined {
  const persistedData = LocalStorage.getItem(key)

  return persistedData ? JSON.parse(persistedData) : undefined
}
