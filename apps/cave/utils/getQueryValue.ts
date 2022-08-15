import { ParsedUrlQuery } from 'querystring'

export const getQueryValue = (query: ParsedUrlQuery, key: string): string => {
  const value = query[key]
  return Array.isArray(value) ? value[0] : value
}
