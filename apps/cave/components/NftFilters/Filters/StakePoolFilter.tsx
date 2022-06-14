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

export const StakePoolFilter = () => {
  const { isOpen, onClose, onToggle } = useDisclosure()
  return (
    <Popover onClose={onClose}>
      <PopoverTrigger>
        <Button onClick={onToggle}>
          <DropdownCard isOpen={isOpen} title="Stake Pool" />
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent width={'160px'}>
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
