import { WagmiProvider } from 'contexts/WagmiContext'
import { ThemeProvider } from '@concave/ui'
import { ReactQueryProvider } from './ReactQueryContext'
import { ModalsProvider } from './ModalsContext'
// import { AuthProvider } from 'contexts/AuthContext'

export const AppProviders = ({ children, globalStyles, cookies }) => {
  return (
    <ThemeProvider globalStyles={globalStyles} cookies={cookies}>
      <ReactQueryProvider>
        <WagmiProvider>
          <ModalsProvider>
            {/* <AuthProvider> */}
            {children}
            {/* </AuthProvider> */}
          </ModalsProvider>
        </WagmiProvider>
      </ReactQueryProvider>
    </ThemeProvider>
  )
}
