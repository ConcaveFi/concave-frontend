import { ComponentSingleStyleConfig } from '@chakra-ui/react'
import { gradientStroke } from '../utils/gradientStroke'
import colors from '../colors'

export const ButtonStyles: ComponentSingleStyleConfig = {
  baseStyle: {
    fontSize: '14px',
    lineHeight: 'initial',
    width: 'auto',
    borderRadius: 0,
    maxHeight: 'unset',
  },
  sizes: {
    large: {
      height: 50,
      px: 8,
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
    secondary: {
      shadow: 'up',
    },
     navigation_home: (props) => ({
      height: '100%',
      bg: 'transparent',
      _active: { bg: 'radialGradient' },
      _hover: { bg: 'radialGradient' },
    }),
    navigation2: (props) => ({
      height: '100%',
      borderX: 'solid 1px',
      boxShadow: '1px 0px 2px #101317',
      textColor: 'grey.500',

      bg: 'transparent',
      _active: {
        bg: 'radialGradient',
        textDecorationLine: 'underline',
        textDecorationColor: '#4FD1C5',
        textDecorationThickness: '1px',
        textColor: '#fff',
      },
      _hover: {
        bg: 'radialGradient',
        textDecorationLine: 'underline',
        textDecorationColor: 'text.1',
        textDecorationThickness: '1px',
        textColor: '#fff',
      },
    }),
    navigation: (props) => ({
      height: '100%',
      borderX: 'solid 1px',
      borderColor: 'grey.800',
      _even: {
        borderLeft: 'unset', // prevent double border when side by side
      },
      bg: 'transparent',
      _active: { bg: 'radialGradient' },
      _hover: { bg: 'radialGradient' },
    }),
  },
  defaultProps: {},
}

export default ButtonStyles
