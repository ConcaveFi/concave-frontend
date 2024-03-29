import { ComponentSingleStyleConfig } from '@chakra-ui/react'
import { gradientBorder } from '../utils/gradientBorder'

const PrimaryButtonShadow =
  '20px -20px 39px rgba(120, 182, 255, 0.25), 0px 5px 14px rgba(0, 0, 0, 0.47), inset 0px -10px 20px rgba(117, 164, 255, 0.5)'

const ButtonPrimaryTheme = (props) => ({
  _focus: { shadow: PrimaryButtonShadow, transform: 'scale(1.05)' },
  _hover: { _disabled: { opacity: 1 } },
  shadow: PrimaryButtonShadow,
  fontFamily: 'heading',
  borderRadius: '2xl',
  fontWeight: 'bold',
  px: props.px,
  py: props.py,
  '&:enabled': {
    ...gradientBorder({ borderRadius: '2xl', borderWidth: props.borderWidth }),
    bgGradient: 'linear(to-r, primary.1, primary.2)',
  },
  _disabled: {
    bg: 'none',
    shadow: 'Up Big',
    color: 'text.low',
  },
})

const ButtonSecondaryTheme = (props) => ({
  bg: 'bg.primary',
  shadow: 'Up Big',
  borderRadius: '2xl',
  _active: {
    bg: 'bg.secondary',
    shadow: 'Glass Inner',
    color: 'text.high',
    transform: 'scale(1)',
  },
  _focus: {
    bg: 'bg.secondary',
    shadow: 'Glass Inner',
    color: 'text.high',
  },
  _hover: {
    bg: 'bg.secondary',
    shadow: 'Glass Inner',
    color: 'text.high',
  },
})

const ButtonSelectTheme = (props) => ({
  borderRadius: 'full',
  h: 'auto',
  w: 'min',
  fontFamily: 'heading',
  fontWeight: 'bold',
  rounded: 'full',
  shadow: 'Up Small',
  _hover: { shadow: 'Up Big', _disabled: { shadow: 'Up Small', opacity: 1 } },
  _focus: { shadow: 'Up Big' },
  _active: { shadow: 'down' },
  _selected: { shadow: 'Down Big', color: 'text.low', _hover: { bg: 'blackAlpha.100' } },
  _disabled: { shadow: 'Up Small' },
  p: 1,
  fontSize: 'sm',
})

export const ButtonStyles: ComponentSingleStyleConfig = {
  baseStyle: (props) => ({
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
      opacity: 1,
    },
    _hover: {
      _disabled: {
        opacity: 0.5,
        bg: null,
      },
    },
    ...{
      primary: gradientBorder({ ...props, variant: 'primary' }),
      secondary: gradientBorder({ ...props, variant: 'secondary' }),
    }[props.border],
  }),
  sizes: {
    large: {
      height: '50px',
      px: 8,
      fontSize: '2xl',
    },
    medium: {
      height: '40px',
      px: 3,
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
      _hover: { color: 'text.high' },
    }),
    secondary: ButtonSecondaryTheme,
    select: ButtonSelectTheme,
  },
  defaultProps: {
    variant: null,
    size: null,
  },
}

export default ButtonStyles
