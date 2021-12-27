import { extendTheme, ChakraTheme } from '@chakra-ui/react'
import global from './global'
import colors from './colors'
import Button from './components/ButtonStyles'
import { fonts } from './foundations'

const overrides: Partial<ChakraTheme> = {
  config: { initialColorMode: 'system', cssVarPrefix: '🥄' },
  styles: global,
  fonts,
  colors,
  // borders,
  components: {
    Button,
  },
}
const theme = extendTheme(overrides)

export default theme
