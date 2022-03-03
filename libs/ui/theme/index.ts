import { ChakraTheme, extendTheme } from '@chakra-ui/react'
import global from './global'
import colors from './colors'
import Button from './components/ButtonStyles'
import Tooltip from './components/TooltipStyles'
import Switch from './components/Switch'
import { fonts, shadows } from './foundations'

const theme = extendTheme({
  config: { initialColorMode: 'dark', cssVarPrefix: 'concave' },
  styles: global,
  fonts,
  colors,
  shadows,
  components: {
    Button,
    Switch,
    Tooltip,
  },
}) as ChakraTheme

export type Theme = typeof theme
export default theme
