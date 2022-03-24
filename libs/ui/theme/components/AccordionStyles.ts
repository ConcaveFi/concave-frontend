import { ComponentMultiStyleConfig } from '@chakra-ui/react'
import { accordionAnatomy } from '@chakra-ui/anatomy'

export const AccordionStyles: ComponentMultiStyleConfig = {
  parts: accordionAnatomy.keys,
  baseStyle: {
    container: {
      border: 'none',
    },
    button: {
      _hover: {
        bg: 'none',
      },
    },
  },
  sizes: {},
  variants: {},
  defaultProps: {},
}

export default AccordionStyles
