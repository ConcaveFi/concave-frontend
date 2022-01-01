import { StyleFunctionProps, SystemStyleInterpolation } from '@chakra-ui/theme-tools'
import { toPx } from './toPx'

export const gradientStroke = ({
  borderWidth = '1px',
}: StyleFunctionProps): SystemStyleInterpolation => ({
  position: 'relative',

  // couldn't find a way to make a transparent bg with rounded gradient borders

  backgroundClip: 'padding-box',
  border: `solid ${toPx(borderWidth)} transparent`,

  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: -1,
    margin: `-${toPx(borderWidth)}`,
    borderRadius: 'inherit',
    bg: 'strokeReflection',
  },
})
