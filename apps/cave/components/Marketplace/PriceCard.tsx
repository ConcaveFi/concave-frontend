import { Box, Flex, Input, Text } from '@concave/ui'
import { timeEnd } from 'console'
import { version } from 'os'
import { useEffect, useState } from 'react'
import ChooseButton from './ChooseButton'
import { SortType } from './MarketplaceSearchCard'
import ToggleButton from './ToggleButton'

interface PriceCard {
  activeButton: number
  onChange?: (clickedButton: number, sortType: SortType) => void
}

export default function PriceCard(props: PriceCard) {
  const toggleButons = [{ title: 'None' }, { title: 'Lowest First' }, { title: 'Highest First' }]

  const currentButton = props.activeButton
  const [toggleButtonsComp, setToggleButonsComp] = useState(null)

  useEffect(() => {
    setToggleButonsComp(
      toggleButons.map((button, index) => {
        return (
          <ToggleButton
            key={index}
            title={button.title}
            onClick={() => props.onChange(index, index)}
            active={index === currentButton}
          />
        )
      }),
    )
  }, [currentButton])

  return (
    <Box
      height={198}
      width={400}
      rounded="2xl"
      background={'linear-gradient(265.73deg, #274C63 0%, #182F3E 100%)'}
      shadow="up"
    >
      <Text
        pt={4}
        pb={2}
        width="full"
        textAlign={'start'}
        pl="12"
        fontSize={14}
        fontWeight={700}
        textColor={'#5F7A99'}
      >
        Sort:
      </Text>
      <Flex justifyContent={'center'} gap="2">
        {toggleButtonsComp}
      </Flex>
      <Flex mt={6} justifyContent={'start'} alignItems="center">
        <Text
          pr={4}
          textAlign={'center'}
          pl="12"
          fontSize={14}
          fontWeight={700}
          textColor={'#5F7A99'}
        >
          CNV Price Range :
        </Text>
        <Flex gap={1} alignItems="center">
          <PriceInputValue title="From" />
          <Box width={2.5} height={1} shadow="down"></Box>
          <PriceInputValue title="To" />
        </Flex>
      </Flex>
      <Flex height={'69px'} justifyContent="center" alignItems={'end'} gap="2">
        <ChooseButton title="Reset" />
        <ChooseButton title="Apply" backgroundType="blue" />
      </Flex>
    </Box>
  )
  function getSortTypeByIndex(index: number) {
    switch (index) {
      case 0:
        return SortType.NONE
      case 1:
        return SortType.NONE
      case 2:
        return SortType.NONE
    }
  }

  interface PriceInputValueProps {
    title: string
  }

  function PriceInputValue(props: PriceInputValueProps) {
    const { title } = props
    const [value, setValue] = useState('')
    const emptyValue = value === ''
    const label = emptyValue ? title : ''
    return (
      <Flex justifyContent="center" alignItems={'center'}>
        <Text position={'absolute'}>{label}</Text>
        <Input
          value={value}
          onChange={(v) => setValue(v.target.value)}
          width="90px"
          height="30px"
          borderRadius={'2xl'}
        />
      </Flex>
    )
  }
}
