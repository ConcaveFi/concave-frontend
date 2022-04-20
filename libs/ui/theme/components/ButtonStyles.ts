import { ComponentSingleStyleConfig, ButtonProps } from '@chakra-ui/react'
import { gradientBorder } from '../utils/gradientBorder'

const HoverRadialGradient =
  'radial-gradient(80% 232.61% at 52.27% 160%, #578CF2C4 0%, #895FFF1C 100%)'

const PrimaryButtonShadow =
  '20px -20px 39px rgba(120, 182, 255, 0.25), 0px 5px 14px rgba(0, 0, 0, 0.47), inset 0px -10px 20px rgba(117, 164, 255, 0.5)'

const ButtonPrimaryTheme = (props) => ({
  borderRadius: '2xl',
  ...gradientBorder({ borderRadius: '2xl' }),
  bgGradient: 'linear(to-r, primary.1, primary.2)',
  fontFamily: 'heading',
  fontWeight: 'bold',
  shadow: PrimaryButtonShadow,
  _focus: { shadow: PrimaryButtonShadow },
})

const ButtonSecondaryTheme = (props) => ({
  apply: 'background.metalBrighter',
  shadow: 'Up Big',
  borderRadius: '2xl',
  _active: {
    bg: HoverRadialGradient,
    color: 'text.high',
    transform: 'scale(1)',
    ...gradientBorder({ borderRadius: '2xl', ...props, variant: 'primary' }),
  },
  _focus: {
    bg: HoverRadialGradient,
    color: 'text.high',
    ...gradientBorder({ borderRadius: '2xl', ...props, variant: 'primary' }),
  },
  _hover: {
    bg: HoverRadialGradient,
    color: 'text.high',
    ...gradientBorder({ borderRadius: '2xl', ...props, variant: 'primary' }),
  },
})

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
    _active: { transform: 'scale(0.96)' },
    _disabled: {
      cursor: 'default',
      _active: { transform: 'scale(1)' },
    },
    _hover: {
      _disabled: {
        opacity: 0.5,
        bg: null,
      },
    },
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
    primary: ButtonPrimaryTheme,
    'primary.outline': (props) => ({
      ...ButtonPrimaryTheme(props),
      ...gradientBorder({ borderRadius: '2xl', borderWidth: 2 }),
      bg: 'none',
      fontWeight: 'bold',
      shadow: 'Up Big',
      _hover: { bg: HoverRadialGradient, color: 'text.high' },
    }),
    secondary: ButtonSecondaryTheme,
    'secondary.outline': (props) => ({
      ...ButtonSecondaryTheme(props),
      ...gradientBorder({ borderRadius: '2xl', ...props, variant: 'primary' }),
    }),
  },
  defaultProps: {
    variant: null,
    size: null,
  },
}

export default ButtonStyles
