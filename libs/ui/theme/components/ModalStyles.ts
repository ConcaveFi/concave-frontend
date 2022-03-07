import { ComponentMultiStyleConfig } from '@chakra-ui/react'

export const ModalStyles: ComponentMultiStyleConfig = {
  parts: ['dialog', 'dialogContainer', 'overlay', 'header', 'body', 'closeButton'],
  baseStyle: {
    dialog: { bg: 'transparent', shadow: 'none', gap: 4 },
    header: { p: 0, fontWeight: 'bold', fontSize: '3xl', fontFamily: 'heading' },
    body: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      maxH: '75vh',
      overflowY: 'auto',
    },
    overlay: { backdropFilter: 'auto' },
    closeButton: { right: 0, top: 4 },
  },
  sizes: {},
  variants: {},
  defaultProps: {},
}

export default ModalStyles
