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
        p: 3,
        borderRadius: 'xl',
      },
    },
    medium: {
      field: {
        fontWeight: 'semibold',
        fontSize: 'md',
        p: 2.5,
        borderRadius: 'xl',
      },
    },
    large: {
      field: {
        height: '90px',
        fontWeight: 'semibold',
        fontSize: '2xl',
        px: 4,
        py: 3,
        borderRadius: '2xl',
      },
    },
  },
  variants: {
    primary: {
      field: {
        shadow: 'Down Big',
        bg: 'blackAlpha.300',
      },
    },
  },
  defaultProps: {
    variant: 'primary',
    size: 'small',
  },
}

export default InputStyles
