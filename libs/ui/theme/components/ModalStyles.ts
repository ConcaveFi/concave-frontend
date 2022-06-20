import { ComponentMultiStyleConfig } from '@chakra-ui/react'
import { modalAnatomy } from '@chakra-ui/anatomy'

export const ModalStyles: ComponentMultiStyleConfig = {
  parts: modalAnatomy.keys,
  baseStyle: {
    dialog: { bg: 'transparent', shadow: 'none', gap: 4 },
    header: { p: 0, fontWeight: 'bold', fontSize: '3xl', fontFamily: 'heading' },
    body: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      p: 6,
      maxH: '75vh',
      overflowY: 'auto',
    },
    overlay: { backdropFilter: 'auto' },
    closeButton: {
      right: 0,
      top: 3,
      border: 'solid 2px white',
      _focus: {
        opacity: 0.8,
        transform: 'scale(1.05)',
        shadow: 'Up Big',
        _hover: {
          opacity: 0.6,
          transform: 'scale(1)',
        },
      },
      _hover: {
        opacity: 0.6,
      },
    },
  },
  sizes: {},
  variants: {},
  defaultProps: {},
}

export default ModalStyles
