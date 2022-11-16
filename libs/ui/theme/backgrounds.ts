import colors from './colors'

export const textures = {
  metal: {
    bg: 'url("/assets/textures/metal.png")',
    bgPos: '50% 50%, 0px 0px',
    bgSize: '120px, auto',
  },
  glass: 'url("/assets/textures/v2_glass.webp")',
  glassHQ: 'url("/assets/textures/glassHQ.jpg")',
}

export const backgrounds = {
  glass: {
    bg: `linear-gradient(180deg, rgba(0, 0, 0, 0.002) 0%, rgba(0, 0, 0, 0.002) 50%, rgba(31, 94, 255, 0.124) 100%), ${textures.glass}`,
    bgSize: 'cover',
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
  'text-brightBlue': {
    bg: colors.stroke.brightBlue,
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
    backgroundClip: 'text',
  },
}
export default backgrounds
