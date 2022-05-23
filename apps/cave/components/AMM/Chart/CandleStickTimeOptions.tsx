import { BoxRadioGroup, HStack, StackProps } from '@concave/ui'
import { ChartInterval } from 'lib/token.service'

type OwnProps = StackProps & {
  intervals: readonly ChartInterval[]
  defaultValue: ChartInterval
  onChangeInteral: (interval: ChartInterval) => void
}

export const CandleStickTimeOptions = ({
  onChangeInteral,
  intervals,
  defaultValue,
  ...stackProps
}: OwnProps) => {
  return (
    <HStack p={2} borderRadius={'full'} shadow="Down Big" {...stackProps}>
      <BoxRadioGroup
        options={intervals as string[]}
        defaultValue={defaultValue}
        onChange={onChangeInteral}
      />
    </HStack>
  )
}
