import { DateTimeObject, RawHeader, CamelCasedHeader } from '../types'

export function toCamelCase(str: string) {
  return str
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
    .replace(/^[A-Z]/, (chr) => chr.toLowerCase())
}

export function getUnixTimestamp(dateTime: DateTimeObject): number {
  const [day, month, year] = dateTime.date.split('.')

  // Combine Date and Time into a single string
  const combinedDateTime = `${year}-${month}-${day} ${dateTime.time}`

  // Create a Date object from the combined string
  const dateObj = new Date(combinedDateTime)

  // Convert the Date object to a Unix timestamp (in seconds)
  const unixTimestamp = Math.floor(dateObj.getTime() / 1000)

  return unixTimestamp
}

export function rawToCamelCasedHeader(header: RawHeader): CamelCasedHeader {
  return toCamelCase(header) as CamelCasedHeader
}

export function toPositiveNumber(value: string) {
  return Math.abs(toNumber(value))
}

export function toNumber(value: string) {
  return Number(value)
}
