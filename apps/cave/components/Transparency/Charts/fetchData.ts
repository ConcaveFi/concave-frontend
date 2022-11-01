import { NEXT_PUBLIC_CHART_ENDPOINT } from 'lib/env.conf'

export async function fetchData<T = unknown>(
  route: string,
  url: string = NEXT_PUBLIC_CHART_ENDPOINT,
  method?: string,
  bodyData?: object,
): Promise<T> {
  const response = await fetch(`${url}/${route}`, {
    method: method || 'GET',
    mode: 'cors',
    redirect: 'follow',
    headers: {
      'Content-Type': 'application/json',
    },
    body: bodyData ? JSON.stringify(bodyData) : null,
  })
  const responseJson = await response.json()
  const data = responseJson.data
  if (data.status === 400) {
    throw new Error(data.msg)
  }
  return data as T
}
