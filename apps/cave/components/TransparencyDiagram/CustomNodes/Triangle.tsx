import { Box } from '@concave/ui'
import { Handle, Position } from 'react-flow-renderer'
import { NodeDisplayData } from '../types'
import { NodeText } from './NodeText'
import { sharedNodeContainerStyle, sharedNodeHandleStyle } from './styles'
import { SVG } from './SVG'

export function TriangleNode({ data }: { data: NodeDisplayData }) {
  const shapeSettings = {
    path: 'M62.8116 95.7447C59.5867 101.418 51.5244 101.418 48.2995 95.7447L1.13502 12.766C-2.0899 7.09222 1.94124 -5.7275e-07 8.39108 0L102.72 8.37646e-06C109.17 8.94921e-06 113.201 7.09221 109.976 12.766L62.8116 95.7447Z',
    width: '112px',
    height: '100px',
    viewBox: '0 0 112 100',
    fill: '#7189FF',
    labelLeft: 'unset',
    labelBottom: '35%',
  }

  return (
    <Box sx={{ ...sharedNodeContainerStyle }}>
      <Handle
        type="target"
        position={Position.Bottom}
        id="bottomTarget"
        style={{ ...sharedNodeHandleStyle, bottom: 2 }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottomSource"
        style={{ ...sharedNodeHandleStyle, bottom: 2 }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="rightSource"
        style={{ ...sharedNodeHandleStyle, top: 6, right: 2 }}
      />
      <Handle
        type="target"
        position={Position.Right}
        id="rightTarget"
        style={{ ...sharedNodeHandleStyle, bottom: 5, right: 22 }}
      />
      <Handle
        type="source"
        position={Position.Left}
        id="leftSource"
        style={{ ...sharedNodeHandleStyle, bottom: 5, left: 22 }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="leftTarget"
        style={{ ...sharedNodeHandleStyle, top: 6, left: 2 }}
      />
      <SVG shapeSettings={shapeSettings} />
      <NodeText data={data} shapeSettings={shapeSettings} contractMultiLine />
    </Box>
  )
}
