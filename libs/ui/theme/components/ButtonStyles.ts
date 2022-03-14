import { ComponentSingleStyleConfig, cssVar, tokenToCSSVar } from '@chakra-ui/react'
import { gradientBorder } from '../utils/gradientBorder'

export const ButtonStyles: ComponentSingleStyleConfig = {
  baseStyle: {
    fontSize: '14px',
    lineHeight: 'initial',
    width: 'auto',
    borderRadius: 'xl',
    maxHeight: 'unset',
  },
  sizes: {
    large: {
      height: 50,
      px: 8,
    },
  },
  variants: {
    'primary.outline': (props) => ({
      ...gradientBorder({ borderRadius: 'xl', borderWidth: 2 }),
      shadow: 'up',
    }),
    primary: {
      ...gradientBorder({ borderRadius: 'xl' }),
      bgGradient: 'linear(to-r, primary.1, primary.2)',
      shadow: 'up',
    },
    secondary: {
      shadow: 'up',
    },
    navigation: (props) => ({
      height: '100%',
      borderX: 'solid 1px',
      borderColor: 'subtle',
      color: 'text.low',
      ...(props.isActive && {
        color: 'text.medium',
        textDecoration: 'underline',
      }),
      _even: {
        border: 'unset', // prevent double border when side by side
      },
      _last: {
        // doesn't matter if last is even, must have border
        borderX: 'solid 1px',
        borderColor: 'subtle',
      },
      boxShadow: 'inset 1px 0px 2px 0px rgba(16, 19, 23, 1), 1px 0px 2px 0px rgba(16, 19, 23, 1)',
      bg: 'transparent',
      _active: { bg: 'radialGradient' },
      _hover: { bg: 'radialGradient' },
    }),
  },
  defaultProps: {},
}

export default ButtonStyles
