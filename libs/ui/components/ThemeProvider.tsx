import { ChakraProvider } from '@chakra-ui/provider'
import {
  ColorModeScript as ChakraColorModeScript,
  createCookieStorageManager,
  localStorageManager,
} from '@chakra-ui/color-mode'
import { Styles } from '@chakra-ui/theme-tools'
import { ReactNode } from 'react'

import theme from '../theme'

export const ThemeProvider = ({
  cookies,
  globalStyles,
  children,
}: {
  children: ReactNode
  globalStyles: Styles
  cookies: string
}) => {
  // this ensures the theme will be right even on ssr pages (won't flash wrong theme)
  const colorModeManager =
    typeof cookies === 'string' ? createCookieStorageManager(cookies) : localStorageManager
  return (
    <ChakraProvider
      resetCSS
      theme={{ ...theme, styles: globalStyles }}
      colorModeManager={colorModeManager}
    >
      {children}
    </ChakraProvider>
  )
}

export const ColorModeScript = (props) => (
  <ChakraColorModeScript initialColorMode={theme.config.initialColorMode} {...props} />
)

export default ThemeProvider
