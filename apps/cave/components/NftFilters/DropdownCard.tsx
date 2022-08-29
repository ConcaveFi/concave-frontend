import { ChevronDownIcon } from '@concave/icons'
import { Flex, FlexProps, gradientBorder, Text } from '@concave/ui'

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
      shadow={'Up Small'}
      apply={'background.metalBrighter'}
      sx={{ ...gradientBorder({ variant: 'secondary', borderWidth: 2 }) }}
    >
      <Text
        transition={'.4s all'}
        position={placeholder ? 'absolute' : 'relative'}
        transform={placeholder && 'translate(0px,-22px)'}
        fontSize={'xs'}
        fontWeight="bold"
      >
        {title}
      </Text>
      {placeholder && <Text>{placeholder}</Text>}
      <ChevronDownIcon
        boxSize={'25px'}
        transform={isOpen && 'rotate(180deg)'}
        transition="0.3s all"
        mx={-2}
      />
    </Flex>
  )
}
