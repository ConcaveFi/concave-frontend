import { Flex, FlexProps, StatDownArrow, Text } from '@concave/ui'

type DropdownCard = {
  isOpen: boolean
  title: string
}

export const DropdownCard: React.FC<DropdownCard & FlexProps> = ({ isOpen, title, ...props }) => {
  return (
    <Flex
      justify={'center'}
      align="center"
      rounded={'lg'}
      gap="2"
      minW="110px"
      height={'30px'}
      border="2px solid"
      borderColor={isOpen ? 'text.accent' : 'text.low'}
      _hover={{ borderColor: 'text.accent' }}
      userSelect="none"
      {...props}
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
