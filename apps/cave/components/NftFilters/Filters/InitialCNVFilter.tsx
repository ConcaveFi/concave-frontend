import { Button, Popover, PopoverContent, PopoverTrigger, Portal, useDisclosure } from '@concave/ui'
import { useState } from 'react'
import { DropdownCard } from '../DropdownCard'
import { RangeFilter } from './hooks/useFilterByRange'
import { RangeFilterCard } from './RangeFilterCard'
type InitialFilter = {
  onApplyFilter: (rangeFilter: RangeFilter) => void
  onResetFilter: () => void
  currentFilter: RangeFilter
}
export const InitialCNVFilter = ({
  onApplyFilter,
  onResetFilter,
  currentFilter,
}: InitialFilter) => {
  const { isOpen, onToggle, onClose } = useDisclosure()
  const [hasFilter, setHasFilter] = useState(false)

  return (
    <Popover onClose={onClose}>
      <PopoverTrigger>
        <Button onClick={onToggle} _active={{}}>
          <DropdownCard
            placeholder={hasFilter && currentFilter?.min + ' - ' + currentFilter?.max}
            highlighted={hasFilter}
            title="Initial CNV"
            isOpen={isOpen}
          />
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent
          width={260}
          variants={{
            enter: { opacity: 1, height: '124px' },
            exit: { opacity: 0, height: '0px' },
          }}
        >
          <RangeFilterCard
            onApplyFilter={(filter) => {
              onApplyFilter(filter)
              setHasFilter(true)
            }}
            onResetFilter={() => {
              onResetFilter()
              setHasFilter(false)
            }}
          />
        </PopoverContent>
      </Portal>
    </Popover>
  )
}
