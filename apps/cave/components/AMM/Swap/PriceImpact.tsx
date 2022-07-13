import { Percent, Rounding } from '@concave/core'
import { Flex, FlexProps, Text } from '@concave/ui'
import type { ReactNode } from 'react'

export const PriceImpact = ({
  priceImpact,
  fontSize,
  opacity,
  children,
}: {
  priceImpact?: Percent
  fontSize?: string
  opacity?: number
  children?: ReactNode
} & FlexProps) => {
  if (!priceImpact) return <></>
  if (priceImpact.toSignificant() === '0') return <></>

  const fivePercent = new Percent(5, 100)
  const tenPercent = new Percent(99, 1000)

  let color = 'text.low'
  if (priceImpact.greaterThan(fivePercent)) color = 'orange'
  if (priceImpact.greaterThan(tenPercent)) color = 'red'

  const emoji = priceImpact.greaterThan(new Percent(98, 100)) ? `😱` : ``

  const priceImpactString = children
    ? priceImpact.toFixed(2, { groupSeparator: ',' }, Rounding.ROUND_UP) + '%'
    : '(' + priceImpact.toFixed(2, { groupSeparator: ',' }, Rounding.ROUND_UP) + '%' + ')'

  return (
    <Flex justify="space-between" color={color}>
      {children}
      <Text fontSize={fontSize} opacity={opacity}>
        {priceImpactString} {emoji}
      </Text>
    </Flex>
  )
}
