
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

export const useQueryParams = <T>(def: T) => {
  const router = useRouter()
  const query = router.isReady ? router.query : def
  return useQuery(
    ['queryParams', JSON.stringify(query)],
    async () => query as T,
    { enabled: router.isReady },
  )
}
