import { ComponentStyleConfig } from '@chakra-ui/react'
import { gradientBorder } from '../utils/gradientBorder'

export const CardStyles: ComponentStyleConfig = {
  baseStyle: ({ borderWidth = 1.1, borderRadius = '2xl', borderGradient, ...props }) => ({
    borderRadius,
    ...gradientBorder({ borderRadius, borderWidth, ...props, variant: borderGradient }),
  }),
  sizes: {},
  variants: {
    primary: (props) => ({
      apply: props.colorscheme === 'brighter' ? 'background.metalBrighter' : 'background.metal',
    }),
    secondary: {
      apply: 'background.glass',
    },
  },
  defaultProps: {},
}

export default CardStyles
