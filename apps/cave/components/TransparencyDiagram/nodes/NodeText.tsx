import { Box, Link, Text } from '@concave/ui'
import { NodeDisplayData, ShapeLabelSettingsType } from '../types'

export const NodeText = ({
  data,
  shapeSettings,
  contractMultiLine = false,
}: {
  data: NodeDisplayData
  shapeSettings: ShapeLabelSettingsType
  contractMultiLine?: boolean
}) => {
  const explorerURL = data.chain ? data.chain : 'etherscan.io'
  return (
    <Box
      sx={{
        position: 'fixed',
        left: shapeSettings.labelLeft,
        bottom: shapeSettings.labelBottom,
        width: 'max-content',
        textAnchor: 'middle',
      }}
    >
      <Text color={'white'} fontSize={'1.6rem'}>
        {data.label}
      </Text>
      {data.address && (
        <Text color={'white'} fontSize={'1.15rem'} lineHeight={'0.75rem'}>
          <Link href={`https://${explorerURL}/${data.addressType}/${data.address}`} target="_blank">
            View {contractMultiLine && <br />} contract
          </Link>
        </Text>
      )}
    </Box>
  )
}
