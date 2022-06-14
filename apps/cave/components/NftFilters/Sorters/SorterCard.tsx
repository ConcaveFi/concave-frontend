import {
  Button,
  Flex,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Portal,
  useDisclosure,
} from '@concave/ui'
import { DropdownCard } from '../DropdownCard'

export const SorterCard = () => {
  const { isOpen, onToggle, onClose } = useDisclosure()
  return (
    <Popover onClose={onClose}>
      <PopoverTrigger>
        <Button onClick={onToggle}>
          <DropdownCard minW={'120px'} title="None" isOpen={isOpen} />
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent width={160}>
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
