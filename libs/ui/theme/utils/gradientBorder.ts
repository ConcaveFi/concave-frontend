import { calc, theme, BoxProps } from '@chakra-ui/react'
import { SystemStyleInterpolation } from '@chakra-ui/theme-tools'
import { toPx } from './toPx'

const variants = {
  primary: {
    bg: 'stroke.primary',
  },
  secondary: {
    bg: 'stroke.secondary',
  },
}

export interface GradientBorderStyleProps extends BoxProps {
  borderWidth?: number
  variant?: keyof typeof variants
}

export const gradientBorder = ({
  borderWidth = 1,
  variant = 'primary',
  ...props
}: GradientBorderStyleProps = {}): SystemStyleInterpolation => {
  const borderRadiusStyles = Object.fromEntries(
    Object.entries(props)
      .filter(([k, v]) => k.endsWith('Radius') || k.startsWith('rounded'))
      .map(([k, v]) => {
        const radius = theme.radii[v] ?? toPx(v)
        const gradientBorderRadius = radius !== '0' ? calc.add(radius, toPx(borderWidth)) : 0
        return [k, gradientBorderRadius]
      }),
  )
  return {
    willChange: 'transform', // idk why this fixes it, but, fixes the issue of the border being larger on one side of the component sometimes
    position: 'relative',
    '& > *': { zIndex: 1 },
    ...(borderWidth && {
      '&::before': {
        content: '""',
        position: 'absolute',
        inset: 0,
        m: calc.negate(toPx(borderWidth)),
        p: toPx(borderWidth),
        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'source-out',
        maskComposite: 'exclude',
        pointerEvents: 'none',
        ...borderRadiusStyles,
        ...variants[variant],
      },
    }),
  }
}
