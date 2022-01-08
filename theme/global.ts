import { mode, Styles } from '@chakra-ui/theme-tools'

const globalStyles: Styles = {
  global: (props) => ({
    html: {
      fontFamily: 'body',
      color: mode('gray.800', 'whiteAlpha.900')(props),
      // bg: mode('white', '#121212')(props),
      lineHeight: 'base',
      'color-scheme': mode('light', 'dark')(props),
    },
    body: {
      bgImage: 'url(/images/cave_bg.jpeg)',
      zIndex: -1,

      minHeight: '140vh', // temporary
    },
  }),
}

export default globalStyles
