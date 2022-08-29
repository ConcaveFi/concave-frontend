import { ComponentStyleConfig } from '@chakra-ui/react'

const HeadingStyles: ComponentStyleConfig = {
  baseStyle: {
    fontFamily: 'heading',
  },
  variants: {
    H6: {
      fontWeight: 'regular',
      fontSize: '24px',
    },
    H5: {
      fontWeight: 'regular',
      fontSize: '32px',
    },
    H4: {
      fontWeight: 'regular',
      fontSize: '40px',
    },
    H2: {
      fontWeight: 'regular',
      fontSize: '54px',
    },
  },
  defaultProps: {
    variant: 'H6',
  },
}

export default HeadingStyles
