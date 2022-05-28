import { useState } from 'react'
import { QueryClient, QueryClientProvider, setLogger } from 'react-query'
import ms from 'ms'
import { InsufficientLiquidityError, InvalidTradeError } from 'components/AMM/hooks/useTrade'
import { NoValidPairsError } from 'components/AMM/hooks/usePair'

setLogger({
  log: console.log,
  warn: console.warn,
  error: (error) => {
    // stop logging expected errors
    if ([InvalidTradeError, InsufficientLiquidityError, NoValidPairsError].includes(error)) return
    console.error(error)
  },
})

export const ReactQueryProvider = ({ children }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: ms('20s'),
          },
        },
      }),
  )

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
