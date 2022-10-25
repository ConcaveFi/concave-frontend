import { CHART_COLORS } from './style'

export const CustomizedAxisTick = (props: any) => {
  const { x, y, stroke, payload, customValue } = props
  const fill = CHART_COLORS.TextLow

  const xPos = -5
  const yPos = 12
  const rA = 'rotate(-30)'

  return (
    <g transform={`translate(${x},${y})`}>
      <text fontSize={'0.8rem'} x={xPos} y={yPos} textAnchor={'middle'} fill={fill} transform={rA}>
        {customValue || payload.value}
      </text>
    </g>
  )
}
