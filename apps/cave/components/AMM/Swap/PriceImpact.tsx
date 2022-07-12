import { Percent, Rounding } from '@concave/core'
import { Flex, FlexProps, Text } from '@concave/ui'

export const PriceImpact = ({
  priceImpact,
  children,
}: {
  priceImpact?: Percent
} & FlexProps) => {
  let color = `text.low`
  if (!priceImpact) return <></>
  if (priceImpact.toSignificant() === `0`) return <></>

  const fivePercent = new Percent(5, 100)
  if (priceImpact.greaterThan(fivePercent)) color = `orange`

  const tenPercent = new Percent(99, 1000)
  if (priceImpact.greaterThan(tenPercent)) color = `red`

  const emoji = priceImpact.greaterThan(new Percent(98, 100)) ? `😱` : ``

  const priceImpactString = children
    ? priceImpact.toFixed(2, { groupSeparator: ',' }, Rounding.ROUND_UP) + '%'
    : '(' + priceImpact.toFixed(2, { groupSeparator: ',' }, Rounding.ROUND_UP) + '%' + ')'

  return (
    <Flex justify="space-between" color={color}>
      {children}
      {priceImpactString} {emoji}
    </Flex>
  )
}
