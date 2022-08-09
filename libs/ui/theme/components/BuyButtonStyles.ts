import { ComponentStyleConfig } from '@chakra-ui/react'
import { gradientBorder } from '../utils/gradientBorder'

export const BuyButtonStyles: ComponentStyleConfig = {
  parts: ['card', 'button'],
  baseStyle: ({
    borderWidth = 2,
    borderRadius = '2xl',
    borderColor = `linear-gradient(45deg, #122235 0%, #7DADD0 30.74%, #272138 67.72%, #7D9EC6 100%)`,
    borderGradient,
    ...props
  }) => ({
    card: {
      justifyContent: 'space-between',
      colorScheme: 'brighter',
      borderRadius,
      ...gradientBorder({
        borderRadius,
        borderWidth: borderWidth,
        borderColor,
        ...props,
        variant: borderGradient,
      }),
    },
    button: {
      _active: { transform: 'scale(0.96)' },
      _disabled: {
        cursor: 'default',
        _active: { transform: 'scale(1)' },
        opacity: 1,
      },
      display: 'flex',
      alignItems: 'center',
      fontWeight: 'bold',
      justifyContent: 'center',
      px: 4,
      borderColor,
      borderRadius,
      ...gradientBorder({ borderRadius, borderWidth, ...props, variant: borderGradient }),
    },
  }),
  sizes: {
    md: (props) => ({
      card: {
        pl: 2,
        h: '60px',
        w: props.w,
      },
      button: {
        fontSize: props.disabled || props.isLoading ? '14px' : '18px',
        px: 2,
        h: '60px',
        w: props.w,
      },
    }),
  },
  variants: {
    primary: (props) => ({
      card: {},
      button: {
        bgGradient: props.disabled || props.isLoading ? '' : 'linear(to-r, primary.1, primary.2)',
      },
    }),
    'primary.outline': (props) => ({
      card: {},
      button: {},
    }),
  },
  defaultProps: {},
}

export default BuyButtonStyles
