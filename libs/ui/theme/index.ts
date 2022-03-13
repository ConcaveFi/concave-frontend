import { ChakraTheme, extendTheme } from '@chakra-ui/react'
import colors from './colors'
import Button from './components/ButtonStyles'
import Tooltip from './components/TooltipStyles'
import CloseButton from './components/CloseButtonStyles'
import Input from './components/InputStyles'
import Modal from './components/ModalStyles'
import Card from './components/CardStyles'
import BaseModal from './components/BaseStyles'
import Switch from './components/SwitchStyles'
import { fonts, shadows } from './foundations'

const theme = extendTheme({
  config: { initialColorMode: 'dark', cssVarPrefix: 'concave' },
  fonts,
  colors,
  shadows,
  components: {
    Input,
    BaseModal,
    Button,
    Switch,
    Tooltip,
    CloseButton,
    Modal,
    Card,
  },
}) as ChakraTheme

export type Theme = typeof theme
export default theme
