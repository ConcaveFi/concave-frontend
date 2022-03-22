import { WagmiProvider } from 'contexts/WagmiContext'
import { AuthProvider } from 'contexts/AuthContext'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useState } from 'react'
import { ThemeProvider } from '@concave/ui'

export const AppProviders = ({ children, globalStyles, cookies }) => {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider>
        <AuthProvider>
          <ThemeProvider globalStyles={globalStyles} cookies={cookies}>
            {children}
          </ThemeProvider>
        </AuthProvider>
      </WagmiProvider>
    </QueryClientProvider>
  )
}
