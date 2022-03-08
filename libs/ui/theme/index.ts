import { ChakraTheme, extendTheme } from '@chakra-ui/react'
import colors from './colors'
import Button from './components/ButtonStyles'
import Tooltip from './components/TooltipStyles'
import CloseButton from './components/CloseButtonStyles'
import Input from './components/InputStyles'
import Modal from './components/ModalStyles'
import { fonts, shadows } from './foundations'

const theme = extendTheme({
  config: { initialColorMode: 'dark', cssVarPrefix: 'concave' },
  fonts,
  colors,
  shadows,
  components: {
    Input,
    Button,
    Tooltip,
    CloseButton,
    Modal,
  },
}) as ChakraTheme

export type Theme = typeof theme
export default theme
