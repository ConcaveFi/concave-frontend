import { Box, Link } from '@concave/ui'
import { getExplorerURL } from 'components/TransparencyDiagram/utils'
import { Handle, Position } from 'react-flow-renderer'
import { sharedNodeContainerStyle, sharedNodeHandleStyle } from '../../styles'
import { NodeDisplayData } from '../../types'
import { NodeText } from '../NodeText'

export function Multisig({ data }: { data: NodeDisplayData }) {
  const explorerURL = getExplorerURL(data)

  return (
    <Box sx={{ ...sharedNodeContainerStyle }}>
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
      />{' '}
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
          width="123"
          height="139"
          viewBox="0 0 123 139"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.8975 112.461L59.2474 136.652L121.5 100.47M49.0237 94.3703L80.15 76.2793L90.1956 82.242"
            stroke="white"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinejoin="round"
          />
          <path
            d="M17.8975 75.9399L59.2474 100.13L121.5 63.9484L80.15 39.7578L17.8975 75.9399Z"
            stroke="white"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinejoin="round"
          />
          <path
            d="M17.8975 75.5342L18.0003 112.511L58.8912 136.652L58.7884 99.6757L17.8975 75.5342Z"
            fill="url(#paint0_linear_665_124)"
            stroke="white"
            strokeWidth="2"
            strokeMiterlimit="10"
          />
          <path
            d="M58.8913 99.6965L58.9958 136.652L121.5 100.564L121.396 63.6084L58.8913 99.6965Z"
            stroke="white"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinejoin="round"
          />
          <path
            d="M121.5 100.876L121.395 63.8993L79.7609 39.7578L79.8656 76.7343L89.823 82.2423"
            stroke="white"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinejoin="round"
          />
          <path
            d="M18.0007 112.801L17.8975 75.8459L79.6576 39.7578L79.7608 76.7132L49.2018 94.1677"
            stroke="white"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinejoin="round"
          />
          <path
            d="M63.3633 12.3876C63.3633 12.4362 63.3633 12.4827 63.3633 12.5313C63.4172 22.5546 70.6546 34.6838 79.6069 39.7304L79.6529 39.7576L79.6529 39.7052L79.7608 3.2766L79.6868 3.23584L63.3633 12.3876Z"
            fill="url(#paint1_linear_665_124)"
            stroke="white"
            strokeWidth="2"
            strokeMiterlimit="10"
          />
          <path
            d="M17.8975 38.2975C8.86491 33.0291 1.52004 37.2588 1.50004 47.7471C1.48004 58.2354 8.75892 71.0113 17.7915 76.2797L17.8975 38.2975Z"
            fill="url(#paint2_linear_665_124)"
            stroke="white"
            strokeWidth="2"
            strokeMiterlimit="10"
          />
          <path
            d="M5.97205 37.3217C8.84996 35.7018 12.8182 35.894 17.1993 38.2671L17.1993 38.2536L63.6272 12.1765L79.7609 3.11646C77.0844 1.62727 74.5601 0.950887 72.3379 1.00277H72.1918H72.01H71.9844C71.9113 1.00277 71.8402 1.00277 71.7691 1.01814L71.5715 1.03543C71.5057 1.03543 71.4399 1.04312 71.374 1.05849C71.2713 1.07194 71.1765 1.0854 71.0698 1.10269L70.8723 1.13535C70.7854 1.15073 70.6985 1.16802 70.6116 1.18724H70.5859L70.3331 1.2468C70.2442 1.26794 70.1553 1.29292 70.0684 1.3179C69.9815 1.34288 69.8946 1.36786 69.8096 1.39668C69.5845 1.4697 69.3652 1.55041 69.1499 1.64264C69.0966 1.66185 69.0452 1.68491 68.9958 1.70797C68.7717 1.80738 68.5528 1.91769 68.3401 2.03847L53.3283 10.524L51.3531 11.6442L34.0875 21.4037L32.0471 22.5566L31.0279 23.1331L28.9954 24.286L25.9654 26L23.9664 27.1299L22.963 27.6967L20.0002 29.3742L5.97205 37.3217Z"
            fill="url(#paint3_linear_665_124)"
            stroke="white"
            strokeWidth="2"
            strokeMiterlimit="10"
          />
          <rect
            width="13.4162"
            height="17.1429"
            transform="matrix(0.866025 -0.5 1.4045e-08 1 82.7422 85.9688)"
            fill="url(#paint4_linear_665_124)"
            stroke="white"
            strokeWidth="2"
            strokeMiterlimit="10"
          />
          <defs>
            <linearGradient
              id="paint0_linear_665_124"
              x1="17.8975"
              y1="106.093"
              x2="58.8912"
              y2="106.093"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FFA500" />
              <stop offset="1" stopColor="#FFA500" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_665_124"
              x1="63.3633"
              y1="21.4967"
              x2="79.7608"
              y2="21.4967"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FFA500" />
              <stop offset="1" stopColor="#FFA500" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_665_124"
              x1="1.5"
              y1="56.1555"
              x2="17.8975"
              y2="56.1555"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FFA500" />
              <stop offset="1" stopColor="#FFA500" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint3_linear_665_124"
              x1="5.97205"
              y1="19.6335"
              x2="79.7609"
              y2="19.6335"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FFA500" />
              <stop offset="1" stopColor="#FFA500" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint4_linear_665_124"
              x1="0"
              y1="8.57143"
              x2="13.4162"
              y2="8.57143"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FFA500" />
              <stop offset="1" stopColor="#FFA500" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </Link>
      <NodeText data={data} />
    </Box>
  )
}
