import { extendTheme, ChakraTheme } from '@chakra-ui/react'
import global from './global'
// import * as components from './components'
// import { borders } from './foundations'

const overrides: Partial<ChakraTheme> = {
  config: { initialColorMode: 'system', cssVarPrefix: '🥄' },
  styles: global,
  // borders,
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
        borderRadius: '12px',
      },
    },
  },
}
const theme = extendTheme(overrides)

export default theme
