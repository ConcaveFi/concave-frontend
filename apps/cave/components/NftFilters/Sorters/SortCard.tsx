import {
  Button,
  Flex,
  gradientBorder,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Portal,
  useDisclosure,
} from '@concave/ui'
import { useState } from 'react'
import { DropdownCard } from '../DropdownCard'
import { NftSort, NftSortMethod } from './hooks/useNftSort'
import { SortButton } from './SortButton'

type SorterCard = {
  onChangeSorter: (sorter: NftSort) => void
}
export const SortCard = ({ onChangeSorter }: SorterCard) => {
  const { isOpen, onToggle, onClose } = useDisclosure()
  const [title, setTitle] = useState<string>('Redeem Date (ASC)')
  return (
    <Popover onClose={onClose}>
      <PopoverTrigger>
        <Button onClick={onToggle} _active={{}}>
          <DropdownCard minW={'160px'} title={title || 'None'} isOpen={isOpen} />
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent
          variants={{
            enter: { opacity: 1, height: '195px' },
            exit: { opacity: 0, height: '0px' },
          }}
          width={190}
        >
          <Flex
            width={'190px'}
            height="195px"
            rounded={'lg'}
            boxShadow="up"
            backdropFilter={'blur(3px)'}
            direction="column"
            apply={'background.glass'}
            border="2px solid"
            borderColor={'text.low'}
            overflow={'hidden'}
            py={3}
          >
            {sorterButtons.map((sorter, index) => (
              <SortButton
                enabled={title === sorter.title}
                onClick={(clickedSorter) => {
                  if (clickedSorter.sort === NftSortMethod.NONE) setTitle('None')
                  else setTitle(sorter.title)
                  onChangeSorter(clickedSorter)
                }}
                sorter={sorter.nftSort}
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
const sorterButtons: { title: string; nftSort: NftSort }[] = [
  { title: 'Stake Pool (ASC)', nftSort: { order: 'DESC', sort: NftSortMethod.STAKE_POOL } },
  { title: 'Stake Pool (DESC)', nftSort: { order: 'ASC', sort: NftSortMethod.STAKE_POOL } },
  { title: 'Redeem Date (ASC)', nftSort: { order: 'ASC', sort: NftSortMethod.REDEEM_DATE } },
  { title: 'Redeem Date (DESC)', nftSort: { order: 'DESC', sort: NftSortMethod.REDEEM_DATE } },
  { title: 'Initial CNV (ASC)', nftSort: { order: 'ASC', sort: NftSortMethod.INITIAL } },
  { title: 'Initial CNV (DESC)', nftSort: { order: 'DESC', sort: NftSortMethod.INITIAL } },
]
