import { NEXT_PUBLIC_CHART_ENDPOINT } from 'lib/env.conf'
import { useQuery, UseQueryResult } from 'react-query'
import { fetchData } from './fetchData'

export const useFetchData = <T>(
  route: string,
  url: string = NEXT_PUBLIC_CHART_ENDPOINT,
  method?: string,
  bodyData?: object,
): UseQueryResult<T, unknown> => {
  return useQuery(
    [
      JSON.stringify({
        route,
        url,
        method,
        bodyData,
      }),
    ],
    () => fetchData<T>(route, url, method, bodyData),
    {
      retry: 3,
      refetchInterval: 15000,
      retryDelay: 5000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchIntervalInBackground: true,
    },
  )
}
