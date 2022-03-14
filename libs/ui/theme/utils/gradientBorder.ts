import { border, calc, theme, tokenToCSSVar } from '@chakra-ui/react'
import { SystemStyleInterpolation } from '@chakra-ui/theme-tools'
import { toPx } from './toPx'

export const gradientBorder = ({
  borderWidth = 1,
  borderRadius = '2xl',
}: {
  borderWidth?: number
  borderRadius?: string
} = {}): SystemStyleInterpolation => {
  console.log(borderRadius)
  return {
    position: 'relative',
    '& > *': {
      zIndex: 1,
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: calc.add(theme.radii[borderRadius], toPx(borderWidth)),
      m: `-${toPx(borderWidth)}`,
      p: toPx(borderWidth),
      bg: 'strokeReflection',
      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
      WebkitMaskComposite: 'source-out',
      maskComposite: 'exclude',
    },
  }
}
