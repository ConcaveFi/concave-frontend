import { ArrowForwardIcon, ArrowLeftIcon, ArrowRightIcon, ArrowUpIcon } from '@concave/icons'
import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  NumericInput,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
  Portal,
  StatArrow,
  Text,
  useBreakpointValue,
} from '@concave/ui'
import ChooseButton from 'components/Marketplace/ChooseButton'
import SearchFilterCard from 'components/Marketplace/Filters/SearchFilterCard'
import ToggleButton from 'components/Marketplace/ToggleButton'
import { NftPositionSortType } from 'hooks/useNftPositionSort'
import { useEffect, useState } from 'react'
import { MdArrowBack, MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md'

interface SimplePriceFilterCardProps {
  onChangeSorter: (sortType: NftPositionSortType) => void
  onApplyFilter?: (from: number, to: number) => void
  onResetFilter?: () => void
  currentSorter: NftPositionSortType
  highestFirst: NftPositionSortType
  lowestFirst: NftPositionSortType
  title: string
  icon?: string
}

export default function SimplePriceFilterCard(props: SimplePriceFilterCardProps) {
  const { currentSorter, highestFirst, lowestFirst, title, icon } = props

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
          <SearchFilterCard hasFilter={hasSorter || hasFilter} title={title} icon={icon} />
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
              lowestFirst={lowestFirst}
              highestFirst={highestFirst}
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
  highestFirst: NftPositionSortType
  lowestFirst: NftPositionSortType
}

const SortCard = (props: SortCardProps) => {
  const { currentSorter, highestFirst, lowestFirst } = props

  const currentActive = currentSorter === highestFirst || currentSorter === lowestFirst

  const buttons = [
    { title: 'None', sorter: NftPositionSortType.NONE },
    { title: 'Lowest First', sorter: lowestFirst },
    { title: 'Highest First', sorter: highestFirst },
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
  const [toValue, setToValue] = useState('')

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
        gap={{ base: 2, md: 2 }}
        direction={{ base: 'column', md: 'row' }}
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
          Range:
        </Text>
        <Flex ml={4} alignItems="center" gap={1}>
          <Flex justifyContent="center" alignItems={'center'}>
            <Text position={'absolute'}></Text>
            <NumericInput
              textAlign={'center'}
              shadow="down"
              placeholder="From"
              value={fromValue}
              onChange={(v) => setFromValue(v.target.value.replaceAll(',', ''))}
              width="110px"
              height="30px"
              borderRadius={'2xl'}
            />
          </Flex>
          {/* <MdArrowForwardIos /> */}
          <Box width={4} height={1} shadow="down"></Box>
          <Flex justifyContent="center" alignItems={'center'}>
            <Text position={'absolute'}></Text>
            <NumericInput
              placeholder="To"
              shadow="down"
              textAlign={'center'}
              value={toValue}
              onChange={(v) => setToValue(v.target.value.replaceAll(',', ''))}
              width="110px"
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
