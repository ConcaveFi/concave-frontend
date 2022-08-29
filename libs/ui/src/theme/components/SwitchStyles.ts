import { switchAnatomy as parts } from '@chakra-ui/anatomy'
import type {
  PartsStyleFunction,
  PartsStyleObject,
  SystemStyleFunction,
  SystemStyleObject,
} from '@chakra-ui/theme-tools'
import { calc, cssVar } from '@chakra-ui/theme-tools'

const $width = cssVar('switch-track-width')
const $height = cssVar('switch-track-height')
const $diff = cssVar('switch-track-diff')
const diffValue = calc.subtract($width, $height)
const $translateX = cssVar('switch-thumb-x')

const baseStyleTrack: SystemStyleFunction = (props) => {
  return {
    borderWidth: '2px',
    borderColor: 'white',
    borderRadius: 'full',
    p: '2px',
    width: [$width.reference],
    height: [$height.reference],
    transitionProperty: 'common',
    transitionDuration: 'fast',
    bg: 'transparent',
    _focus: {
      boxShadow: 'outline',
    },
    _disabled: {
      opacity: 0.4,
      cursor: 'not-allowed',
    },
    _checked: {
      bg: 'white',
      borderColor: 'black',
    },
  }
}

const baseStyleThumb: SystemStyleObject = {
  bg: 'transparent',
  border: '2px solid white',
  transitionProperty: 'transform',
  transitionDuration: 'normal',
  borderRadius: 'inherit',
  width: [$height.reference],
  height: [$height.reference],
  _checked: {
    border: '1px solid white',
    bg: 'black',
    transform: `translateX(${$translateX.reference})`,
  },
}

const baseStyle: PartsStyleFunction<typeof parts> = (props) => ({
  container: {
    [$diff.variable]: diffValue,
    [$translateX.variable]: $diff.reference,
    _rtl: {
      [$translateX.variable]: calc($diff).negate().toString(),
    },
  },
  track: baseStyleTrack(props),
  thumb: baseStyleThumb,
})

const sizes: Record<string, PartsStyleObject<typeof parts>> = {
  sm: {
    container: {
      [$width.variable]: '1.1rem',
      [$height.variable]: '0.75rem',
    },
  },
  md: {
    container: {
      [$width.variable]: '1.5rem',
      [$height.variable]: '1rem',
    },
  },
  lg: {
    container: {
      [$width.variable]: '2.3rem',
      [$height.variable]: '1.5rem',
    },
  },
}

const defaultProps = {
  size: 'md',
}

const SwitchStyles = {
  parts: parts.keys,
  baseStyle,
  sizes,
  defaultProps,
}
export default SwitchStyles
