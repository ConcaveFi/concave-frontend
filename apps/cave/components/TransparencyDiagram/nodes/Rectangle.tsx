import { Box } from '@concave/ui'
import { Handle, Position } from 'react-flow-renderer'
import { NodeDisplayData } from '../types'
import { NodeText } from './NodeText'
import { sharedNodeContainerStyle, sharedNodeHandleStyle } from './styles'
import { SVG } from './SVG'

export function RectangleNode({ data }: { data: NodeDisplayData }) {
  const shapeSettings = {
    path: 'M0 6C0 2.68629 3.91751 0 8.75 0H131.25C136.082 0 140 2.68629 140 6V54C140 57.3137 136.082 60 131.25 60H8.75C3.91751 60 0 57.3137 0 54V6Z',
    width: '140px',
    height: '60px',
    viewBox: '0 0 140 60',
    fill: 'orange',
    labelLeft: 'unset',
    labelBottom: '25%',
  }

  return (
    <Box sx={{ ...sharedNodeContainerStyle }}>
      <Handle
        type="target"
        position={Position.Top}
        id="topTarget"
        style={{ ...sharedNodeHandleStyle, left: '50%' }}
      />
      <Handle
        type="source"
        position={Position.Top}
        id="topSource"
        style={{ ...sharedNodeHandleStyle, left: '50%' }}
      />
      <Handle
        type="target"
        position={Position.Bottom}
        id="bottomTarget"
        style={{ ...sharedNodeHandleStyle, left: '50%' }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottomSource"
        style={{ ...sharedNodeHandleStyle, left: '50%' }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="rightSource"
        style={{ ...sharedNodeHandleStyle, top: '40%' }}
      />
      <Handle
        type="target"
        position={Position.Right}
        id="rightTarget"
        style={{ ...sharedNodeHandleStyle, top: '60%' }}
      />{' '}
      <Handle
        type="source"
        position={Position.Left}
        id="leftSource"
        style={{ ...sharedNodeHandleStyle, top: '50%' }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="leftTarget"
        style={{ ...sharedNodeHandleStyle, top: '50%' }}
      />
      <SVG shapeSettings={shapeSettings} />
      <NodeText data={data} shapeSettings={shapeSettings} />
    </Box>
  )
}
