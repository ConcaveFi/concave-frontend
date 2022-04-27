import { Box, Flex, propNames, Text } from '@concave/ui'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { SortType } from './MarketplaceSearchCard'
import ToggleButton from './ToggleButton'

interface DiscountCard {
  activeButton: number
  onChange: (clickedButton: number, sortType: SortType) => void
}

function DiscountCard(props: DiscountCard) {
  const buttons = [{ title: 'None' }, { title: 'Lowest First' }, { title: 'Highest First' }]
  const curButton = props.activeButton
  const [toggleButons, setToggleButtons] = useState(null)

  useEffect(() => {
    setToggleButtons(
      buttons.map((button, index) => {
        return (
          <ToggleButton
            key={index}
            onClick={() => props.onChange(index, getSortTypeByIndex(index))}
            title={button.title}
            active={index === curButton}
          />
        )
      }),
    )
  }, [curButton])

  return (
    <Flex
      width={160}
      height={160}
      background="linear-gradient(265.73deg, #274C63 0%, #182F3E 100%)"
      rounded={'2xl'}
      justifyContent="center"
      alignItems={'center'}
      direction="column"
      gap={1}
      shadow={'up'}
    >
      <Text fontSize={14} fontWeight={700} textColor={'#5F7A99'}>
        Sort:
      </Text>
      {toggleButons}
    </Flex>
  )
}

function getSortTypeByIndex(index: number) {
  switch (index) {
    case 0:
      return SortType.NONE
    case 1:
      return SortType.DISCOUNT_LOWEST_FIRST
    case 2:
      return SortType.DISCOUNT_HIGHEST_FIRST
  }
}

export default DiscountCard
