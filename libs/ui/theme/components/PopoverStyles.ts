import { ComponentMultiStyleConfig } from '@chakra-ui/react'
import { popoverAnatomy } from '@chakra-ui/anatomy'

export const PopoverStyles: ComponentMultiStyleConfig = {
  parts: popoverAnatomy.keys,
  baseStyle: {
    popper: { bg: 'none', shadow: 'none', border: 'none' },
    content: { bg: 'none', shadow: 'none', border: 'none' },
  },
  sizes: {},
  variants: {},
  defaultProps: {},
}

export default PopoverStyles
