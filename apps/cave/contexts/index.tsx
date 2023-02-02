import { ThemeProvider } from '@concave/ui'
import { WagmiProvider } from 'contexts/Wagmi/WagmiContext'
import { MotionConfig } from 'framer-motion'
import { ErrorModalProvider } from './ErrorModal'
import { ReactQueryProvider } from './ReactQueryContext'
import { TransactionsContext } from './Transactions/TransactionsContext'

export const AppProviders = ({ children, globalStyles, cookies }) => {
  return (
    <ThemeProvider globalStyles={globalStyles} cookies={cookies}>
      <MotionConfig reducedMotion="user">
        <ReactQueryProvider>
          <WagmiProvider>
            <TransactionsContext>
              <ErrorModalProvider>{children}</ErrorModalProvider>
            </TransactionsContext>
          </WagmiProvider>
        </ReactQueryProvider>
      </MotionConfig>
    </ThemeProvider>
  )
}
