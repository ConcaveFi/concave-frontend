import { colors } from './colors'

export const textures = {
  metal: {
    bg: 'url("/assets/textures/metal.png")',
    bgPos: '50% 50%, 0px 0px',
    bgSize: '120px, auto',
  },
  glass: 'url("/assets/textures/glass.jpg")',
  glassHQ: 'url("/assets/textures/glassHQ.jpg")',
}

export const backgrounds = {
  metal: {
    ...textures.metal,
    bg: `${textures.metal.bg}, linear-gradient(225deg, ${colors.secondary[150]} 9.27%, ${colors.secondary[25]} 92.62%)`,
  },
  metalBrighter: {
    ...textures.metal,
    bg: `${textures.metal.bg}, linear-gradient(225deg, ${colors.secondary[200]} 0%, ${colors.secondary[100]} 100.16%)`,
  },
  'metal(ALT)': {
    ...textures.metal,
    bg: `${textures.metal.bg}, linear-gradient(225deg, ${colors.secondary[175]} 0%, ${colors.secondary[50]} 100.16%)`,
  },
  sidebar: {
    ...textures.metal,
    bg: `${textures.metal.bg}, linear-gradient(270deg, ${colors.secondary[125]} 0%,${colors.secondary[75]} 100%)`,
  },
  glass: {
    pos: 'relative',
    '::after': {
      borderRadius: 'inherit',
      content: '""',
      bg: `${textures.glass}`,
      opacity: 0.4,
      inset: 0,
      pos: 'absolute',
      zIndex: -1,
      bgSize: 'cover',
      pointerEvents: 'none',
    },
    filter: 'drop-shadow(-2px 6px 6px rgba(13, 17, 22, 0.33))',
  },
  dashed: {
    backgroundImage: `
    repeating-linear-gradient(180deg, white, white 10px, transparent 10px, transparent 20px, blue 20px),
    repeating-linear-gradient(270deg, red, red 10px, transparent 10px, transparent 20px, red 20px),
    repeating-linear-gradient(45deg, white, white 10px, transparent 10px, transparent 20px, orange 20px),
    repeating-linear-gradient(90deg, white, white 7px, transparent 7px, transparent 10px, white 10px)`,
    backgroundSize: `2px 2px, 0% 2px, 2px 2px , 100% 2px;`,
    backgroundPosition: `0 100%, 0 0, 100% 100%, 0 100%`,
    backgroundRepeat: `no-repeat`,
  },
  glassHQ: {
    pos: 'relative',
    '::after': {
      borderRadius: 'inherit',
      content: '""',
      bg: `${textures.glassHQ}`,
      opacity: 0.5,
      inset: 0,
      pos: 'absolute',
      zIndex: -1,
      bgSize: 'cover',
      pointerEvents: 'none',
      shadow:
        'inset 0px 0px 20px rgba(94, 162, 224, 0.05), inset -1px 1px 2px rgba(128, 186, 255, 0.1)',
    },
    filter: 'drop-shadow(-2px 6px 6px rgba(13, 17, 22, 0.33))',
  },
}
export default backgrounds
