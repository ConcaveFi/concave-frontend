import { ChakraTheme, extendTheme } from '@chakra-ui/react'
import background from './backgrounds'
import colors from './colors'
import Accordion from './components/AccordionStyles'
import Button from './components/ButtonStyles'
import Card from './components/CardStyles'
import CloseButton from './components/CloseButtonStyles'
import Input from './components/InputStyles'
import Modal from './components/ModalStyles'
import Popover from './components/PopoverStyles'
import Switch from './components/SwitchStyles'
import Tooltip from './components/TooltipStyles'
import { fonts, shadows } from './foundations'
import scrollbar from './scrollbars'

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
