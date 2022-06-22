import { Button, Popover, PopoverContent, PopoverTrigger, Portal, useDisclosure } from '@concave/ui'
import { DropdownCard } from '../DropdownCard'
import { RangeFilter } from './hooks/useFilterByRange'
import { RangeFilterCard } from './RangeFilterCard'
type InitialFilter = {
  onApplyFilter: (rangeFilter: RangeFilter) => void
  onResetFilter: () => void
}
export const InitialCNVFilter = ({ onApplyFilter, onResetFilter }: InitialFilter) => {
  const { isOpen, onToggle, onClose } = useDisclosure()
  return (
    <Popover onClose={onClose}>
      <PopoverTrigger>
        <Button onClick={onToggle} _active={{}}>
          <DropdownCard title="Initial CNV" isOpen={isOpen} />
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
          <RangeFilterCard onApplyFilter={onApplyFilter} onResetFilter={onResetFilter} />
        </PopoverContent>
      </Portal>
    </Popover>
  )
}
