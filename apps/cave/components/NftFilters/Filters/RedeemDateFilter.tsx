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
        <PopoverContent
          variants={{
            enter: { opacity: 1, height: '240px' },
            exit: { opacity: 0, height: '0px' },
          }}
          animation={{}}
          width={160}
          border={'none'}
        >
          <Flex
            width={'160px'}
            transition=".3s all"
            height={isOpen ? '240px' : '0px'}
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
