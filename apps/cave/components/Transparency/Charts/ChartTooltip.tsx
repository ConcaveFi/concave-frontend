import { Card, Text } from '@concave/ui'
import { numberWithCommas } from 'utils/numbersWithCommas'

type PayloadObject = {
  color: string
  dataKey: string
  fill: string
  name: string
  value: number
  chartType: any
  formatter: any
  payload: any
  type: any
  unit: any
}

export const ChartTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: PayloadObject[]
  label?: string
}) => {
  if (active && payload && payload.length) {
    return (
      <Card variant="secondary" p={5}>
        {payload.map((current, index: number) => (
          <Text fontSize={'lg'} key={index}>
            {`${current.name}: ${numberWithCommas(current.value.toFixed(4))}`}
          </Text>
        ))}
      </Card>
    )
  }
  return null
}
