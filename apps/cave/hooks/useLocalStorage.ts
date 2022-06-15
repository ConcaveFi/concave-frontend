import { useMutation, useQuery, useQueryClient } from 'react-query'

export function useLocalStorage<T>(key: string, placeholderData) {
  const queryClient = useQueryClient()

  const { data } = useQuery<T>(key, () => JSON.parse(localStorage.getItem(key)), {
    enabled: !!key,
    placeholderData,
  })

  const { mutateAsync } = useMutation(
    async (value: T) => localStorage.setItem(key, JSON.stringify(value)),
    {
      onMutate: (mutatedData) => {
        const current = data
        queryClient.setQueryData(key, mutatedData)
        return current
      },
      onError: (_, __, rollback) => {
        queryClient.setQueryData(key, rollback)
      },
    },
  )

  return { data, mutateAsync }
}
