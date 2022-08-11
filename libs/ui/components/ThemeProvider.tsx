import {
  ColorModeScript as ChakraColorModeScript,
  createCookieStorageManager,
  localStorageManager,
} from '@chakra-ui/color-mode'
import { ChakraProvider } from '@chakra-ui/provider'
import { createStandaloneToast } from '@chakra-ui/react'
import { Styles } from '@chakra-ui/theme-tools'
import { ReactNode } from 'react'

import theme from '../theme'

const { ToastContainer } = createStandaloneToast({ theme })

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
      <ToastContainer />
      {children}
    </ChakraProvider>
  )
}

export const ColorModeScript = (props) => (
  <ChakraColorModeScript initialColorMode={theme.config.initialColorMode} {...props} />
)

export default ThemeProvider
