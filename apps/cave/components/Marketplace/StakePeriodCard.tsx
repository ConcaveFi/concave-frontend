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
        <Periods onApply={props.onApply} />
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
    filter3month: boolean,
    filter1month: boolean,
  ) => void
}

const Periods = (props: PeriodsProps) => {
  const [filter12Month, setFilter12Month] = useState(false)
  const [filter6Month, setFilter6Month] = useState(false)
  const [filter3Month, setFilter3Month] = useState(false)
  const [filter1Month, setFilter1Month] = useState(false)

  const noFilter = !filter12Month && !filter6Month && !filter3Month && !filter1Month
  const wipeSelections = () => {
    setFilter12Month(false)
    setFilter6Month(false)
    setFilter3Month(false)
    setFilter1Month(false)
  }
  const onApply = () => {
    props.onApply(filter12Month, filter6Month, filter3Month, filter1Month)
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
        {/* {periodButtonsComp} */}
        <ToggleButton title={'None'} onClick={wipeSelections} active={noFilter} width={100} />
        <ToggleButton
          title={'12 Month'}
          onClick={() => setFilter12Month(!filter12Month)}
          active={filter12Month}
          width={100}
        />
        <ToggleButton
          title={'6 Month'}
          onClick={() => setFilter6Month(!filter6Month)}
          active={filter6Month}
          width={100}
        />
        <ToggleButton
          title={'3 Month'}
          onClick={() => setFilter3Month(!filter3Month)}
          active={filter3Month}
          width={100}
        />
        <ToggleButton
          title={'1 Month'}
          onClick={() => setFilter1Month(!filter1Month)}
          active={filter1Month}
          width={100}
        />
      </Flex>
      <Flex height={'73px'} justifyContent="center" alignItems={'end'} gap="3">
        <ChooseButton onClick={() => {}} title="Reset" />
        <ChooseButton onClick={onApply} title="Apply" backgroundType="blue" />
      </Flex>
    </>
  )
}
