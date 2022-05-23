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
import { useEffect, useState } from 'react'
import { NftPositionSortType } from '../hooks/useNftPositionSort'
import ToggleButton from '../ToggleButton'
import SearchFilterCard from './SearchFilterCard'

interface RedeemFilterCardProps {
  onChangeSorter: (sortType: NftPositionSortType) => void
  currentSorter: NftPositionSortType
}

export default function RedeemFilterCard(props: RedeemFilterCardProps) {
  const { currentSorter } = props
  const currentActive =
    currentSorter === NftPositionSortType.REDEEM_HIGHEST_FIRST ||
    currentSorter === NftPositionSortType.REDEEM_LOWEST_FIRST
  const buttons = [
    { title: 'None', sorter: NftPositionSortType.NONE },
    { title: 'Lowest First', sorter: NftPositionSortType.REDEEM_LOWEST_FIRST },
    { title: 'Highest First', sorter: NftPositionSortType.REDEEM_HIGHEST_FIRST },
  ]
  const [currentButton, setCurrentButton] = useState('None')
  const toggleButons = buttons.map((button, index) => {
    return (
      <ToggleButton
        key={index}
        onClick={() => {
          setCurrentButton(button.title)
          props.onChangeSorter(button.sorter)
        }}
        title={button.title}
        active={button.title === currentButton}
      />
    )
  })

  useEffect(() => {
    if (!currentActive) setCurrentButton('None')
  }, [currentSorter])

  return (
    <Popover>
      {/* Chakra type bug, related to just released react 18, should be fixed soon 
        // @ts-ignore  */}
      <PopoverTrigger>
        <Button>
          <SearchFilterCard hasFilter={currentActive} title={'Redeem in'} icon={'RedeemIcon'} />
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
