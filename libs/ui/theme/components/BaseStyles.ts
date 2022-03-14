import { ComponentMultiStyleConfig, theme } from '@chakra-ui/react'

export const BaseStyles: ComponentMultiStyleConfig = {
  parts: ['outerContainer', 'backgroundImage', 'innerContainer'],
  baseStyle: (props) => ({
    outerContainer: {
      borderRadius: '2xl',
      maxW: '100%',
      w: 'fit-content',
    },
    innerContainer: { borderRadius: '2xl' },
    backgroundImage: { src: '' },
  }),
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
        src: '/assets/blackboard.png',
        blendMode: 'screen',
        backdropFilter: 'blur(16px)',
        filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
        opacity: 0.45,
      },
    },
  },
  defaultProps: {},
}

export default BaseStyles
