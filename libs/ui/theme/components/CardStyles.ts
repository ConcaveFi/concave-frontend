import { ComponentStyleConfig } from '@chakra-ui/react'
import { gradientBorder } from '../utils/gradientBorder'

const variants = {
  primary: { bg: 'bg.primary', },
  secondary: { apply: 'background.glass' },
}

export const CardStyles: ComponentStyleConfig = {
  baseStyle: ({ borderWidth = 2, borderRadius = '2xl', borderGradient, ...props }) => {
    const variant = variants[props.variant]
    return {
      borderRadius,
      ...gradientBorder({ borderRadius, borderWidth, ...props, variant: borderGradient }),
      ...variant
    }
  },
  sizes: {},
  //it is not working
  variants,
  defaultProps: {},
}

export default CardStyles
