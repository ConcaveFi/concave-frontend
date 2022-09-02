import { ThemeProvider } from '@concave/ui'
import { WagmiProvider } from 'contexts/WagmiContext'
import { MotionConfig } from 'framer-motion'
import { ReactQueryProvider } from './ReactQueryContext'

export const AppProviders = ({ children, globalStyles }) => {
  return (
    <ThemeProvider globalStyles={globalStyles}>
      <MotionConfig reducedMotion="user">
        <ReactQueryProvider>
          <WagmiProvider>{children}</WagmiProvider>
        </ReactQueryProvider>
      </MotionConfig>
    </ThemeProvider>
  )
}
