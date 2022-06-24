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
import { StakePoolFilterEnum } from './hooks/useFilterByStakePool'
import { StakeToggleButton } from './StakeToggleButton'

type StakePoolFilterCard = {
  onEnableFilter: (filter: StakePoolFilterEnum) => void
  onDisableFilter: (filter: StakePoolFilterEnum) => void
  stakePoolFilters: StakePoolFilterEnum[]
}

export const StakePoolFilterCard = ({
  onDisableFilter,
  onEnableFilter,
  stakePoolFilters,
}: StakePoolFilterCard) => {
  const { isOpen, onClose, onToggle } = useDisclosure()
  return (
    <Popover onClose={onClose}>
      <PopoverTrigger>
        <Button onClick={onToggle} _active={{}}>
          <DropdownCard
            highlighted={stakePoolFilters?.length < 4}
            isOpen={isOpen}
            title="Stake pool"
          />
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent
          variants={{
            enter: { opacity: 1, height: '144px' },
            exit: { opacity: 0, height: '0px' },
          }}
          width={'160px'}
        >
          <Flex
            width={'160px'}
            rounded={'lg'}
            height={'144px'}
            border="2px solid"
            borderColor={'text.low'}
            direction="column"
            apply={'background.glass'}
            overflow="hidden"
            transition={'0.3s all'}
            justify="center"
            gap={1}
          >
            {Object.values(StakePoolFilterEnum)
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
