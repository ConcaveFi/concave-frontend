import { WagmiProvider } from 'contexts/WagmiContext'
import { AuthProvider } from 'contexts/AuthContext'
import { ThemeProvider } from '@concave/ui'
import { ReactQueryProvider } from './ReactQueryContext'

export const AppProviders = ({ children, globalStyles, cookies }) => {
  return (
    <ThemeProvider globalStyles={globalStyles} cookies={cookies}>
      <ReactQueryProvider>
        <WagmiProvider>
          {/* <AuthProvider> */}
          {children}
          {/* </AuthProvider> */}
        </WagmiProvider>
      </ReactQueryProvider>
    </ThemeProvider>
  )
}
