import { Flex, StatDownArrow, Text } from '@concave/ui'

type DropdownCard = {
  isOpen: boolean
  title: string
}

export const DropdownCard = ({ isOpen, title }: DropdownCard) => {
  return (
    <Flex
      justify={'center'}
      align="center"
      rounded={'lg'}
      gap="2"
      width="110px"
      height={'30px'}
      border="2px solid"
      borderColor={isOpen ? 'text.accent' : 'text.low'}
      _hover={{ borderColor: 'text.accent' }}
      userSelect="none"
    >
      <Text fontSize={'12px'} fontWeight="bold">
        {title}
      </Text>
      <StatDownArrow
        color={'text.low'}
        mt={'1'}
        transform={isOpen && 'rotate(180deg)'}
        transition="0.3s all"
      />
    </Flex>
  )
}
