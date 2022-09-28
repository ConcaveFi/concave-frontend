import { Card, Text } from '@concave/ui'

export const ChartTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: []
  label?: string
}) => {
  if (active && payload && payload.length) {
    return (
      <Card variant="secondary" p={5}>
        {payload.map((current: any, index: number) => (
          <Text fontSize={'lg'} key={index}>
            {`${current.name}: ${current.value.toFixed(4)}`}
          </Text>
        ))}
      </Card>
    )
  }
  return null
}
