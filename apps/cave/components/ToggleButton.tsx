import { Box, Flex, useDisclosure } from '@concave/ui'

type ToggleButton = {
  onActivate: VoidFunction
  onDisable: VoidFunction
  defaultEnabled?: boolean
}

export const ToggleButton = ({ onActivate, onDisable, defaultEnabled }: ToggleButton) => {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: defaultEnabled })
  return (
    <Flex
      width={'36px'}
      height="20px"
      shadow={!isOpen && 'down'}
      rounded="2xl"
      p={'2px'}
      bg={isOpen && 'green.400'}
      cursor="pointer"
      onClick={() => {
        if (isOpen) onDisable()
        else onActivate()
        onToggle()
      }}
      transition={'0.3s all'}
    >
      <Box
        boxShadow={''}
        transition={'0.3s all'}
        ml={isOpen && '15px'}
        rounded={'full'}
        width="16px"
        height="full"
        bg="gray.100"
        shadow={'0px 0px 10px 0px #222'}
      ></Box>
    </Flex>
  )
}
