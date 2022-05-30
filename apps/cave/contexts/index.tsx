import { WagmiProvider } from 'contexts/WagmiContext'
import { ThemeProvider } from '@concave/ui'
import { ReactQueryProvider } from './ReactQueryContext'
import { ModalsProvider } from './ModalsContext'
import { MotionConfig } from 'framer-motion'

export const AppProviders = ({ children, globalStyles, cookies }) => {
  return (
    <ThemeProvider globalStyles={globalStyles} cookies={cookies}>
      <MotionConfig reducedMotion="user">
        <ReactQueryProvider>
          <WagmiProvider>
            <ModalsProvider>{children}</ModalsProvider>
          </WagmiProvider>
        </ReactQueryProvider>
      </MotionConfig>
    </ThemeProvider>
  )
}
