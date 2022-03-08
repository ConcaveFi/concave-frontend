import { theme } from '@chakra-ui/react'

export const borders = {}

export const radii = {}

export const fonts = {
  heading: `SharpSans, ${theme.fonts.heading}`,
  body: `ProductSans, ${theme.fonts.body}`,
}

export const shadows = {
  outline: '0 0 0 3px transparent',
  up: '4px -7px 15px 0px #AEB1FF21, 0px 5px 14px 0px #00000078, -1px 1px 2px 0px #80BAFF3D inset',
  down: '-1px 1px 3px 0px #7EA2FF42, -9px 12px 24px 0px #0D11177D inset, 0px -5px 5px 0px #FFFFFF05 inset',
  'Mini Down': 'inset 0px 1px 2px rgba(0, 0, 0, 0.33)',
  'Big Down':
    '-1px 1px 3px 0px #7EA2FF42, -9px 12px 24px 0px #0D11177D inset, 0px -5px 5px 0px #FFFFFF05 inset',
  'Inner Glow': '0px 0px 20px 0px #577CFF4D inset, 0px 4px 4px 0px #00000040',
  'Medium Glow Up':
    '13px -9px 23px 0px #8489FF2E, 0px 12px 11px 0px #00000073, 0px -5px 25px 0px #6E61FF2E inset',
}
