import { ComponentMultiStyleConfig, cssVar, theme } from '@chakra-ui/react'
import { gradientBorder } from '../utils/gradientBorder'

// const $borderRadius = cssVar('card-border-radius', '2xl')

export const CardStyles: ComponentMultiStyleConfig = {
  parts: ['container', 'texture'],
  baseStyle: ({ borderWidth = 1 }) => ({
    container: {
      borderRadius: '2xl',
      maxW: '100%',
      w: 'fit-content',
      h: 'fit-content',
      ...gradientBorder({ borderRadius: '2xl', borderWidth }),
    },
  }),
  sizes: {},
  variants: {
    primary: {
      container: {
        bgGradient: 'linear(to-tr, secondary.150, secondary.100)',
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
      },
    },
  },
  defaultProps: {},
}

export default CardStyles
