/*
Defining colors: 
  - Base color: 100
  - Shades darker than base color: >100 (eg. primary.110 -> 10% darker then primary)
  - Shades lighter than base color: <100 (eg. secondary.20 -> 80% lighter then secondary)
*/

export const colors = {
  text: /* contrast */ {
    high: '#fff',
    medium: '#D7E9FF',
    low: '#5f7a99',
  },

  primary: /* purple & blue */ {
    1: '#8671C0',
    2: '#4DBEE1',
  },
  secondary: /* green */ {
    100: '#1B3442',
    150: '#0A161F',
  },

  subtle: '#2A425F',

  strokeReflection:
    'linear-gradient(41.89deg, #53399B 0.69%, #7DE0FF 38.19%, #504179 72.85%, #84E2FF 100%)',
  radialGradient:
    'radial-gradient(97.48% 82.4% at 49.69% 76.45%, #3082E1 0%, #3D3786 31.18%, transparent 100%)',
}

export default colors
