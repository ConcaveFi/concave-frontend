
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

export const useQueryParams = <T>() => {
  const router = useRouter()
  const query = router.isReady ? router.query : {}
  return useQuery(
    ['useView', JSON.stringify(query)],
    async () => {
      return query as T
    },
    { enabled: router.isReady },
  )
}
