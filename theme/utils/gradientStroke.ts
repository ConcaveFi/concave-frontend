import { StyleFunctionProps, SystemStyleInterpolation } from '@chakra-ui/theme-tools'
import { toPx } from './toPx'

export const gradientStroke = ({
  borderWidth = '1px',
}: Partial<StyleFunctionProps>): SystemStyleInterpolation => ({
  position: 'relative',

  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 'inherit',
    m: `-${toPx(borderWidth)}`,
    p: toPx(borderWidth),
    bg: 'strokeReflection',
    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    WebkitMaskComposite: 'destination-out',
    maskComposite: 'exclude',
  },
})
