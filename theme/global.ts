import { mode, Styles } from '@chakra-ui/theme-tools'

const globalStyles: Styles = {
  global: (props) => ({
    body: {
      fontFamily: 'Inter',
      color: mode('gray.800', 'whiteAlpha.900')(props),
      bg: mode('white', '#121212')(props),
      lineHeight: 'base',
      'color-scheme': mode('light', 'dark')(props),
    },
  }),
}

export default globalStyles
