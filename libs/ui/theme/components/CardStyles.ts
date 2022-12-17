import { ComponentStyleConfig } from '@chakra-ui/react'
import { gradientBorder } from '../utils/gradientBorder'

export const CardStyles: ComponentStyleConfig = {
  baseStyle: ({ borderWidth = 2, borderRadius = '2xl', borderGradient, ...props }) => ({
    borderRadius,
    ...gradientBorder({ borderRadius, borderWidth, ...props, variant: borderGradient }),
  }),
  sizes: {},
  variants: {
    primary: (props) => ({
      bg: 'bg.primary',
    }),
    secondary: {
      apply: 'background.glass',
    },
    'secondary.transparent': {
      apply: 'background.glass-transparent',
    },
  },
  defaultProps: {},
}

export default CardStyles
