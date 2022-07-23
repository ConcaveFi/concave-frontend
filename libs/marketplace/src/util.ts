export const fetcher = async <T>(input: RequestInfo | URL, init?: RequestInit) => {
  const request = await fetch(input, init)
  const data: T = await request.json()
  console.log(data)
  return data
}
