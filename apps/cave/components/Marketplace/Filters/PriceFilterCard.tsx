import {
  Box,
  Button,
  Flex,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Text,
  useBreakpointValue,
} from '@concave/ui'
import { NftPositionSortType } from 'hooks/useNftPositionSort'
import { useEffect, useState } from 'react'
import ChooseButton from '../ChooseButton'
import ToggleButton from '../ToggleButton'
import SearchFilterCard from './SearchFilterCard'

interface RedeemFilterCardProps {
  onChangeSorter: (sortType: NftPositionSortType) => void
  onApplyFilter?: (from: number, to: number) => void
  onResetFilter?: () => void
  currentSorter: NftPositionSortType
}

export default function PriceFilterCard(props: RedeemFilterCardProps) {
  const { currentSorter } = props

  const [hasSorter, setHasSorter] = useState(false)
  const [hasFilter, setHasFilter] = useState(false)

  const [offSetX, setOffSetX] = useState(100)

  const mobileLayout = useBreakpointValue({ base: true, md: false })

  return (
    <Popover closeOnEsc offset={[mobileLayout ? -135 : -187, 10]} placement="bottom">
      {/* Chakra type bug, related to just released react 18, should be fixed soon 
        // @ts-ignore  */}
      <PopoverTrigger>
        <Button>
          <SearchFilterCard hasFilter={hasSorter || hasFilter} title={'Price'} icon={'PriceIcon'} />
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <Box
            position={'relative'}
            height={198}
            width={{ base: '340px', md: '400px' }}
            rounded="2xl"
            bg={{
              base: 'linear-gradient(239.18deg, #19394C 27.18%, #0A161F 96.11%)',
              md: 'linear-gradient(265.73deg, #274C63 0%, #182F3E 100%)',
            }}
            shadow="up"
          >
            <Box
              position={'absolute'}
              height="full"
              width={'full'}
              bgImage={'/assets/textures/metal.png'}
              bgSize="20%"
              rounded={'2xl'}
            />
            <SortCard
              onChangeActive={setHasSorter}
              currentSorter={currentSorter}
              onChangeSorter={props.onChangeSorter}
            />
            <FiltersContainer
              onApply={(from, to) => {
                if (from || to) {
                  setHasFilter(true)
                  props.onApplyFilter(from, to)
                }
              }}
              onReset={() => {
                setHasFilter(false)
                props.onResetFilter()
              }}
            />
          </Box>
        </PopoverContent>
      </Portal>
    </Popover>
  )
}

interface SortCardProps {
  currentSorter: NftPositionSortType
  onChangeSorter: (sortType: NftPositionSortType) => void
  onChangeActive: (active: boolean) => void
}

const SortCard = (props: SortCardProps) => {
  const { currentSorter } = props

  const currentActive =
    currentSorter === NftPositionSortType.PRICE_HIGHEST_FIRST ||
    currentSorter === NftPositionSortType.PRICE_LOWEST_FIRST

  const buttons = [
    { title: 'None', sorter: NftPositionSortType.NONE },
    { title: 'Lowest First', sorter: NftPositionSortType.PRICE_LOWEST_FIRST },
    { title: 'Highest First', sorter: NftPositionSortType.PRICE_HIGHEST_FIRST },
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
    props.onChangeActive(currentActive)
  }, [currentSorter])

  return (
    <>
      <Text
        pt={4}
        pb={2}
        width="full"
        textAlign={'start'}
        pl={12}
        fontSize={14}
        fontWeight={700}
        textColor={'#5F7A99'}
      >
        Sort:
      </Text>
      <Flex justifyContent={'center'} gap="2">
        {toggleButons}
      </Flex>
    </>
  )
}

interface FiltersContainerProps {
  onApply: (from: number, to: number) => void
  onReset: () => void
}

const FiltersContainer = (props: FiltersContainerProps) => {
  const [fromValue, setFromValue] = useState('')
  const emptyFrom = fromValue === ''
  const fromLabel = emptyFrom ? 'From' : ''

  // INPUT 2
  const [toValue, setToValue] = useState('')
  const emptyToValue = toValue === ''
  const toLabel = emptyToValue ? 'To' : ''

  const onApply = () => {
    const higherNumber = fromValue > toValue ? +fromValue : +toValue
    const smallerNumber = fromValue < toValue ? +fromValue : +toValue
    props.onApply(smallerNumber, higherNumber)
  }

  const onReset = () => {
    setFromValue('')
    setToValue('')
    props.onReset()
  }
  return (
    <>
      <Flex
        mt={{ base: 2, md: 6 }}
        justifyContent={'start'}
        alignItems="center"
        direction={{ base: 'column', md: 'row' }}
        gap={{ base: 2, md: 0 }}
        align="center"
      >
        <Text
          alignSelf={'start'}
          pl={{ base: 12 }}
          textAlign={'center'}
          fontSize={14}
          fontWeight={700}
          textColor={'#5F7A99'}
          my="auto"
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
      <Flex
        mt={{ base: '23px', md: '35.5px' }}
        flex={1}
        justifyContent="center"
        align={'end'}
        gap="2"
      >
        <ChooseButton onClick={onReset} title="Reset" />
        <ChooseButton onClick={onApply} title="Apply" backgroundType="blue" />
      </Flex>
    </>
  )
}
