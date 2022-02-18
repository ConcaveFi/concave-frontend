import { Styles } from '@chakra-ui/theme-tools'

const globalStyles: Styles = {
  global: (props) => ({
    html: {
      fontFamily: 'body',
      color: 'whiteAlpha.900',
      lineHeight: 'base',
      colorScheme: 'dark',
    },
    body: {
      bgImage: 'url(/images/cave_bg.jpeg)',
      zIndex: -1,

      minHeight: '120vh', // temporary
    },
  }),
}

export default globalStyles
