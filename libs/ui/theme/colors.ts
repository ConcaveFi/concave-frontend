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
    accent: '#2E97E2',
    small: '#748CA9',
    bright: '#79B2F4',
    brightGreen: '#24C9B5',
  },

  stroke: {
    primary:
      'linear-gradient(41.89deg, #53399B 0.69%, #7DE0FF 38.19%, #504179 72.85%, #84E2FF 100%)',
    secondary:
      'linear-gradient(57deg, #171E27 -7.38%, #435F81 29.46%, #202D3D 71.39%, #93C5FF 107.62%)',
    accent: 'linear-gradient(90deg, #72639B 0%, #44B9DE 100%)',
    brightGreen: 'linear-gradient( 180deg, #7AF0CD 0%, #24C9B5 100% )',
  },

  primary: /* purple & blue */ {
    1: '#8671C0',
    2: '#4DBEE1',
  },

  secondary: /* green */ {
    50: '#364E6A',
    75: '#19394C',
    100: '#1B3442',
    125: '#1C2E3E',
    150: '#0A161F',
  },

  subtle: '#2A425F',
}

export default colors
