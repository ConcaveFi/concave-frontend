import colors from './colors'

const scrollbar = {
  secondary: {
    '&::-webkit-scrollbar': {
      width: '8px',
      boxShadow: 'Down Big',
      borderRadius: '8px',
      background: colors.bg.primary,
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '8px',
      background: colors.bg.primary,
    },
  },
  big: {
    '&::-webkit-scrollbar': {
      display: { base: 'none', md: 'flex' },
      width: '15px',
      boxShadow: 'Down Big',
      borderRadius: '10px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: colors.bg.primary,
      boxShadow:
        '0px 5px 14px rgba(0, 0, 0, 0.47), 4px -7px 15px rgba(174, 177, 255, 0.13), inset -1px 1px 2px rgba(128, 186, 255, 0.24)',
      rounded: 'lg',
    },
  },
}

export default scrollbar
