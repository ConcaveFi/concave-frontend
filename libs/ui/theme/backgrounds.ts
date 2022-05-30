import { CSSObject } from '@chakra-ui/react'
import { colors } from './colors'

const textures = {
  metal: 'url("/assets/textures/metal.png")',
  glass: 'url("/assets/textures/glass.jpg")',
}

export const backgrounds: CSSObject = {
  metal: {
    bg: `${textures.metal}, linear-gradient(to bottom left, ${colors.secondary[75]} 30%, ${colors.secondary[150]} 96%)`,
    bgPos: '50% 50%, 0px 0px',
    bgSize: '120px, auto',
  },
  metalBrighter: {
    bg: `${textures.metal}, linear-gradient(to bottom right, ${colors.secondary[125]} 0%, ${colors.secondary[50]} 100%)`,
    bgPos: '50% 50%, 0px 0px',
    bgSize: '120px, auto',
  },
  sidebar: {
    bg: `${textures.metal}, radial-gradient(circle farthest-corner at 100% 50%, ${colors.secondary[75]} 20%, ${colors.secondary[150]})`,
    bgPos: '50% 50%, 0px 0px',
    bgSize: '120px, auto',
  },
  glass: {
    pos: 'relative',
    '::after': {
      borderRadius: 'inherit',
      content: '""',
      bg: `${textures.glass}`,
      opacity: 0.3,
      inset: 0,
      pos: 'absolute',
      zIndex: -1,
      bgSize: 'cover',
      pointerEvents: 'none',
    },
    backdropFilter: 'blur(8px)', // it's technically blur(15px) on figma but visually 8px looks better
    filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
  },
}

export default backgrounds
