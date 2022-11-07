import { Box, Link } from '@concave/ui'
import { getExplorerURL } from 'components/TransparencyDiagram/utils'
import { Handle, Position } from 'react-flow-renderer'
import { sharedNodeContainerStyle, sharedNodeHandleStyle } from '../../styles'
import { NodeDisplayData } from '../../types'
import { NodeText } from '../NodeText'

export function Token({ data }: { data: NodeDisplayData }) {
  const explorerURL = getExplorerURL(data)

  return (
    <Box sx={{ ...sharedNodeContainerStyle, minH: '180px', height: '180px' }}>
      <Handle
        type="target"
        position={Position.Top}
        id="topTarget"
        style={{ ...sharedNodeHandleStyle }}
      />
      <Handle
        type="source"
        position={Position.Top}
        id="topSource"
        style={{ ...sharedNodeHandleStyle }}
      />
      <Handle
        type="target"
        position={Position.Bottom}
        id="bottomTarget"
        style={{ ...sharedNodeHandleStyle }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottomSource"
        style={{ ...sharedNodeHandleStyle }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="rightSource"
        style={{ ...sharedNodeHandleStyle }}
      />
      <Handle
        type="target"
        position={Position.Right}
        id="rightTarget"
        style={{ ...sharedNodeHandleStyle }}
      />
      <Handle
        type="source"
        position={Position.Left}
        id="leftSource"
        style={{ ...sharedNodeHandleStyle }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="leftTarget"
        style={{ ...sharedNodeHandleStyle }}
      />
      <Link href={explorerURL} target="_blank">
        <svg
          width="122"
          height="90"
          viewBox="0 0 122 90"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M120.998 35.8936C120.949 26.9635 115.042 18.0333 103.287 11.2206C79.78 -2.40685 41.7901 -2.40685 18.4336 11.2206C6.75621 18.0333 0.948946 26.9635 1.00034 35.8936C1.03167 38.9394 1.70773 41.9437 2.98368 44.7072C4.40361 47.8413 6.583 50.8855 9.52375 53.7386C12.0324 56.1752 15.095 58.4703 18.7115 60.5667C42.2184 74.1941 80.2083 74.1941 103.565 60.5667C107.159 58.4646 110.194 56.1714 112.676 53.7367C115.516 50.9505 117.625 47.9808 119.015 44.9231C120.309 42.1292 120.986 39.0875 121 36.0064C121 35.9662 121 35.9318 120.998 35.8936ZM95.2128 55.7261C76.4396 66.6781 45.9034 66.6781 27.0083 55.7261C8.11333 44.7741 8.01245 27.0151 26.7857 16.0612C45.5589 5.10724 76.0836 5.10724 94.9901 16.0612C113.897 27.0151 113.984 44.7722 95.2128 55.7261Z"
            stroke="white"
            strokeWidth="2"
            strokeMiterlimit="10"
          />
          <path
            d="M121 36.0083L121 53.7478C121.053 62.6826 115.244 71.6174 103.566 78.4337C80.2098 92.0681 42.22 92.0681 18.713 78.4337C6.95573 71.6174 1.04187 62.6826 1 53.7478C1 53.7096 1 53.6713 1 53.6331L1 35.8936C1.03133 38.9409 1.70739 41.9468 2.98334 44.7117C4.40328 47.8474 6.58266 50.8932 9.52341 53.7478C12.0321 56.1856 15.0947 58.4819 18.7111 60.5794C42.2181 74.2139 80.2079 74.2139 103.565 60.5794C107.158 58.4762 110.194 56.1818 112.676 53.7459C115.516 50.9582 117.625 47.987 119.014 44.9278C120.308 42.1329 120.985 39.0904 121 36.0083V36.0083Z"
            fill="url(#paint0_linear_704_6)"
            stroke="white"
            strokeWidth="2"
            strokeMiterlimit="10"
          />
          <defs>
            <linearGradient
              id="paint0_linear_704_6"
              x1="1"
              y1="62.2765"
              x2="121"
              y2="62.2765"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#407BFF" />
              <stop offset="1" stopColor="#407BFF" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </Link>
      <NodeText data={data} />
    </Box>
  )
}
