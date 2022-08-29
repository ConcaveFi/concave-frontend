import { ComponentSingleStyleConfig, theme } from '@chakra-ui/react'

export const CloseButtonStyles: ComponentSingleStyleConfig = {
  baseStyle: {
    borderRadius: 'full',
  },
  sizes: {
    sm: {
      ...theme.components.CloseButton.sizes.sm,
      fontSize: '8px',
    },
  },
  variants: {
    subtle: {
      fontSize: '10px',
      color: 'text.low',
      _hover: { color: 'text.high' },
      _active: { color: 'text.high' },
      _focus: { color: 'text.high', transform: 'scale(1.1)' },
    },
  },
  defaultProps: {
    size: 'sm',
  },
}

export default CloseButtonStyles
