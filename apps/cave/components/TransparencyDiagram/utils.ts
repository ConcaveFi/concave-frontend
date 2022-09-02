import { NodeDisplayData } from './types'

export function wrapText(label: string, maxLineLength = 25): string[] {
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
      const nextLine = (currentLine + ' ' + currentWord).trim()
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

  return labelLines
}

export function getExplorerURL(data: NodeDisplayData): string {
  if (data.address) {
    const explorerURL = data.chain ? data.chain : 'etherscan.io'
    return `https://${explorerURL}/${data.addressType}/${data.address}`
  }
}
