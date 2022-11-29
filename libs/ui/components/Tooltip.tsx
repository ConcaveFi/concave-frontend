import { QuestionIcon } from '@chakra-ui/icons'
import { Flex, Popover, PopoverContent, PopoverTrigger, Text } from '@chakra-ui/react'
import { Card } from './Card'

export function Tooltip({
  label,
  icon = <QuestionIcon />,
  w = '220px',
}: {
  label: string
  icon?: JSX.Element
  w?: string | number
}) {
  return (
    <Popover trigger="hover">
      <PopoverTrigger>
        <Flex rounded="full">{icon}</Flex>
      </PopoverTrigger>
      <PopoverContent w={w}>
        <Card
          shadow={'up'}
          css={{ ':after': { opacity: 1 } }}
          py={3}
          px={5}
          position={'absolute'}
          justify={'center'}
          variant="secondary"
        >
          <Text fontSize="sm">{label}</Text>
        </Card>
      </PopoverContent>
    </Popover>
  )
}
