import { colors } from './colors'

export const textures = {
  metal: {
    bg: 'url("/assets/textures/metal.png")',
    bgPos: '50% 50%, 0px 0px',
    bgSize: '120px, auto',
  },
  glass: {
    bg: 'url("/assets/textures/glass.jpg")',
  },
  glassBig: 'url("/assets/textures/glassBig.jpg")',
}

export const backgrounds = {
  metal: {
    ...textures.metal,
    bg: `${textures.metal.bg}, linear-gradient(to bottom left, ${colors.secondary[75]} 30%, ${colors.secondary[150]} 96%)`,
  },
  metalBrighter: {
    ...textures.metal,
    bg: `${textures.metal.bg}, linear-gradient(to right, ${colors.secondary[125]} 0%, ${colors.secondary[50]} 100%)`,
  },
  sidebar: {
    ...textures.metal,
    bg: `${textures.metal.bg}, radial-gradient(circle farthest-corner at 100% 50%, ${colors.secondary[75]} 20%, ${colors.secondary[150]})`,
  },
  glass: {
    pos: 'relative',
    '::after': {
      ...textures.glass,
      borderRadius: 'inherit',
      content: '""',
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
  glassBig: {
    pos: 'relative',
    '::after': {
      borderRadius: 'inherit',
      content: '""',
      bg: `${textures.glassBig}`,
      opacity: 0.5,
      inset: 0,
      pos: 'absolute',
      zIndex: -1,
      bgSize: 'cover',
      shadow: 'inset -30px 30px 20px rgba(0, 0, 0, 0.35)',
    },
    filter:
      'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25)) drop-shadow(-20px 30px 20px rgba(6, 9, 12, 0.5)) drop-shadow(4px -7px 20px rgba(174, 177, 255, 0.13))',
  },
}
export default backgrounds
