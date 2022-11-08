import { useInterval } from '@concave/ui'
import { NEXT_PUBLIC_CHART_ENDPOINT } from 'lib/env.conf'
import { useEffect, useState } from 'react'
import { useQuery, UseQueryResult } from 'react-query'
import { fetchData } from './fetchData'

export const useFetchData = <T>(
  route: string,
  url: string = NEXT_PUBLIC_CHART_ENDPOINT,
  method?: string,
  bodyData?: object,
): UseQueryResult<T, unknown> & { nextTriggerByError: number } => {
  const useQueryResult = useQuery(
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
      refetchInterval: 600_000, // refetch on success
      keepPreviousData: true,
      retryDelay: 2_000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchIntervalInBackground: true,
    },
  )
  const { nextTriggerByError } = useQueryStaleErrorRetry(useQueryResult)
  return { ...useQueryResult, nextTriggerByError }
}

const useQueryStaleErrorRetry = (useQueryResult: UseQueryResult<unknown, unknown>) => {
  // Refetch when error and stale after 1 min
  const [nextTriggerByError, setNextTrigger] = useState(-1)
  useInterval(() => setNextTrigger((prev) => prev - 1), 1000)
  useEffect(() => {
    if (nextTriggerByError === 0) {
      useQueryResult.refetch()
      return
    }
    if (nextTriggerByError > 0) return
    if (useQueryResult.isStale && useQueryResult.isError) {
      setNextTrigger(60)
    }
  })
  return { nextTriggerByError }
}
