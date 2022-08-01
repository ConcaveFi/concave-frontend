import { Box, Link, Text } from '@concave/ui'
import { NodeDisplayData, ShapeSettingsType } from '../types'

export const NodeText = ({
  data,
  shapeSettings,
  contractMultiLine = false,
}: {
  data: NodeDisplayData
  shapeSettings: ShapeSettingsType
  contractMultiLine?: boolean
}) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        left: shapeSettings.labelLeft,
        bottom: shapeSettings.labelBottom,
        width: '100%',
        textAnchor: 'middle',
      }}
    >
      <Text color={'white'} fontSize={'0.75rem'} fontWeight={'bold'}>
        {data.label}
      </Text>
      <Text color={'white'} fontSize={'0.65rem'} fontWeight={''}>
        <Link href={`https://etherscan.io/${data.addressType}/${data.address}`} target="_blank">
          View {contractMultiLine && <br />} contract
        </Link>
      </Text>
    </Box>
  )
}
