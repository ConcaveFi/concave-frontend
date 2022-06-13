import {
  Box,
  Button,
  Flex,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Text,
} from '@concave/ui'
import { useState } from 'react'
import { NftSorter, NftSortOrder } from './hooks/useNftSort'
import { SearchFilterCard } from './SearchFilterCard'
import { ToggleButton } from './ToggleButton'

interface SorterCardProps {
  onChangeSorter: (sortType: NftSorter, order: NftSortOrder) => void
  onRemoveSorter: (sortType: NftSorter) => void
  sorterType: NftSorter
  title: string
  icon?: string
  noneButtonName?: string
  lowestButtonName?: string
  highestButtonName?: string
}

export function SorterCard(props: SorterCardProps) {
  const {
    sorterType,
    onChangeSorter,
    onRemoveSorter,
    lowestButtonName,
    highestButtonName,
    noneButtonName,
  } = props

  const buttons: { title: string; order: NftSortOrder }[] = [
    { title: noneButtonName || 'None', order: 'none' },
    { title: lowestButtonName || 'Lowest First', order: 'lowest' },
    { title: highestButtonName || 'Highest First', order: 'highest' },
  ]
  const [currentButton, setCurrentButton] = useState('None')

  const currentActive = currentButton !== 'None'
  const toggleButons = buttons.map((button, index) => {
    return (
      <ToggleButton
        key={index}
        onClick={() => {
          setCurrentButton(button.title)
          if (button.title === 'None') onRemoveSorter(sorterType)
          else onChangeSorter(sorterType, button.order)
        }}
        title={button.title}
        active={button.title === currentButton}
      />
    )
  })

  return (
    <Popover>
      <PopoverTrigger>
        <Button>
          <SearchFilterCard hasFilter={currentActive} title={props.title} icon={props.icon} />
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent width={160} border={'none'}>
          <Flex
            width={160}
            height={160}
            bg={{
              base: 'linear-gradient(239.18deg, #19394C 27.18%, #0A161F 96.11%)',
              md: 'linear-gradient(265.73deg, #274C63 0%, #182F3E 100%)',
            }}
            rounded={'2xl'}
            justifyContent="center"
            alignItems={'center'}
            direction="column"
            gap={1}
            shadow="up"
          >
            <Box
              display={{ base: 'none', md: 'block' }}
              position={'absolute'}
              height="full"
              width={'full'}
              bgImage={'/assets/textures/metal.png'}
              bgSize="16% 16%"
              rounded={'2xl'}
            />
            <Text fontSize={14} fontWeight={700} textColor={'#5F7A99'}>
              Sort:
            </Text>
            {toggleButons}
          </Flex>
        </PopoverContent>
      </Portal>
    </Popover>
  )
}
