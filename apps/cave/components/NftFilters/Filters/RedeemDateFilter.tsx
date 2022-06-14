import {
  Button,
  Flex,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Portal,
  useDisclosure,
} from '@chakra-ui/react'
import { DropdownCard } from '../DropdownCard'

export const RedeemDateFilter = () => {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure()
  return (
    <Popover onClose={onClose}>
      <PopoverTrigger>
        <Button onClick={onToggle}>
          <DropdownCard title="Redeem Date" isOpen={isOpen} />
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent animation={{}} width={160} border={'none'}>
          <Flex
            width={'160px'}
            height="240px"
            rounded={'lg'}
            border="2px solid"
            borderColor={'text.accent'}
            backdropFilter={'blur(3px)'}
          ></Flex>
        </PopoverContent>
      </Portal>
    </Popover>
  )
}
