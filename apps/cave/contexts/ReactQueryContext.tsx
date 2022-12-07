import { NoValidPairsError } from 'components/AMM/hooks/usePair'
import { InsufficientLiquidityError, InvalidTradeError } from 'components/AMM/hooks/useTrade'
import ms from 'ms'
import { useState } from 'react'
import { QueryClient, QueryClientProvider, setLogger } from 'react-query'

setLogger({
  log: console.log,
  warn: console.warn,
  error: (message, ...optionalParams) => {
    // stop logging expected errors
    if ([InvalidTradeError, InsufficientLiquidityError, NoValidPairsError].includes(message)) return
    console.error(message, ...optionalParams)
  },
})


export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: ms('20s'),
    },
  },
})

export const ReactQueryProvider = ({ children }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
