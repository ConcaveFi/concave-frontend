import { HStack, StackProps } from '@chakra-ui/react'
import { BoxRadioGroup } from '@concave/ui'

type OwnProps = StackProps & { onChangeInteral: (interval: number) => void }

export const CandleStickTimeOptions = ({ onChangeInteral, ...stackProps }: OwnProps) => {
  const intervals = {
    '5m': 5 * 60,
    '15m': 15 * 60,
    '1H': 60 * 60,
    '4H': 4 * 60 * 60,
    '1D': 24 * 60 * 60,
  }
  return (
    <HStack py={1} px={2} borderRadius={'3xl'} shadow={'low'} {...stackProps}>
      <BoxRadioGroup options={intervals} onChange={onChangeInteral} />
    </HStack>
  )
}
