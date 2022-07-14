import { Box } from '@concave/ui'
import { Handle, Position } from 'react-flow-renderer'
import { NodeDisplayData } from '../types'
import { NodeText } from './NodeText'
import { sharedNodeContainerStyle, sharedNodeHandleStyle } from './styles'
import { SVG } from './SVG'

export function CylinderNode({ data }: { data: NodeDisplayData }) {
  const shapeSettings = {
    path: 'M15.9762 80.5H109.454C108.902 80.0708 108.368 79.5817 107.855 79.0412C105.759 76.8374 103.919 73.7028 102.395 69.9157C99.3461 62.3349 97.4841 51.9345 97.4841 40.5C97.4841 29.0655 99.3461 18.6651 102.395 11.0846C103.919 7.29708 105.759 4.16268 107.855 1.95857C108.368 1.41798 108.902 0.929482 109.454 0.5H15.9762C14.0655 0.5 12.1455 1.4584 10.2942 3.40522C8.44011 5.35492 6.72294 8.2312 5.25898 11.871C2.33319 19.1454 0.5 29.2667 0.5 40.5C0.5 51.7333 2.33319 61.8546 5.25898 69.1289C6.72294 72.7685 8.44011 75.645 10.2942 77.595C12.1455 79.5414 14.0655 80.5 15.9762 80.5ZM109.342 3.40522C111.193 1.4584 113.113 0.5 115.024 0.5C116.935 0.5 118.854 1.4584 120.706 3.40522C122.56 5.35492 124.277 8.2312 125.741 11.871C128.667 19.1454 130.5 29.2667 130.5 40.5C130.5 51.7333 128.667 61.8546 125.741 69.1289C124.277 72.7685 122.56 75.645 120.706 77.595C118.854 79.5414 116.935 80.5 115.024 80.5C113.113 80.5 111.193 79.5414 109.342 77.595C107.488 75.645 105.77 72.7685 104.307 69.1289C101.381 61.8546 99.5476 51.7333 99.5476 40.5C99.5476 29.2667 101.381 19.1454 104.307 11.871C105.77 8.2312 107.488 5.35492 109.342 3.40522Z',
    width: '130px',
    height: '80px',
    viewBox: '0 0 131 81',
    fill: '#079D7C',
    labelLeft: '-11.5%',
    labelBottom: '27%',
  }

  return (
    <Box sx={{ ...sharedNodeContainerStyle }}>
      <Handle
        type="target"
        position={Position.Top}
        id="topTarget"
        style={{ ...sharedNodeHandleStyle, top: 0, left: '50%' }}
      />
      <Handle
        type="source"
        position={Position.Top}
        id="topSource"
        style={{ ...sharedNodeHandleStyle, top: 0, left: '50%' }}
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
