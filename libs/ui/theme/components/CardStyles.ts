import { ComponentMultiStyleConfig, cssVar, theme } from '@chakra-ui/react'
import { gradientBorder } from '../utils/gradientBorder'

export const CardStyles: ComponentMultiStyleConfig = {
  parts: ['container', 'texture'],
  baseStyle: ({ borderWidth = 1, borderRadius = '2xl' }) => ({
    container: {
      borderRadius,
      maxW: '100%',
      ...gradientBorder({ borderRadius, borderWidth }),
    },
    texture: {
      userSelect: 'none',
    },
  }),
  sizes: {},
  variants: {
    primary: {
      container: {
        bgGradient: 'linear(to-tr, secondary.150, secondary.100)',
      },
      texture: {
        src: '/assets/textures/metal.jpg',
        width: 120,
        height: 120,
        blendMode: 'screen',
        opacity: 0.15,
        inset: 0,
      },
    },
    secondary: {
      container: {
        blendMode: 'screen',
        backdropFilter: 'blur(15px)',
        filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
      },
      texture: {
        src: '/assets/textures/glass.jpg',
        opacity: 0.45,
        inset: 0,
        w: '100%',
        h: '100%',
      },
    },
  },
  defaultProps: {},
}

export default CardStyles
