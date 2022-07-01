import { Box, Flex } from '@concave/ui'

type ToggleButtonProps = {
  onToggle: (enabled: boolean) => void
  enabled?: boolean
}

export const ToggleButton = ({ onToggle, enabled }: ToggleButtonProps) => {
  return (
    <Flex
      width={'36px'}
      height="20px"
      shadow={!enabled && 'down'}
      rounded="2xl"
      p={'2px'}
      bg={enabled && 'green.400'}
      cursor="pointer"
      onClick={() => onToggle(!enabled)}
      transition={'0.3s all'}
    >
      <Box
        boxShadow={''}
        transition={'0.3s all'}
        ml={enabled && '15px'}
        rounded={'full'}
        width="16px"
        height="full"
        bg="gray.100"
        shadow={'0px 0px 10px 0px #222'}
      />
    </Flex>
  )
}
