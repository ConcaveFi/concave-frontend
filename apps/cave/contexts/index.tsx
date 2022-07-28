import { ThemeProvider } from '@concave/ui'
import { WagmiProvider } from 'contexts/WagmiContext'
import { MotionConfig } from 'framer-motion'
import { ModalsProvider } from './ModalsContext'
import { ReactQueryProvider } from './ReactQueryContext'

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
