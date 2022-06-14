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
import { StakePoolFilter } from './hooks/useFilterByStakePool'
import { StakeToggleButton } from './StakeToggleButton'

type StakePoolFilterCard = {
  onEnableFilter: (filter: StakePoolFilter) => void
  onDisableFilter: (filter: StakePoolFilter) => void
}

export const StakePoolFilterCard = ({ onDisableFilter, onEnableFilter }: StakePoolFilterCard) => {
  const { isOpen, onClose, onToggle } = useDisclosure()
  return (
    <Popover onClose={onClose}>
      <PopoverTrigger>
        <Button onClick={onToggle}>
          <DropdownCard isOpen={isOpen} title="Stake Pool" />
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent
          variants={{
            enter: { opacity: 1, height: '120px' },
            exit: { opacity: 0, height: '0px' },
          }}
          width={'160px'}
        >
          <Flex
            width={'160px'}
            rounded={'lg'}
            height={isOpen ? '124px' : '0px'}
            border="2px solid"
            borderColor={'text.accent'}
            bg="#0003"
            backdropFilter={'blur(10px)'}
            direction="column"
            py={3}
            overflow="hidden"
            transition={'0.3s all'}
          >
            {Object.values(StakePoolFilter)
              .filter((filter) => typeof filter !== 'string')
              .map((filter, index) => (
                <StakeToggleButton
                  filter={+filter}
                  key={index}
                  onDisableFilter={onDisableFilter}
                  onEnableFilter={onEnableFilter}
                />
              ))}
          </Flex>
        </PopoverContent>
      </Portal>
    </Popover>
  )
}
