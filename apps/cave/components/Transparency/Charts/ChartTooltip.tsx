import { Box, Card, Text } from '@concave/ui'
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
  accessPayloadKeys,
  payloadKeys,
}: {
  active?: boolean
  payload?: PayloadObject[]
  label?: string
  accessPayloadKeys?: boolean
  payloadKeys?: string[]
}) => {
  if (active && payload && payload.length) {
    return (
      <Card variant="secondary" p={5} alignItems={'flex-start'}>
        {payload.map((current, index: number) => (
          <Box key={current.name + '-box'}>
            {accessPayloadKeys ? (
              payloadKeys.map((key) => (
                <Text fontSize={'lg'} key={index + key}>
                  {`${titleCase(key)}: ${current.payload[key]}`}
                </Text>
              ))
            ) : (
              <></>
            )}
            <Text fontSize={'lg'} key={index}>
              {`${current.name}: ${numberWithCommas(current.value.toFixed(4))}`}
            </Text>
          </Box>
        ))}
      </Card>
    )
  }
  return null
}

function titleCase(str: string): string {
  const split = str.toLocaleLowerCase().split('')
  split[0] = split[0].toUpperCase()
  return split.join('')
}
