import { ComponentSingleStyleConfig, cssVar, tokenToCSSVar } from '@chakra-ui/react'
import { gradientBorder } from '../utils/gradientBorder'

const HoverRadialGradient =
  'radial-gradient(97.48% 120.4% at 49.69% 76.45%, #3082E1 0%, #3D3786 31.18%, transparent 100%)'

const PrimaryButtonShadow =
  '20px -20px 39px rgba(120, 182, 255, 0.25), 0px 5px 14px rgba(0, 0, 0, 0.47), inset 0px -10px 20px rgba(117, 164, 255, 0.5)'

export const ButtonStyles: ComponentSingleStyleConfig = {
  baseStyle: {
    fontSize: '14px',
    lineHeight: 'initial',
    width: 'auto',
    borderRadius: 'xl',
    maxHeight: 'unset',
    borderColor: 'transparent',
    display: 'flex',
    alignItems: 'center',
    _active: { transform: 'scale(0.95)' },
  },
  sizes: {
    large: {
      height: '50px',
      px: 8,
      fontSize: '2xl',
    },
    medium: {
      height: '40px',
    },
  },
  variants: {
    'primary.outline': {
      borderRadius: '2xl',
      ...gradientBorder({ borderRadius: '2xl', borderWidth: 2 }),
      fontFamily: 'heading',
      fontWeight: 'bold',
      shadow: 'Up Big',
      _hover: { bg: HoverRadialGradient, color: 'text.high' },
    },
    primary: {
      borderRadius: '2xl',
      ...gradientBorder({ borderRadius: '2xl' }),
      bgGradient: 'linear(to-r, primary.1, primary.2)',
      fontFamily: 'heading',
      fontWeight: 'bold',
      shadow: PrimaryButtonShadow,
      _focus: { shadow: PrimaryButtonShadow },
    },
    secondary: {
      bgGradient: 'linear(to-r, secondary.125, secondary.50)',
      shadow: 'Up Big',
    },
    navigation: (props) => ({
      height: '100%',
      borderX: 'solid 1px',
      borderColor: 'subtle',
      color: 'text.low',
      ...(props.isActive && {
        color: 'text.high',
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
      _active: { bg: HoverRadialGradient },
      _hover: { bg: HoverRadialGradient },
    }),
  },
  defaultProps: {
    variant: null,
  },
}

export default ButtonStyles
