import { theme } from '@chakra-ui/react'

export const fonts = {
  heading: `SharpSans, ${theme.fonts.heading}`,
  body: `ProductSans, ${theme.fonts.body}`,
}

export const shadows = {
  outline: '0 0 0 3px transparent',
  up: '4px -7px 15px 0px #AEB1FF21, 0px 5px 14px 0px #00000078, -1px 1px 2px 0px #80BAFF3D inset',
  down: '-1px 1px 3px 0px #7EA2FF42, -9px 12px 24px 0px #0D11177D inset, 0px -5px 5px 0px #FFFFFF05 inset',
  'Up for Blocks':
    '0px 4px 86px rgba(123, 129, 255, 0.3), 0px 20px 30px rgba(0, 0, 0, 0.47), inset -10px 10px 30px rgba(128, 156, 255, 0.1)',
  'Up Big':
    '4px -7px 15px 0px #AEB1FF21, 0px 5px 14px 0px #00000078, -1px 1px 2px 0px #80BAFF3D inset',

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

  'Magic Big':
    '0px 0px 16px rgba(78, 149, 255, 0.19), -1px 1px 3px rgba(104, 146, 255, 0.54), inset 0px -23px 40px rgba(77, 127, 255, 0.17), inset -11px 10px 12px rgba(0, 0, 0, 0.44)',

  'Glass Up Medium':
    '0px 12px 11px rgba(0, 0, 0, 0.45), 13px -9px 23px rgba(132, 137, 255, 0.18), inset 0px -5px 25px rgba(110, 97, 255, 0.18)',

  'Block Up':
    '0px 4px 86px rgba(123, 129, 255, 0.3), 0px 20px 30px rgba(0, 0, 0, 0.47), inset -10px 10px 30px rgba(128, 156, 255, 0.1)',
}
