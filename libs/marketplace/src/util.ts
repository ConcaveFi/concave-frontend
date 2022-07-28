export const fetcher = async <T>(input: RequestInfo | URL, init?: RequestInit) => {
  const request = await fetch(input, init)
  const data: T = await request.json()
  console.log(init.body)
  console.log(data)
  return data
}
