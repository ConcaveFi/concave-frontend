/*
Defining colors: 
  - Base color: 100
  - Shades darker than base color: >100 (eg. primary.110 -> 10% darker then primary)
  - Shades lighter than base color: <100 (eg. secondary.20 -> 80% lighter then secondary)
*/

export const colors = {
  text: /* contrast */ {
    high: '#fff',
    low: '#5f7a99',
  },
  'Big Color Darker': 'linear-gradient(239.18deg, #19394C 27.18%, #0A161F 96.11%)',
  stroke: {
    // acent on figma
    primary:
      'linear-gradient(41.89deg, #53399B 0.69%, #7DE0FF 38.19%, #504179 72.85%, #84E2FF 100%)',
    //medium on figma
    secondary:
      'linear-gradient(57deg, #171E27 -7.38%, #435F81 29.46%, #202D3D 71.39%, #93C5FF 107.62%)',
  },

  primary: /* purple & blue */ {
    1: '#8671C0',
    2: '#4DBEE1',
  },
  secondary: /* green */ {
    50: '#19394C',
    100: '#1B3442',
    150: '#0A161F',
  },
  teste: {
    1: ';',
  },

  subtle: '#2A425F',
}

export default colors
