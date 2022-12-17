import colors from './colors'

export const textures = {
  glass: 'url("/assets/textures/v2_glass.webp")',
}

export const backgrounds = {
  glass: {
    bg: `linear-gradient(180deg, rgba(0, 0, 0, 0.002) 0%, rgba(0, 0, 0, 0.002) 50%, rgba(31, 94, 255, 0.124) 100%), ${textures.glass}`,
    bgSize: 'cover',
  },
  'glass-transparent': {
    '&:after': {
      content: "''",
      inset: 0,
      position: 'absolute',
      bg: `linear-gradient(180deg, rgba(0, 0, 0, 0.002) 0%, rgba(0, 0, 0, 0.002) 50%, rgba(31, 94, 255, 0.124) 100%), ${textures.glass}`,
      zIndex: 0,
      shadow: 'Glow Inner',
      opacity: 0.7,
    },
  },
  'text-brightBlue': {
    bg: colors.stroke.brightBlue,
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
    backgroundClip: 'text',
  },
}
export default backgrounds
