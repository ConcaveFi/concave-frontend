import { Box } from '@concave/ui'
import { Handle, Position } from 'react-flow-renderer'
import { NodeDisplayData } from '../types'
import { NodeText } from './NodeText'
import { sharedNodeContainerStyle, sharedNodeHandleStyle } from './styles'
import { SVG } from './SVG'

export function FolderNode({ data }: { data: NodeDisplayData }) {
  const shapeSettings = {
    path: 'M10.4045 1.78069C10.844 0.703758 11.8907 0 13.0525 0H49.2597C50.4215 0 51.4681 0.703758 51.9077 1.78069L61.8452 26.1147H0.466896L10.4045 1.78069ZM0 28.0255H107.139C108.719 28.0255 110 29.3085 110 30.8917V97.1338C110 98.7172 108.719 100 107.139 100H2.86127C1.28085 100 0 98.7172 0 97.1338V28.0255Z',
    width: '110',
    height: '100',
    viewBox: '0 0 110 100',
    fill: '#079D7C',
    labelLeft: 'unset',
    labelBottom: '50%',
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
      <NodeText data={data} shapeSettings={shapeSettings} />
    </Box>
  )
}
