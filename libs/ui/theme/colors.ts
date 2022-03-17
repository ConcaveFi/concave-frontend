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

  primary: /* purple & blue */ {
    1: '#8671C0',
    2: '#4DBEE1',
  },
  secondary: /* green */ {
    50: '#19394C',
    100: '#1B3442',
    150: '#0A161F',
  },

  subtle: '#2A425F',
}

export default colors
