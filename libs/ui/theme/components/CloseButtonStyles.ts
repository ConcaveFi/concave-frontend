import { ComponentSingleStyleConfig, theme } from '@chakra-ui/react'

export const CloseButtonStyles: ComponentSingleStyleConfig = {
  baseStyle: {
    borderRadius: 'full',
    border: 'solid 2px white',
  },
  sizes: {
    sm: {
      ...theme.components.CloseButton.sizes.sm,
      fontSize: '8px',
    },
  },
  variants: {},
  defaultProps: {
    size: 'sm',
  },
}

export default CloseButtonStyles
