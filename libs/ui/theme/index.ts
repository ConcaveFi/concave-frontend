import { ChakraTheme, extendTheme } from '@chakra-ui/react'
import global from './global'
import colors from './colors'
import Button from './components/ButtonStyles'
import Tooltip from './components/TooltipStyles'
import CloseButton from './components/CloseButtonStyles'
import Input from './components/InputStyles'
import Modal from './components/ModalStyles'
import Switch from './components/SwitchStyles'
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
    Switch,
    Tooltip,
    CloseButton,
    Modal,
  },
}) as ChakraTheme

export type Theme = typeof theme
export default theme
