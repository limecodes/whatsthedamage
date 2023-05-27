type DateTime = {
  date: string
  time: string
}

export function getUnixTimestamp(dateTime: DateTime): number {
	const [day, month, year] = dateTime.date.split('.')

	// Combine Date and Time into a single string
	const combinedDateTime = `${year}-${month}-${day} ${dateTime.time}`

	// Create a Date object from the combined string
	const dateObj = new Date(combinedDateTime)

	// Convert the Date object to a Unix timestamp (in seconds)
	const unixTimestamp = Math.floor(dateObj.getTime() / 1000)

	return unixTimestamp
}

export function formatUnixTimestamp(unixTimestamp: number): string {
	const date = new Date(unixTimestamp * 1000)
	const day = date.getDate().toString().padStart(2, '0')
	const month = (date.getMonth() + 1).toString().padStart(2, '0')
	const year = date.getFullYear()

	return `${day}.${month}.${year}`
}

export function sortAscendingByTimestamp(a: number, b: number) {
	return a - b
}
