import { extendTheme, ChakraTheme } from '@chakra-ui/react'
import global from './global'
import colors from './colors'
import Button from './components/ButtonStyles'
import Card from './components/CardStyles'
import { fonts, shadows } from './foundations'

const overrides: Partial<ChakraTheme> = {
  config: { initialColorMode: 'system', cssVarPrefix: 'concave' },
  styles: global,
  fonts,
  colors,
  shadows,
  // borders,
  components: {
    Button,
    Card,
  },
}
const theme = extendTheme(overrides)

export default theme
