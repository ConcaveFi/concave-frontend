import { QuestionIcon } from '@chakra-ui/icons'
import {
  Flex,
  PlacementWithLogical,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Text,
} from '@chakra-ui/react'
import { Card, CardProps } from './Card'

export function Tooltip({
  label,
  icon = <QuestionIcon />,
  w = '220px',
  placement = 'bottom',
  cardProps,
}: {
  label: string
  icon?: JSX.Element
  w?: string | number
  placement?: PlacementWithLogical
  cardProps?: CardProps
}) {
  return (
    <Popover trigger="hover" placement={placement}>
      <PopoverTrigger>
        <Flex rounded="full">{icon}</Flex>
      </PopoverTrigger>
      <Portal>
        <PopoverContent w={w} zIndex={9999} overflow="visible">
          <Card
            shadow={'up'}
            css={{ ':after': { opacity: 1 } }}
            py={3}
            px={5}
            position={'absolute'}
            justify={'center'}
            variant="secondary"
            {...cardProps}
          >
            <Text px="5" fontSize="sm">
              {label}
            </Text>
          </Card>
        </PopoverContent>
      </Portal>
    </Popover>
  )
}
