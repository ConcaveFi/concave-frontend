import { ComponentStyleConfig } from '@chakra-ui/react'
import { gradientStroke } from '../utils/gradientStroke'
import colors from '../colors'

export const CardStyles: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: '2xl',
  },
  sizes: {},
  variants: {
    primary: (props) => ({
      ...gradientStroke(props),
      boxShadow: 'up',
      bgGradient: colors.gradients.green,
    }),
    secondary: (props) => ({
      ...gradientStroke(props),
    }),
  },
  defaultProps: {
    variant: 'secondary',
  },
}

export default CardStyles
