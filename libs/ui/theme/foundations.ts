import { theme } from '@chakra-ui/react'

export const borders = {}

export const radii = {}

export const fonts = {
  heading: `SharpSans, ${theme.fonts.heading}`,
  body: `ProductSans, ${theme.fonts.body}`,
}

export const shadows = {
  outline: '0 0 0 3px transparent',
  outsideDown: '0px 4px 4px rgba(0, 0, 0, 0.25), inset -1px 1px 2px rgba(128, 186, 255, 0.05)',
  low: '-1px 1px 3px rgba(126, 162, 255, 0.26), inset 0px -5px 5px rgba(255, 255, 255, 0.02), inset -9px 12px 24px rgba(13, 17, 23, 0.49)',
  up: '4px -7px 15px 0px #AEB1FF21, 0px 5px 14px 0px #00000078, -1px 1px 2px 0px #80BAFF3D inset',
  down: '-1px 1px 3px 0px #7EA2FF42, -9px 12px 24px 0px #0D11177D inset, 0px -5px 5px 0px #FFFFFF05 inset',
  'Mini Down': 'inset 0px 1px 2px rgba(0, 0, 0, 0.33)',
  'Big Down':
    '-1px 1px 3px 0px #7EA2FF42, -9px 12px 24px 0px #0D11177D inset, 0px -5px 5px 0px #FFFFFF05 inset',
}
