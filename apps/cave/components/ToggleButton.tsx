import { Box, Flex, useDisclosure } from '@concave/ui'
import { useEffect } from 'react'

type ToggleButtonProps = {
  onToggle: (enabled: boolean) => void
  enabled?: boolean
}

export const ToggleButton = ({ onToggle, enabled }: ToggleButtonProps) => {
  const { isOpen: isEnabled, onToggle: onToggleEnabled } = useDisclosure({
    defaultIsOpen: enabled || false,
  })
  const onToggleButton = () => {
    onToggleEnabled()
    onToggle(!isEnabled)
  }

  return (
    <Flex
      width={'36px'}
      height="20px"
      shadow={!isEnabled && 'down'}
      rounded="2xl"
      p={'2px'}
      bg={isEnabled && 'green.400'}
      cursor="pointer"
      onClick={() => {
        onToggleButton()
      }}
      transition={'0.3s all'}
    >
      <Box
        boxShadow={''}
        transition={'0.3s all'}
        ml={isEnabled && '15px'}
        rounded={'full'}
        width="16px"
        height="full"
        bg="gray.100"
        shadow={'0px 0px 10px 0px #222'}
      />
    </Flex>
  )
}
