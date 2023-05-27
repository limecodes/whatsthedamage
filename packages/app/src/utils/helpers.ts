// Not sure if I need this but let's keep it
export function toCamelCase(str: string) {
  return str
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
    .replace(/^[A-Z]/, (chr) => chr.toLowerCase())
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
