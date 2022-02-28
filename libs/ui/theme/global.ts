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
      bgImage: 'url(/assets/cave-bg.jpeg)',
      minHeight: '120vh', // temporary
    },
  }),
}

export default globalStyles
