import { Box, Flex, Text } from '@concave/ui'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { SortType } from './MarketplaceSearchCard'
import ToggleButton from './ToggleButton'

const highLightedBorder = {
  border: '2px solid #7DE0FF',
}
const UpSmall = `0px 4px 4px rgba(0, 0, 0, 0.25), inset -1px 1px 2px rgba(128, 186, 255, 0.05)`

interface RedeemCardProps {
  onChange?: (clickedButton: number, type: SortType) => void
  initialActive?: number
}

function RedeemCard(props: RedeemCardProps) {
  const buttons = [{ title: 'None' }, { title: 'Lowest First' }, { title: 'Highest First' }]

  // const [curButton, setCurButton] = useState(props.initialActive)

  const curButton = props.initialActive
  const onClick = (clickedButton: number) => {
    switch (clickedButton) {
      case 0:
        props.onChange(clickedButton, SortType.NONE)
        break
      case 1:
        props.onChange(clickedButton, SortType.REDEEMIN_LOWEST_FIRST)
        break
      case 2:
        props.onChange(clickedButton, SortType.REDEEMIN_HIGHEST_FIRST)
        break
    }
    // setCurButton(clickedButton)
  }
  const [toggleButons, setToggleButtons] = useState(null)

  useEffect(() => {
    setToggleButtons(
      buttons.map((button, index) => {
        return (
          <ToggleButton
            key={index}
            onClick={() => onClick(index)}
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
      shadow="up"
    >
      <Text fontSize={14} fontWeight={700} textColor={'#5F7A99'}>
        Sort:
      </Text>
      {toggleButons}
    </Flex>
  )
}

export default RedeemCard
