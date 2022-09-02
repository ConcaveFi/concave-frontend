import { SVGProps } from 'react'
import { labelStyle } from '../styles'
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

  const wordArray = label.trim().split(/\s+/)
  const wordArrayLength = wordArray.length

  let currentLine = ''
  let labelLines: string[] = []

  for (let i = 0; i <= wordArrayLength; i++) {
    // case 0. last iteration
    if (i === wordArrayLength) {
      labelLines.push(currentLine)
    } else {
      const currentWord = wordArray[i]
      const nextLine = currentLine + ' ' + currentWord
      // case 1. add to current line
      if (nextLine.length <= maxLineLength) {
        currentLine = nextLine
      }
      // case 2. make new line
      else {
        labelLines.push(currentLine)
        currentLine = currentWord
      }
    }
  }

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
