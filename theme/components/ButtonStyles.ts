import { ComponentStyleConfig, theme } from '@chakra-ui/react'
import { mode, SystemStyleInterpolation } from '@chakra-ui/theme-tools'
import { gradientStroke } from 'theme/utils/gradientStroke'
import colors from '../colors'

export const ButtonStyles: ComponentStyleConfig = {
  baseStyle: {
    fontSize: '14px',
    width: 'auto',
  },
  sizes: {
    large: {
      height: 50,
      borderRadius: 'xl',
    },
  },
  variants: {
    'primary.outline': (props) => ({
      ...gradientStroke(props),
      shadow: 'up',
    }),
    primary: (props) => ({
      ...gradientStroke(props),
      bgGradient: colors.gradients.primary,
      shadow: 'up',
    }),
    contained: {
      shadow: 'up',
      bg: 'transparent',
    },
    secondary: {
      shadow: 'up',
    },
  },
  defaultProps: {},
}

export default ButtonStyles
