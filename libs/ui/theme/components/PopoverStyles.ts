import { popoverAnatomy } from '@chakra-ui/anatomy'
import { ComponentMultiStyleConfig } from '@chakra-ui/react'

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
