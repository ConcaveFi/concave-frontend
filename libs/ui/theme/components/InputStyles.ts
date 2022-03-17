import { ComponentMultiStyleConfig } from '@chakra-ui/react'
import { inputAnatomy } from '@chakra-ui/anatomy'

export const InputStyles: ComponentMultiStyleConfig = {
  parts: inputAnatomy.keys,
  baseStyle: {
    field: {
      fontWeight: 'medium',
      _placeholder: {
        color: 'text.low',
      },
    },
  },
  sizes: {
    unset: {
      field: {},
    },
    small: {
      field: {
        height: '40px',
        fontSize: 'sm',
      },
    },
  },
  variants: {
    primary: {
      field: {
        p: 3,
        borderRadius: 'xl',
        shadow: 'Down Big',
        bgColor: 'blackAlpha.300',
      },
    },
  },
  defaultProps: {
    variant: 'primary',
    size: 'small',
  },
}

export default InputStyles
