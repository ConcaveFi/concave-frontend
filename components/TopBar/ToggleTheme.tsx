import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { IconButton, useColorMode } from '@chakra-ui/react'
import React from 'react'

export const ToggleTheme = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <IconButton
      icon={(colorMode === 'dark' && <MoonIcon />) || (colorMode === 'light' && <SunIcon />)}
      aria-label={`${colorMode} theme`}
      onClick={toggleColorMode}
    />
  )
}
