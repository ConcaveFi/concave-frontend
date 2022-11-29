import { ThemeProvider } from '@concave/ui'
import { WagmiProvider } from 'contexts/Wagmi/WagmiContext'
import { MotionConfig } from 'framer-motion'
import { ErrorModalProvider } from './ErrorModal'
import { ReactQueryProvider } from './ReactQueryContext'

export const AppProviders = ({ children, globalStyles, cookies }) => {
  return (
    <ThemeProvider globalStyles={globalStyles} cookies={cookies}>
      <MotionConfig reducedMotion="user">
        <ReactQueryProvider>
          <WagmiProvider>
            <ErrorModalProvider>{children}</ErrorModalProvider>
          </WagmiProvider>
        </ReactQueryProvider>
      </MotionConfig>
    </ThemeProvider>
  )
}
