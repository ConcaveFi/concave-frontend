import { ComponentSingleStyleConfig } from '@chakra-ui/react'

export const InputStyles: ComponentSingleStyleConfig = {
  baseStyle: {},
  sizes: {},
  variants: {
    primary: {
      p: 3,
      shadow: 'Big Down',
      borderRadius: '2xl',
      bgColor: 'blackAlpha.300',
    },
  },
  defaultProps: {
    variant: 'primary',
  },
}

export default InputStyles
