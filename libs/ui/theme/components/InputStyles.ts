import { ComponentMultiStyleConfig } from '@chakra-ui/react'

export const InputStyles: ComponentMultiStyleConfig = {
  parts: ['field'],
  baseStyle: {
    field: {
      fontWeight: 'medium',
      _placeholder: {
        color: 'text.low',
      },
    },
  },
  sizes: {
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
        shadow: 'Big Down',
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
