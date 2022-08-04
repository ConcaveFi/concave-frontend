import { Box } from '@concave/ui'
import { Handle, Position } from 'react-flow-renderer'
import { NodeDisplayData } from '../types'
import { NodeText } from './NodeText'
import { sharedNodeContainerStyle, sharedNodeHandleStyle } from './styles'
import { SVG } from './SVG'

export function CircleNode({ data }: { data: NodeDisplayData }) {
  const shapeSettings = {
    width: '100px',
    height: '100px',
    viewBox: '0 0 100 100',
    labelLeft: 'unset',
    labelBottom: '40%',
  }

  return (
    <Box sx={{ ...sharedNodeContainerStyle }}>
      <Handle
        type="target"
        position={Position.Top}
        id="topTarget"
        style={{ ...sharedNodeHandleStyle, top: 2 }}
      />
      <Handle
        type="source"
        position={Position.Top}
        id="topSource"
        style={{ ...sharedNodeHandleStyle, top: 2 }}
      />
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
        style={{ ...sharedNodeHandleStyle, top: '48%', right: 0 }}
      />
      <Handle
        type="target"
        position={Position.Right}
        id="rightTarget"
        style={{ ...sharedNodeHandleStyle, top: '52%', right: 0 }}
      />
      <Handle
        type="source"
        position={Position.Left}
        id="leftSource"
        style={{ ...sharedNodeHandleStyle, top: '48%', left: 0 }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="leftTarget"
        style={{ ...sharedNodeHandleStyle, top: '52%', left: 0 }}
      />
      <SVG shapeSettings={shapeSettings}>
        <circle cx="50" cy="50" r="50" fill="#9e5f2f" />
      </SVG>
      <NodeText data={data} shapeSettings={shapeSettings} contractMultiLine />
    </Box>
  )
}
