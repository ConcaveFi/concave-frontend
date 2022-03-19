import { BoxRadioGroup, HStack, StackProps } from '@concave/ui'
import { CandleStickIntervalTypes } from './useCandleStickChart'

type OwnProps = StackProps & {
  intervals: string[]
  defaultValue: string
  onChangeInteral: (interval: CandleStickIntervalTypes) => void
}

export const CandleStickTimeOptions = ({
  onChangeInteral,
  intervals,
  defaultValue,
  ...stackProps
}: OwnProps) => {
  return (
    <HStack p={2} borderRadius={'3xl'} shadow="Down Big" {...stackProps}>
      <BoxRadioGroup options={intervals} defaultValue={defaultValue} onChange={onChangeInteral} />
    </HStack>
  )
}
