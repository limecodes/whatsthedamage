export function getItem(key: string): string | null {
  try {
    return window.localStorage.getItem(key)
  } catch (e) {
    console.error(`Error getting item ${key} from localStorage`, e)
    return null
  }
}

export function setItem(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value)
  } catch (e) {
    console.error(`Error setting item ${key} to localStorage`, e)
  }
}

export function removeItem(key: string): void {
  try {
    window.localStorage.removeItem(key)
  } catch (e) {
    console.error(`Error removing item ${key} from localStorage`, e)
  }
}

export function isAvailable(): boolean {
  const testValue = 'test'

  try {
    window.localStorage.setItem(testValue, testValue)
    window.localStorage.removeItem(testValue)
    return true
  } catch (e) {
    console.info('Error attempting localStorage', e)
    return false
  }
}
