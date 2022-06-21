import { ExpandArrowIcon } from '@concave/icons'
import { Card, Flex, FlexProps, gradientBorder, StatDownArrow, Text } from '@concave/ui'

type DropdownCard = {
  isOpen: boolean
  title: string
}

export const DropdownCard: React.FC<DropdownCard & FlexProps> = ({ isOpen, title, ...props }) => {
  return (
    <Flex
      direction={'row'}
      justify={'center'}
      align="center"
      rounded={'lg'}
      gap="2"
      px={2}
      minW="110px"
      height={'30px'}
      _hover={{ borderColor: 'text.accent' }}
      userSelect="none"
      bg={'linear-gradient(180deg, rgba(40, 219, 209, 0.1) 0%, rgba(0, 83, 78, 0) 55.79%)'}
      // apply={isOpen && 'background.metal'}
      // sx={{ ...gradientBorder({ borderWidth: 2 }) }}
      shadow={isOpen ? 'up' : 'Up Small'}
      // {...props}
    >
      <Text fontSize={'12px'} fontWeight="bold">
        {title}
      </Text>
      <ExpandArrowIcon
        color={'text.low'}
        width="16px"
        height={'30px'}
        transform={isOpen && 'rotate(180deg)'}
        transition="0.3s all"
      />
    </Flex>
  )
}
