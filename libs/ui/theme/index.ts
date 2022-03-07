import { ChakraTheme, extendTheme, theme as baseTheme } from '@chakra-ui/react'
import global from './global'
import colors from './colors'
import Button from './components/ButtonStyles'
import Tooltip from './components/TooltipStyles'
import CloseButton from './components/CloseButtonStyles'
import Input from './components/InputStyles'
import { fonts, shadows } from './foundations'

const theme = extendTheme({
  config: { initialColorMode: 'dark', cssVarPrefix: 'concave' },
  styles: global,
  fonts,
  colors,
  shadows,
  components: {
    Input,
    Button,
    Tooltip,
    CloseButton,
  },
}) as ChakraTheme

export type Theme = typeof theme
export default theme
