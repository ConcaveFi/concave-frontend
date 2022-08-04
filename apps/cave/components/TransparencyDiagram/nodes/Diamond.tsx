import { Box } from '@concave/ui'
import { Handle, Position } from 'react-flow-renderer'
import { NodeDisplayData } from '../types'
import { NodeText } from './NodeText'
import { sharedNodeContainerStyle, sharedNodeHandleStyle } from './styles'
import { SVG } from './SVG'

export function DiamondNode({ data }: { data: NodeDisplayData }) {
  const isAccrualBonds = data.label.search('AccrualBondsV1') !== -1

  const shapeSettings = {
    path: 'M55.3716 1.91712C57.9277 -0.639039 62.072 -0.639038 64.6281 1.91712L118.083 55.3716C120.639 57.9277 120.639 62.072 118.083 64.6281L64.6281 118.083C62.072 120.639 57.9277 120.639 55.3716 118.083L1.91712 64.6281C-0.639039 62.072 -0.639038 57.9277 1.91712 55.3716L55.3716 1.91712Z',
    width: '120px',
    height: '120px',
    viewBox: '0 0 120 120',
    fill: '#A53B69',
    labelLeft: 'unset',
    labelBottom: isAccrualBonds ? '25%' : '35%',
  }

  return (
    <Box sx={{ ...sharedNodeContainerStyle }}>
      <Handle
        type="target"
        position={Position.Top}
        id="topTarget"
        style={{ ...sharedNodeHandleStyle, top: 2, left: '50%' }}
      />
      <Handle
        type="source"
        position={Position.Top}
        id="topSource"
        style={{ ...sharedNodeHandleStyle, top: 2, left: '50%' }}
      />
      <Handle
        type="target"
        position={Position.Bottom}
        id="bottomTarget"
        style={{ ...sharedNodeHandleStyle, bottom: 0, left: '50%' }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottomSource"
        style={{ ...sharedNodeHandleStyle, bottom: 0, left: '50%' }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="rightSource"
        style={{ ...sharedNodeHandleStyle, top: '50%', right: 0 }}
      />
      <Handle
        type="target"
        position={Position.Right}
        id="rightTarget"
        style={{ ...sharedNodeHandleStyle, top: '50%', right: 0 }}
      />
      <Handle
        type="source"
        position={Position.Left}
        id="leftSource"
        style={{ ...sharedNodeHandleStyle, top: '50%', left: 0 }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="leftTarget"
        style={{ ...sharedNodeHandleStyle, top: '50%', left: 0 }}
      />
      <SVG shapeSettings={shapeSettings} />
      <NodeText data={data} shapeSettings={shapeSettings} />
    </Box>
  )
}
