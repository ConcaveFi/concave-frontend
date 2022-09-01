import { ChakraTheme, extendTheme } from '@chakra-ui/react'
import background from './backgrounds'
import colors from './colors'
import Accordion from './components/AccordionStyles'
import Button from './components/ButtonStyles'
import BuyButton from './components/BuyButtonStyles'
import Card from './components/CardStyles'
import CloseButton from './components/CloseButtonStyles'
import Heading from './components/HeadingStyles'
import Input from './components/InputStyles'
import Menu from './components/MenuStyles'
import Modal from './components/ModalStyles'
import Popover from './components/PopoverStyles'
import Switch from './components/SwitchStyles'
import Text from './components/TextStyles'
import Tooltip from './components/TooltipStyles'
import { fonts } from './foundations'
import scrollbar from './scrollbars'
import shadows from './shadows'

const theme = extendTheme({
  config: { initialColorMode: 'dark', cssVarPrefix: 'concave' },
  fonts,
  colors,
  shadows,
  scrollbar,
  background,
  components: {
    Text,
    Input,
    Button,
    Heading,
    Switch,
    Tooltip,
    CloseButton,
    Menu,
    Modal,
    Card,
    BuyButton,
    Accordion,
    Popover,
  },
} as const) as ChakraTheme

export type Theme = typeof theme
export default theme
