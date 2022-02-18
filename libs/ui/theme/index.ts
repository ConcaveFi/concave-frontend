import { ChakraTheme, extendTheme, theme as baseTheme } from '@chakra-ui/react'
import global from './global'
import colors from './colors'
import Button from './components/ButtonStyles'
import Tooltip from './components/TooltipStyles'
import { fonts, shadows } from './foundations'

const theme = extendTheme({
  config: { initialColorMode: 'dark', cssVarPrefix: 'concave' },
  styles: global,
  fonts,
  colors,
  shadows,
  components: {
    Button,
    Tooltip,
  },
}) as ChakraTheme

export type Theme = typeof theme
export default theme
