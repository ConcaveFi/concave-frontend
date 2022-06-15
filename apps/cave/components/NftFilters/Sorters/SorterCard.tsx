import {
  Button,
  Flex,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Portal,
  useDisclosure,
} from '@concave/ui'
import { useState } from 'react'
import { DropdownCard } from '../DropdownCard'
import { NftSorter, NftSorterType } from './hooks/useNftSorter'
import { SorterButton } from './SorterButton'

type SorterCard = {
  onChangeSorter: (sorter: NftSorter) => void
}
export const SorterCard = ({ onChangeSorter }: SorterCard) => {
  const { isOpen, onToggle, onClose } = useDisclosure()
  const [title, setTitle] = useState<string>('')
  return (
    <Popover onClose={onClose}>
      <PopoverTrigger>
        <Button onClick={onToggle}>
          <DropdownCard minW={'160px'} title={title || 'None'} isOpen={isOpen} />
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent
          variants={{
            enter: { opacity: 1, height: '183px' },
            exit: { opacity: 0, height: '0px' },
          }}
          width={160}
        >
          <Flex
            width={'160px'}
            height="183px"
            rounded={'lg'}
            border="2px solid"
            borderColor={'text.accent'}
            backdropFilter={'blur(3px)'}
            direction="column"
            apply={'background.metalBrighter'}
            overflow={'hidden'}
          >
            {sorterButtons.map((sorter, index) => (
              <SorterButton
                enabled={title === sorter.title}
                onClick={(clickedSorter) => {
                  setTitle(sorter.title)
                  onChangeSorter(clickedSorter)
                }}
                sorter={sorter.nftSorter}
                title={sorter.title}
                key={index}
              />
            ))}
          </Flex>
        </PopoverContent>
      </Portal>
    </Popover>
  )
}
const sorterButtons: { title: string; nftSorter: NftSorter }[] = [
  { title: 'Stake Pool (ASC)', nftSorter: { order: 'DESC', sorter: NftSorterType.STAKE_POOL } },
  { title: 'Stake Pool (DESC)', nftSorter: { order: 'ASC', sorter: NftSorterType.STAKE_POOL } },
  { title: 'Redeem Date (ASC)', nftSorter: { order: 'ASC', sorter: NftSorterType.REDEEM_DATE } },
  { title: 'Redeem Date (DESC)', nftSorter: { order: 'DESC', sorter: NftSorterType.REDEEM_DATE } },
  { title: 'Initial CNV (ASC)', nftSorter: { order: 'ASC', sorter: NftSorterType.INITIAL } },
  { title: 'Initial CNV (DESC)', nftSorter: { order: 'DESC', sorter: NftSorterType.INITIAL } },
]
