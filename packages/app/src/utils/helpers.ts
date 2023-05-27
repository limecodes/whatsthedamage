type DateTimeObject = {
  date: string
  time: string
}

// Not sure if I need this but let's keep it
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

export function toPositiveNumber(value: string) {
  return Math.abs(toNumber(value))
}

export function toNumber(value: string) {
  return Number(value)
}

export function toInteger(floatNumber: number): number {
  return Math.round(floatNumber * 100)
}
