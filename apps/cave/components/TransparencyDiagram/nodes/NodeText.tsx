import { Box, Link, Text, useBreakpointValue } from '@concave/ui'
import { NodeDisplayData } from '../types'
import { getExplorerURL, wrapText } from '../utils'

export const NodeText = ({ data }: { data: NodeDisplayData }) => {
  const isMobile = useBreakpointValue({ base: true, md: false })

  let style: {
    labelFontSize: string
    linkFontSize?: string
    lineHeight: string
    textTransform?: string
  }
  let label: string | string[]

  if (isMobile) {
    label = wrapText(data.label, 10)
    style = {
      labelFontSize: '2rem',
      lineHeight: '2.75rem',
      textTransform: label.length > 1 ? 'translateY(45px)' : 'translateY(0px)',
    }
  } else {
    label = data.label
    style = {
      labelFontSize: '1.6rem',
      linkFontSize: '1.15rem',
      lineHeight: '0.75rem',
    }
  }

  const explorerURL: string | undefined = getExplorerURL(data)

  return (
    <Box mt={2}>
      {isMobile && data.address && typeof label !== 'string' ? (
        <Link href={explorerURL} target="_blank" lineHeight={style.lineHeight}>
          {label.map((textLine, i) => (
            <Text key={i} color={'white'} fontSize={style.labelFontSize}>
              {textLine}
            </Text>
          ))}
        </Link>
      ) : (
        <>
          <Text color={'white'} whiteSpace={'nowrap'} fontSize={style.labelFontSize}>
            {label}
          </Text>
          {data.address && (
            <Text
              color={'white'}
              fontSize={style.linkFontSize}
              whiteSpace={'nowrap'}
              lineHeight={style.lineHeight}
            >
              <Link href={explorerURL} target="_blank">
                View contract
              </Link>
            </Text>
          )}
        </>
      )}
    </Box>
  )
}
