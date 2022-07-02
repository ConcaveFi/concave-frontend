import {
  Button,
  Collapse,
  Flex,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Portal,
  useDisclosure,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { DropdownCard } from '../DropdownCard'
import { StakePoolFilterEnum } from './hooks/useFilterByStakePool'
import { StakeToggleButton } from './StakeToggleButton'

type StakePoolFilterCard = {
  onEnableFilter: (filter: StakePoolFilterEnum) => void
  onDisableFilter: (filter: StakePoolFilterEnum) => void
  onResetFilter: (filter: StakePoolFilterEnum[]) => void
  stakePoolFilters: StakePoolFilterEnum[]
}

export const StakePoolFilterCard = ({
  onDisableFilter,
  onEnableFilter,
  onResetFilter,
  stakePoolFilters,
}: StakePoolFilterCard) => {
  const { isOpen, onClose, onToggle } = useDisclosure()

  const canShowReset = stakePoolFilters.length <= 3

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
            enter: { opacity: 1, height: '175px' },
            exit: { opacity: 0, height: '0px' },
          }}
          width={'160px'}
        >
          <Flex
            width={'160px'}
            rounded={'lg'}
            height={'175px'}
            border="2px solid"
            borderColor={'text.low'}
            direction="column"
            apply={'background.glass'}
            overflow="hidden"
            transition={'0.3s all'}
            pt={4}
            gap={1}
          >
            {Object.values(StakePoolFilterEnum)
              .filter((filter) => typeof filter !== 'string')
              .map((filter, index) => (
                <StakeToggleButton
                  filter={+filter}
                  enabled={stakePoolFilters.includes(+filter)}
                  key={index}
                  onDisableFilter={onDisableFilter}
                  onEnableFilter={onEnableFilter}
                />
              ))}
            <Button
              onClick={() =>
                onResetFilter([
                  StakePoolFilterEnum.FILTER_BY_45_DAYS,
                  StakePoolFilterEnum.FILTER_BY_90_DAYS,
                  StakePoolFilterEnum.FILTER_BY_180_DAYS,
                  StakePoolFilterEnum.FILTER_BY_360_DAYS,
                ])
              }
              mt={1}
              width="90px"
              height={'30px'}
              variant={canShowReset ? 'primary' : ''}
              shadow={!canShowReset && 'down'}
              cursor={!canShowReset && 'default'}
              _focus={{}}
              _active={{}}
              mx={'auto'}
            >
              Reset
            </Button>
          </Flex>
        </PopoverContent>
      </Portal>
    </Popover>
  )
}
