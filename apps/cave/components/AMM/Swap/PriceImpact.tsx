import { Percent, Rounding } from '@concave/core'
import { Flex, FlexProps, Text } from '@concave/ui'

export const PriceImpact = ({
  priceImpact,
  ...flexProps
}: {
  priceImpact?: Percent
} & FlexProps) => {
  let color = `white`
  if (!priceImpact) return <></>
  if (priceImpact.toSignificant() === `0`) return <></>

  const fivePercent = new Percent(5, 100)
  if (priceImpact.greaterThan(fivePercent)) color = `orange`

  const tenPercent = new Percent(99, 1000)
  if (priceImpact.greaterThan(tenPercent)) color = `red`

  const emoji = priceImpact.greaterThan(new Percent(98, 100)) ? `😱` : ``
  return (
    <Flex justify="space-between" color={color} {...flexProps}>
      <Text>Price Impact</Text>
      <Text>
        {priceImpact.toFixed(2, { groupSeparator: ',' }, Rounding.ROUND_UP)}% {emoji}
      </Text>
    </Flex>
  )
}
