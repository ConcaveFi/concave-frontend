import { SVGProps } from 'react'
import { labelStyle } from '../styles'
import { wrapText } from '../utils'
export function WrappedEdgeLabel({
  id,
  maxLineLength = 25,
  label,
  customStyle,
}: {
  id: string
  maxLineLength?: number
  label: string
  customStyle?: SVGProps<SVGTSpanElement>
}) {
  const style = customStyle || labelStyle
  const labelLines = wrapText(label, maxLineLength)

  return (
    <>
      {labelLines.map((textLine, i) => (
        <tspan
          key={id + '-' + i}
          x="0"
          dy={i === 0 ? '0px' : '18px'}
          textAnchor="middle"
          {...style}
        >
          {textLine}
        </tspan>
      ))}
    </>
  )
}
