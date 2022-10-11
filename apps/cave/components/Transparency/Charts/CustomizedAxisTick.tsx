import { CHART_COLORS } from './style'

export const CustomizedAxisTick = (props: any) => {
  const { x, y, stroke, payload, isMobile, customValue } = props
  const fill = CHART_COLORS.TextLow

  let xPos = 0
  let yPos = 10
  let rA: string

  if (isMobile) {
    xPos = -5
    yPos = 12
    rA = 'rotate(-30)'
  }

  return (
    <g transform={`translate(${x},${y})`}>
      <text fontSize={'0.8rem'} x={xPos} y={yPos} textAnchor={'middle'} fill={fill} transform={rA}>
        {customValue || payload.value}
      </text>
    </g>
  )
}
