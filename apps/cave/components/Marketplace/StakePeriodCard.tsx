import { Box, Button, Flex, gradientBorder, HStack, propNames, Text } from '@concave/ui'
import { isActive } from 'nock/types'
import { useEffect, useState } from 'react'
import ChooseButton from './ChooseButton'
import { SortType } from './MarketplaceSearchCard'
import ToggleButton from './ToggleButton'

const highLightedBorder = {
  border: '2px solid #7DE0FF',
}
const UpSmall = `0px 4px 4px rgba(0, 0, 0, 0.25), inset -1px 1px 2px rgba(128, 186, 255, 0.05)`

interface StakePeriodCardProps {
  activeSortButton: number
  onChange: (clickedButton: number, sortType: SortType) => void
  onApply: (
    filter12month: boolean,
    filter6month: boolean,
    filter3month: boolean,
    filter1month: boolean,
  ) => void
  onReset: () => void
}

export default function StakePeriodCard(props: StakePeriodCardProps) {
  const { activeSortButton, onChange } = props
  return (
    <Flex
      flex={1}
      pos="absolute"
      width={357}
      height={249}
      background="linear-gradient(265.73deg, #274C63 0%, #182F3E 100%)"
      rounded={'2xl'}
      shadow="up"
    >
      <Box position={'relative'} width={'full'} height={100}>
        <Sort activeButton={activeSortButton} onChange={onChange} />
        <Periods onReset={props.onReset} onApply={props.onApply} />
      </Box>
    </Flex>
  )
}

interface SortProps {
  activeButton: number
  onChange: (clickedButton: number, sortType: SortType) => void
}
const Sort = (props: SortProps) => {
  const sortButtons = [{ title: 'None' }, { title: 'Lowest First' }, { title: 'Highest First' }]
  const currentButton = props.activeButton

  const [sortButtonsComp, setSortButtonsComp] = useState(null)
  useEffect(() => {
    setSortButtonsComp(
      sortButtons.map((button, index) => {
        return (
          <ToggleButton
            title={button.title}
            key={index}
            onClick={() => props.onChange(index, getSortTypeByIndex(index))}
            active={index == currentButton}
          />
        )
      }),
    )
  }, [currentButton])
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
        {sortButtonsComp}
      </Flex>
    </>
  )
}

function getSortTypeByIndex(index: number) {
  switch (index) {
    case 0:
      return SortType.NONE
    case 1:
      return SortType.STAKE_LOWEST_FIRST
    case 2:
      return SortType.STAKE_HIGHEST_FIRST
  }
}
interface PeriodsProps {
  onApply: (
    filter12month: boolean,
    filter6month: boolean,
    filter3Month: boolean,
    filter1Month: boolean,
  ) => void
  onReset: () => void
}

const Periods = (props: PeriodsProps) => {
  const [curButton, setCurButton] = useState(0)

  const periodButtons = [
    { title: 'None' },
    { title: '12Month' },
    { title: '6Month' },
    { title: '3Month' },
    { title: '1Month' },
  ]

  const periodButtonsComp = periodButtons.map((value, index) => {
    return (
      <ToggleButton
        key={index}
        title={value.title}
        onClick={() => setCurButton(index)}
        active={curButton === index}
        width={100}
      />
    )
  })
  const filter12month = curButton === 1
  const filter6month = curButton === 2
  const filter3month = curButton === 3
  const filter1month = curButton === 4

  const onApply = () => {
    props.onApply(filter12month, filter6month, filter3month, filter1month)
  }
  const onReset = () => {
    setCurButton(0)
    props.onReset()
  }
  return (
    <>
      <Flex
        fontWeight={700}
        fontSize={14}
        textColor={'#5F7A99'}
        wrap={'wrap'}
        justifyContent="center"
        mx="3"
        alignItems={'center'}
        gap="2"
      >
        <Text px={2.5}>Stake period:</Text>
        {periodButtonsComp}
      </Flex>
      <Flex height={'73px'} justifyContent="center" alignItems={'end'} gap="3">
        <ChooseButton onClick={onReset} title="Reset" />
        <ChooseButton onClick={onApply} title="Apply" backgroundType="blue" />
      </Flex>
    </>
  )
}
