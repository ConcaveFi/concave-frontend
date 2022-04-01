import {
  ChakraProvider,
  ColorModeScript as ChakraColorModeScript,
  cookieStorageManager,
  localStorageManager,
} from '@chakra-ui/react'
import { ReactNode } from 'react'

import theme from 'theme'

export const ThemeProvider = ({ cookies, children }: { children: ReactNode; cookies: string }) => {
  // this ensures the theme will be right even on ssr pages (won't flash wrong theme)
  const colorModeManager =
    typeof cookies === 'string' ? cookieStorageManager(cookies) : localStorageManager
  return (
    <ChakraProvider resetCSS theme={theme} colorModeManager={colorModeManager} portalZIndex={100}>
      {children}
    </ChakraProvider>
  )
}

export const ColorModeScript = (props) => (
  <ChakraColorModeScript initialColorMode={theme.config.initialColorMode} {...props} />
)

export default ThemeProvider
