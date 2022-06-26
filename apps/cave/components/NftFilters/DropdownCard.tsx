import { ExpandArrowIcon } from '@concave/icons'
import { Card, Flex, FlexProps, gradientBorder, StatDownArrow, Text } from '@concave/ui'

type DropdownCard = {
  isOpen: boolean
  title: string
  placeholder?: string
  highlighted?: boolean
}

export const DropdownCard: React.FC<DropdownCard & FlexProps> = ({
  isOpen,
  title,
  highlighted,
  placeholder,
  ...props
}) => {
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
      userSelect="none"
      border="2px solid"
      borderColor={highlighted ? 'text.accent' : 'text.low'}
    >
      <Text
        transition={'.4s all'}
        position={placeholder ? 'absolute' : 'relative'}
        transform={placeholder && 'translate(0px,-22px)'}
        fontSize={'12px'}
        fontWeight="bold"
      >
        {title}
      </Text>
      {placeholder && <Text>{placeholder}</Text>}
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
