import {
  Box,
  Button,
  Flex,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Text,
  useBreakpointValue,
} from '@concave/ui'
import { useState } from 'react'
import ChooseButton from '../Marketplace/ChooseButton'
import { NftPositionDaysFilterType } from '../../hooks/useNftPositionFilter'
import ToggleButton from '../Marketplace/ToggleButton'
import SearchFilterCard from './SearchFilterCard'
import { NftSorter, NftSortOrder } from 'hooks/useNftPositionSort'
import { title } from 'process'

interface StakePoolFilterCardProps {
  onChangeSorter: (sortType: NftSorter, order: NftSortOrder) => void
  onRemoveSorter: (sortType: NftSorter) => void
  onResetFilters?: () => void
  onApplyFilters?: (filterType: NftPositionDaysFilterType) => void
}

export default function StakePoolFilterCard(props: StakePoolFilterCardProps) {
  const { onApplyFilters, onResetFilters, onChangeSorter, onRemoveSorter } = props

  const [hasSorter, setHasSorter] = useState(false)
  const [hasFilter, setHasFilter] = useState(false)
  const mobileLayout = useBreakpointValue({ base: true, md: false })

  return (
    <Popover offset={[mobileLayout ? 115 : 132, 10]}>
      {/* Chakra type bug, related to just released react 18, should be fixed soon 
        // @ts-ignore  */}
      <PopoverTrigger>
        <Button>
          <SearchFilterCard
            hasFilter={hasSorter || hasFilter}
            title={'Stake Pool'}
            icon={'StakeIcon'}
          />
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <Flex
            flex={1}
            pos="absolute"
            width={{ base: '340px', md: 357 }}
            height={249}
            bg={{
              base: 'linear-gradient(239.18deg, #19394C 27.18%, #0A161F 96.11%)',
              md: 'linear-gradient(265.73deg, #274C63 0%, #182F3E 100%)',
            }}
            rounded={'2xl'}
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
            <Box position={'relative'} width={'full'} height={100}>
              <PeriodSorts
                onChangeCurSorterActive={setHasSorter}
                onAddSorter={onChangeSorter}
                onRemoveSorter={onRemoveSorter}
              />
              <Periods
                onChangeFilter={setHasFilter}
                onReset={onResetFilters}
                onApply={onApplyFilters}
              />
            </Box>
          </Flex>
        </PopoverContent>
      </Portal>
    </Popover>
  )
}

interface PeriodSortsProps {
  onAddSorter: (sortType: NftSorter, order: NftSortOrder) => void
  onRemoveSorter: (sortType: NftSorter) => void
  onChangeCurSorterActive: (active: boolean) => void
}

function PeriodSorts(props: PeriodSortsProps) {
  const { onAddSorter, onChangeCurSorterActive, onRemoveSorter } = props
  const buttons: { title: string; order: NftSortOrder }[] = [
    { title: 'None', order: 'none' },
    { title: 'Lowest First', order: 'highest' },
    { title: 'Highest First', order: 'lowest' },
  ]

  const [currentButton, setCurrentButton] = useState('None')
  const toggleButons = buttons.map((button, index) => {
    return (
      <ToggleButton
        key={index}
        onClick={() => {
          setCurrentButton(button.title)
          onChangeCurSorterActive(button.title !== 'None')
          if (title !== 'None') onAddSorter(NftSorter.STAKE, button.order)
          else onRemoveSorter(NftSorter.STAKE)
        }}
        title={button.title}
        active={button.title === currentButton}
      />
    )
  })
  return (
    <>
      <Text
        mt={4}
        width="full"
        textAlign={'start'}
        textColor={'#5F7A99'}
        fontSize="14px"
        pl={6}
        fontWeight="700"
      >
        Sort:
      </Text>
      <Flex
        gap={2}
        justifyContent="center"
        align={'center'}
        textColor={'#5F7A99'}
        fontSize="14px"
        mt={2}
        mb={6}
        fontWeight="700"
      >
        {toggleButons}
      </Flex>
    </>
  )
}

interface PeriodsProps {
  onApply: (filterType: NftPositionDaysFilterType) => void
  onReset: () => void
  onChangeFilter: (hasFilter: boolean) => void
}

const Periods = (props: PeriodsProps) => {
  const { onApply: onApplyFilter, onReset, onChangeFilter } = props
  const [currentButton, setCurrentButton] = useState('None')
  const periodButtons = [
    { title: 'None', filter: NftPositionDaysFilterType.NONE },
    { title: '360 Days', filter: NftPositionDaysFilterType.FILTER_BY_360 },
    { title: '180 Days', filter: NftPositionDaysFilterType.FILTER_BY_180 },
    { title: '90 Days', filter: NftPositionDaysFilterType.FILTER_BY_90 },
    { title: '45 Days', filter: NftPositionDaysFilterType.FILTER_BY_45 },
  ]
  const periodButtonsComp = periodButtons.map((value, index) => {
    return (
      <ToggleButton
        key={index}
        title={value.title}
        onClick={() => {
          setCurrentButton(value.title)
          setCurrentFilter(value.filter)
        }}
        active={currentButton === value.title}
        width={100}
      />
    )
  })

  const [currentFilter, setCurrentFilter] = useState(NftPositionDaysFilterType.NONE)
  const onApply = () => {
    onChangeFilter(currentFilter !== NftPositionDaysFilterType.NONE)
    onApplyFilter(currentFilter)
  }

  const resetFilter = () => {
    setCurrentButton('None')
    setCurrentFilter(NftPositionDaysFilterType.NONE)
    onReset()
  }

  return (
    <>
      <Flex
        fontWeight={700}
        fontSize={14}
        textColor={'#5F7A99'}
        wrap={'wrap'}
        justifyContent="center"
        alignItems={'center'}
        gap={2}
      >
        <Text px={4}>Stake Pool:</Text>
        {periodButtonsComp}
      </Flex>
      <Flex height={'73px'} justifyContent="center" alignItems={'end'} gap="3">
        <ChooseButton onClick={resetFilter} title="Reset" />
        <ChooseButton onClick={onApply} title="Apply" backgroundType="blue" />
      </Flex>
    </>
  )
}
