import { Box, Flex, Input, Text } from '@concave/ui'
import { printIntrospectionSchema } from 'graphql'
import { useEffect, useState } from 'react'
import ChooseButton from './ChooseButton'
import { SortType } from './MarketplaceSearchCard'
import ToggleButton from './ToggleButton'

interface PriceCard {
  activeButton: number
  onChange?: (clickedButton: number, sortType: SortType) => void
  onApply: (from: number, to: number) => void
}

export default function PriceCard(props: PriceCard) {
  const toggleButons = [{ title: 'None' }, { title: 'Lowest First' }, { title: 'Highest First' }]

  const currentButton = props.activeButton
  const [toggleButtonsComp, setToggleButonsComp] = useState(null)

  // INPUT 1
  const [fromValue, setFromValue] = useState('')
  const emptyFrom = fromValue === ''
  const fromLabel = emptyFrom ? 'From' : ''

  // INPUT 2
  const [toValue, setToValue] = useState('')
  const emptyToValue = toValue === ''
  const toLabel = emptyToValue ? 'To' : ''

  useEffect(() => {
    setToggleButonsComp(renderButtons())
  }, [currentButton])

  const onApply = () => {
    const higherNumber = fromValue > toValue ? +fromValue : +toValue
    const smallerNumber = fromValue < toValue ? +fromValue : +toValue
    props.onApply(smallerNumber, higherNumber)
  }

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
          CNV Price Range:
        </Text>
        <Flex gap={1} alignItems="center">
          <Flex justifyContent="center" alignItems={'center'}>
            <Text position={'absolute'}>{fromLabel}</Text>
            <Input
              value={fromValue}
              onChange={(v) => {
                setFromValue(v.target.value)
              }}
              width="90px"
              height="30px"
              borderRadius={'2xl'}
            />
          </Flex>
          <Box width={2.5} height={1} shadow="down"></Box>
          <Flex justifyContent="center" alignItems={'center'}>
            <Text position={'absolute'}>{toLabel}</Text>
            <Input
              value={toValue}
              onChange={(v) => {
                setToValue(v.target.value)
              }}
              width="90px"
              height="30px"
              borderRadius={'2xl'}
            />
          </Flex>
        </Flex>
      </Flex>
      <Flex height={'65px'} justifyContent="center" alignItems={'end'} gap="2">
        <ChooseButton onClick={() => {}} title="Reset" />
        <ChooseButton onClick={() => onApply()} title="Apply" backgroundType="blue" />
      </Flex>
    </Box>
  )
  function renderButtons() {
    return toggleButons.map((button, index) => {
      return (
        <ToggleButton
          key={index}
          title={button.title}
          onClick={() => props.onChange(index, getSortTypeByIndex(index))}
          active={index === currentButton}
        />
      )
    })
  }

  function getSortTypeByIndex(index: number) {
    switch (index) {
      case 0:
        return SortType.NONE
      case 1:
        return SortType.PRICE_LOWEST_FIRST
      case 2:
        return SortType.PRICE_HIGHEST_FIRST
    }
  }
}
