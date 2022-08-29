const scrollbar = {
  secondary: {
    '&::-webkit-scrollbar': {
      width: '8px',
      boxShadow: 'Down Big',
      borderRadius: '8px',
      backgroundColor: `rgba(0, 0, 0, 0.05)`,
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '8px',
      backgroundColor: `text.low`,
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
      background: '#19394C',
      boxShadow:
        '0px 5px 14px rgba(0, 0, 0, 0.47), 4px -7px 15px rgba(174, 177, 255, 0.13), inset -1px 1px 2px rgba(128, 186, 255, 0.24)',
      rounded: 'lg',
    },
  },
}

export default scrollbar
