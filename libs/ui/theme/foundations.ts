import { theme } from '@chakra-ui/react'

export const fonts = {
  heading: `SharpSans, ${theme.fonts.heading}`,
  body: `ProductSans, ${theme.fonts.body}`,
}

export const shadows = {
  outline: '0 0 0 3px transparent',
  up: '4px -7px 15px 0px #AEB1FF21, 0px 5px 14px 0px #00000078, -1px 1px 2px 0px #80BAFF3D inset',
  down: '-1px 1px 3px 0px #7EA2FF42, -9px 12px 24px 0px #0D11177D inset, 0px -5px 5px 0px #FFFFFF05 inset',
  'Bright Button':
    '20px -20px 39px rgba(120, 182, 255, 0.25), 0px 5px 14px rgba(0, 0, 0, 0.47), inset 0px -10px 20px rgba(117, 164, 255, 0.5);',
  'Up Big':
    '0px 5px 14px rgba(0, 0, 0, 0.47), 4px -7px 15px rgba(174, 177, 255, 0.13), inset -1px 1px 2px rgba(128, 186, 255, 0.24)',
  'Up Small': '0px 4px 4px rgba(0, 0, 0, 0.25), inset -1px 1px 2px rgba(128, 186, 255, 0.05)',
  'Up Big + Shadows':
    '0px 23px 50px rgba(0, 0, 0, 0.8), 4px -7px 15px rgba(174, 177, 255, 0.13), inset -1px 1px 2px rgba(128, 186, 255, 0.24)',

  'Down Small': 'inset 0px 1px 2px rgba(0, 0, 0, 0.33)',
  'Down Medium':
    'inset 0px -5px 10px rgba(134, 175, 255, 0.05), inset -9px 12px 24px rgba(13, 17, 23, 0.4)',
  'Down Big':
    '-1px 1px 3px rgba(126, 162, 255, 0.26), inset 0px -5px 5px rgba(255, 255, 255, 0.02), inset -9px 12px 24px rgba(13, 17, 23, 0.49)',

  'Glow Inner': '0px 0px 20px 0px #577CFF4D inset, 0px 4px 4px 0px #00000040',
  'Glow Up Medium':
    '13px -9px 23px 0px #8489FF2E, 0px 12px 11px 0px #00000073, 0px -5px 25px 0px #6E61FF2E inset',
}
