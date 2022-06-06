import { ArrowForwardIcon, ArrowLeftIcon, ArrowRightIcon, ArrowUpIcon } from '@concave/icons'
import {
  Box,
  Button,
  Flex,
  NumericInput,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Text,
  useBreakpointValue,
} from '@concave/ui'
import ChooseButton from 'components/Marketplace/ChooseButton'
import SearchFilterCard from 'components/SearchFilters/SearchFilterCard'
import ToggleButton from 'components/Marketplace/ToggleButton'
import { useEffect, useState } from 'react'
import { NftSorter, NftSortOrder } from 'hooks/useNftPositionSort'
import { NftRangeFilter } from 'hooks/useNftPositionFilter'

interface SimplePriceFilterCardProps {
  onChangeSorter: (sortType: NftSorter, order: NftSortOrder) => void
  onRemoveSorter: (sortType: NftSorter) => void
  onApply: (filter: NftRangeFilter, { min, max }: { min: number; max: number }) => void
  onResetFilter?: () => void
  filter: NftRangeFilter
  sortType: NftSorter
  title: string
  icon?: string
}

export default function SimplePriceFilterCard(props: SimplePriceFilterCardProps) {
  const { filter, sortType, title, icon, onChangeSorter, onRemoveSorter } = props

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
              sorter={sortType}
              onAddSorter={onChangeSorter}
              onRemoveSorter={onRemoveSorter}
            />
            <FiltersContainer
              filter={filter}
              onApply={(filter, { min, max }) => {
                if (min || max) {
                  setHasFilter(true)
                  props.onApply(filter, { min, max })
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
  sorter: NftSorter
  onAddSorter: (sortType: NftSorter, order: NftSortOrder) => void
  onRemoveSorter: (sortType: NftSorter) => void
  onChangeActive: (active: boolean) => void
}

const SortCard = (props: SortCardProps) => {
  const { onChangeActive, onRemoveSorter, onAddSorter, sorter } = props

  const buttons: { title: string; order: NftSortOrder }[] = [
    { title: 'None', order: 'none' },
    { title: 'Lowest First', order: 'lowest' },
    { title: 'Highest First', order: 'highest' },
  ]

  const [currentButton, setCurrentButton] = useState('None')
  const currentActive = currentButton !== 'None'
  const toggleButons = buttons.map((button, index) => {
    return (
      <ToggleButton
        key={index}
        onClick={() => {
          setCurrentButton(button.title)
          onChangeActive(button.title !== 'None')
          if (button.title === 'none') onRemoveSorter(sorter)
          else onAddSorter(sorter, button.order)
        }}
        title={button.title}
        active={button.title === currentButton}
      />
    )
  })

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
  onApply: (filter: NftRangeFilter, { min, max }: { min: number; max: number }) => void
  onReset: () => void
  filter: NftRangeFilter
}

const FiltersContainer = (props: FiltersContainerProps) => {
  const { filter } = props
  const [fromValue, setFromValue] = useState('')
  const [toValue, setToValue] = useState('')

  const onApply = () => {
    props.onApply(filter, {
      min: Math.min(+fromValue, +toValue),
      max: Math.max(+fromValue, +toValue),
    })
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
