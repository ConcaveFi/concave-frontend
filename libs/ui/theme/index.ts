import { ChakraTheme, extendTheme } from '@chakra-ui/react'
import colors from './colors'
import Button from './components/ButtonStyles'
import Tooltip from './components/TooltipStyles'
import CloseButton from './components/CloseButtonStyles'
import Input from './components/InputStyles'
import Modal from './components/ModalStyles'
import Popover from './components/PopoverStyles'
import Card from './components/CardStyles'
import Switch from './components/SwitchStyles'
import Accordion from './components/AccordionStyles'
import scrollbar from './scrollbars'
import background from './backgrounds'
import shadows from './shadows'
import { fonts } from './foundations'

const theme = extendTheme({
  config: { initialColorMode: 'dark', cssVarPrefix: 'concave' },
  fonts,
  colors,
  shadows,
  scrollbar,
  background,
  components: {
    Input,
    Button,
    Switch,
    Tooltip,
    CloseButton,
    Modal,
    Card,
    Accordion,
    Popover,
  },
} as const) as ChakraTheme

export type Theme = typeof theme
export default theme
