import { CHART_COLORS } from './style'

export const CustomizedAxisTick = (props: any) => {
  const { x, y, stroke, payload, customValue, isMobile } = props
  const fill = CHART_COLORS.TextLow

  let xPos: number, yPos: number, rA: number
  if (isMobile) {
    xPos = -5
    yPos = 12
    rA = -30
  } else {
    xPos = 0
    yPos = 12
    rA = 0
  }

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        fontSize={'0.8rem'}
        x={xPos}
        y={yPos}
        textAnchor={'middle'}
        fill={fill}
        transform={`rotate(${rA})`}
      >
        {customValue || payload.value}
      </text>
    </g>
  )
}
