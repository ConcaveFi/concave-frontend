import { NEXT_PUBLIC_CHART_ENDPOINT } from 'lib/env.conf'

export async function fetchData(
  route: string,
  url: string = NEXT_PUBLIC_CHART_ENDPOINT,
  method?: string,
  bodyData?: object,
): Promise<any> {
  return fetch(`${url}/${route}`, {
    method: method || 'GET',
    mode: 'cors',
    redirect: 'follow',
    headers: {
      'Content-Type': 'application/json',
    },
    body: bodyData ? JSON.stringify(bodyData) : null,
  }).then((response) =>
    response.json().then((responseJson) => {
      const data = responseJson.data
      if (data.status === 400) {
        throw new Error(data.msg)
      }
      return data
    }),
  )
}
