import { Button, Popover, PopoverContent, PopoverTrigger, Portal, useDisclosure } from '@concave/ui'
import { DropdownCard } from '../DropdownCard'
import { RangeFilterCard } from './RangeFilterCard'

export const InitialFilter = () => {
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
          <RangeFilterCard />
        </PopoverContent>
      </Portal>
    </Popover>
  )
}
