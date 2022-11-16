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

  bg: {
    primary:
      'linear-gradient(180deg, rgba(10, 18, 38, 0.05) 0%, rgba(5, 11, 26, 0.05) 33.33%, rgba(29, 50, 104, 0.05) 66.67%, rgba(45, 141, 255, 0.15) 100%), linear-gradient(90deg, #050D1C 0%, #151A33 50%, #003053 100%)',
  },

  stroke: {
    primary:
      'linear-gradient(41.89deg, #53399B 0.69%, #7DE0FF 38.19%, #504179 72.85%, #84E2FF 100%)',
    secondary:
      'linear-gradient(57deg, #171E27 -7.38%, #435F81 29.46%, #202D3D 71.39%, #93C5FF 107.62%)',
    accent: 'linear-gradient(90deg, #72639B 0%, #44B9DE 100%)',
    brightGreen: 'linear-gradient( 180deg, #7AF0CD 0%, #24C9B5 100% )',
    brightBlue: 'linear-gradient(90.08deg, #92B7FF 0.13%, #FFFFFF 99.87%), #FFFFFF',
  },

  primary: /* purple & blue */ {
    1: '#8671C0',
    2: '#4DBEE1',
  },

  secondary: /* green */ {
    200: '#2F4359',
    175: '#2B3C50',
    150: '#142E3D',
    125: '#142C39',
    100: '#162534',
    75: '#101D26',
    50: '#0A1722',
    25: '#08141D',
  },

  subtle: '#2A425F',
}

export default colors
