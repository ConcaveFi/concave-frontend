export async function fetchData(
  route: string,
  url: string = 'https://devcnv-charts.vercel.app/api',
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
  })
    .then((response) => response.json().then((responseJson) => responseJson.data))
    .catch((error) => console.log('error', error))
}
