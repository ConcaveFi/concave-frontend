import { ComponentStyleConfig } from '@chakra-ui/react'

const TextStyles: ComponentStyleConfig = {
  baseStyle: {
    fontFamily: 'body',
  },
  variants: {
    Captions: {
      fontWeight: 'regular',
      fontSize: '16px',
    },
    CaptionsBold: {
      fontWeight: 'bold',
      fontSize: '16px',
    },
    Paragraph: {
      fontWeight: 'regular',
      fontSize: '18px',
    },
    ParagraphBold: {
      fontWeight: 'bold',
      fontSize: '18px',
    },
  },
  defaultProps: {
    variant: 'Captions',
  },
}

export default TextStyles
