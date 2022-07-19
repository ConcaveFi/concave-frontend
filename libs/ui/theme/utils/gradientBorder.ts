import type { BoxProps } from '@chakra-ui/layout'
import { SystemStyleInterpolation } from '@chakra-ui/theme-tools'
import { toPx } from './toPx'

const variants = {
  primary: { bg: 'stroke.primary' },
  secondary: { bg: 'stroke.secondary' },
}

type GradientBorderVariants = keyof typeof variants

// type LiteralUnion<T extends string> = T | Omit<T, T>
export interface GradientBorderStyleProps extends BoxProps {
  borderWidth?: number
  variant?: GradientBorderVariants | Omit<string, GradientBorderVariants>
}

export const gradientBorder = ({
  borderWidth = 1,
  variant = 'primary',
}: GradientBorderStyleProps = {}): SystemStyleInterpolation => {
  return {
    position: 'relative',
    '& > *': { zIndex: 1 },
    ...(borderWidth && {
      '&::before': {
        content: '""',
        position: 'absolute',
        inset: 0,
        p: toPx(borderWidth),
        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'source-out',
        maskComposite: 'exclude',
        pointerEvents: 'none',
        rounded: 'inherit',
        ...(variants[<string>variant] || { bg: variant }),
      },
    }),
  }
}
