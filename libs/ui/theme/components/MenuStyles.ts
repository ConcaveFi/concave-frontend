import { menuAnatomy as parts } from '@chakra-ui/anatomy'
import type {
  PartsStyleFunction,
  SystemStyleFunction,
  SystemStyleObject,
} from '@chakra-ui/theme-tools'
import { mode } from '@chakra-ui/theme-tools'
import { backgrounds } from '../backgrounds'
import { gradientBorder } from '../utils/gradientBorder'

const baseStyleList: SystemStyleFunction = (props) => {
  const border = gradientBorder({ borderWidth: 2 })
  return {
    ...backgrounds.metal,
    boxShadow: mode('sm', 'dark-lg')(props),
    color: 'inherit',
    minW: '3xs',
    py: '2',
    borderWidth: `0px`,
    zIndex: 1,
    borderRadius: `2xl`,
    ...border,
  }
}

const baseStyleItem: SystemStyleFunction = (props) => {
  return {
    py: '0.4rem',
    px: '0.8rem',
    transitionProperty: 'background',
    transitionDuration: 'ultra-fast',
    transitionTimingFunction: 'ease-in',
    _focus: {
      bg: `rgba(255, 255, 255, 0.1)`,
    },
    _active: {
      bg: `rgba(255, 255, 255, 0.3)`,
    },
    _expanded: {
      bg: mode('blue', 'blue')(props),
    },
    _disabled: {
      opacity: 0.4,
      cursor: 'not-allowed',
    },
  }
}

const baseStyleGroupTitle: SystemStyleObject = {
  mx: 4,
  my: 2,
  fontWeight: 'semibold',
  fontSize: 'sm',
}

const baseStyleCommand: SystemStyleObject = {
  opacity: 0.6,
}

const baseStyleDivider: SystemStyleObject = {
  border: 0,
  borderBottom: '1px solid',
  borderColor: 'inherit',
  my: '0.5rem',
  opacity: 0.6,
}

const baseStyleButton: SystemStyleObject = {
  transitionProperty: 'common',
  transitionDuration: 'normal',
}

const baseStyle: PartsStyleFunction<typeof parts> = (props) => ({
  button: baseStyleButton,
  list: baseStyleList(props),
  item: baseStyleItem(props),
  groupTitle: baseStyleGroupTitle,
  command: baseStyleCommand,
  divider: baseStyleDivider,
})

const menuStyles = {
  parts: parts.keys,
  baseStyle,
}

export default menuStyles
