import { Button, Popover, PopoverContent, PopoverTrigger, Portal, useDisclosure } from '@concave/ui'
import { DropdownCard } from '../DropdownCard'
import { RangeFilter } from './hooks/useFilterByRange'
import { RangeFilterCard } from './RangeFilterCard'
type InitialFilter = {
  onApplyFilter: (rangeFilter: RangeFilter) => void
  onResetFilter: () => void
}
export const InitialFilter = ({ onApplyFilter, onResetFilter }: InitialFilter) => {
  const { isOpen, onToggle, onClose } = useDisclosure()
  return (
    <Popover onClose={onClose}>
      <PopoverTrigger>
        <Button onClick={onToggle}>
          <DropdownCard title="Initial CNV" isOpen={isOpen} />
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent width={260}>
          <RangeFilterCard onApplyFilter={onApplyFilter} onResetFilter={onResetFilter} />
        </PopoverContent>
      </Portal>
    </Popover>
  )
}
