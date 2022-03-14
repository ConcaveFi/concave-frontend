import { ComponentMultiStyleConfig, cssVar, theme } from '@chakra-ui/react'
import { gradientBorder } from '../utils/gradientBorder'

// const $borderRadius = cssVar('card-border-radius', '2xl')

export const CardStyles: ComponentMultiStyleConfig = {
  parts: ['outerContainer', 'backgroundImage', 'innerContainer'],
  baseStyle: {
    outerContainer: {
      borderRadius: '2xl',
      maxW: '100%',
      w: 'fit-content',
      ...gradientBorder({ borderRadius: '2xl', borderWidth: 1 }),
    },
    innerContainer: { borderRadius: '2xl' },
    backgroundImage: { src: '' },
  },
  sizes: {},
  variants: {
    primary: {
      outerContainer: {
        bgGradient: 'linear(to-tr, secondary.150, secondary.100)',
      },
    },
    secondary: {
      innerContainer: { blendMode: 'screen' },
      backgroundImage: {
        src: '/assets/textures/glass.png',
        blendMode: 'screen',
        backdropFilter: 'blur(16px)',
        filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
        opacity: 0.45,
      },
    },
  },
  defaultProps: {},
}

export default CardStyles
