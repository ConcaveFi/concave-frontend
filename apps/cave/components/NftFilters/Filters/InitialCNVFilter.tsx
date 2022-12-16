import { Button, Popover, PopoverContent, PopoverTrigger, Portal, useDisclosure } from '@concave/ui'
import { useStakeSettings } from 'contexts/PositionsFilterProvider'
import { useState } from 'react'
import { DropdownCard } from '../DropdownCard'
import { RangeFilterCard } from './RangeFilterCard'

export const InitialCNVFilter = () => {
  const { isOpen, onToggle, onClose } = useDisclosure()
  const [hasFilter, setHasFilter] = useState(false)
  const { initialCNVFilter, setInitialCNVFilter } = useStakeSettings()
  const { min = '0', max = 'max' } = initialCNVFilter
  return (
    <Popover onClose={onClose}>
      <PopoverTrigger>
        <Button onClick={onToggle} _active={{}}>
          <DropdownCard
            highlighted={hasFilter}
            title={hasFilter ? `${min} - ${max}` : 'Initial CNV'}
            isOpen={isOpen}
          />
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent width={260} variants={popoverAnimation}>
          <RangeFilterCard
            onApplyFilter={(filter) => (setInitialCNVFilter(filter), setHasFilter(true))}
            onResetFilter={() => (setInitialCNVFilter({}), setHasFilter(false))}
          />
        </PopoverContent>
      </Portal>
    </Popover>
  )
}

const popoverAnimation = {
  enter: { opacity: 1, height: '124px' },
  exit: { opacity: 0, height: '0px' },
}
