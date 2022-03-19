import { calc, theme } from '@chakra-ui/react'
import { SystemStyleInterpolation } from '@chakra-ui/theme-tools'
import { toPx } from './toPx'

const variants = {
  accent: 'linear-gradient(41.89deg, #53399B 0.69%, #7DE0FF 38.19%, #504179 72.85%, #84E2FF 100%)',
  medium: 'linear-gradient(57deg, #171E27 -7.38%, #435F81 29.46%, #202D3D 71.39%, #93C5FF 107.62%)',
}

export const gradientBorder = ({
  borderWidth = 1,
  borderRadius = '2xl',
  variant = 'accent',
}: {
  borderWidth?: number
  borderRadius?: string
  variant?: keyof typeof variants
} = {}): SystemStyleInterpolation => {
  return {
    position: 'relative',
    '& > *': { zIndex: 1 },
    ...(borderWidth && {
      '&::before': {
        content: '""',
        position: 'absolute',
        inset: 0,
        borderRadius: calc.add(theme.radii[borderRadius], toPx(borderWidth)),
        m: calc.negate(toPx(borderWidth)),
        p: toPx(borderWidth),
        bg: variants[variant],
        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'source-out',
        maskComposite: 'exclude',
      },
    }),
  }
}
