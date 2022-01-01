import { ComponentStyleConfig } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'
import { gradientStroke } from 'theme/utils/gradientStroke'
import colors from '../colors'

export const CardStyles: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: '2xl',
    width: 'fit-content',
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
