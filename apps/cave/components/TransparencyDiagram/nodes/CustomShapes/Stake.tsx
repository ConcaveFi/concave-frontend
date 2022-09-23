import { Box, Link, useBreakpointValue } from '@concave/ui'
import { getExplorerURL } from 'components/TransparencyDiagram/utils'
import { Handle, Position } from 'react-flow-renderer'
import { sharedNodeContainerStyle, sharedNodeHandleStyle } from '../../styles'
import { NodeDisplayData, ShapeLabelSettingsType } from '../../types'
import { NodeText } from '../NodeText'

export function Stake({ data }: { data: NodeDisplayData }) {
  const isMobile = useBreakpointValue({ base: true, md: false })
  const shapeSettings: ShapeLabelSettingsType = {
    labelBottom: '-55px',
  }

  const explorerURL = getExplorerURL(data)

  return (
    <Box sx={{ ...sharedNodeContainerStyle }}>
      <Handle
        type="target"
        position={Position.Top}
        id="topTarget"
        style={{ ...sharedNodeHandleStyle, top: -15 }}
      />
      <Handle
        type="source"
        position={Position.Top}
        id="topSource"
        style={{ ...sharedNodeHandleStyle, top: -15 }}
      />
      <Handle
        type="target"
        position={Position.Bottom}
        id="bottomTarget"
        style={{ ...sharedNodeHandleStyle, bottom: isMobile ? '-110px' : '-66px' }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottomSource"
        style={{ ...sharedNodeHandleStyle, bottom: isMobile ? '-110px' : '-66px' }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="rightSource"
        style={{ ...sharedNodeHandleStyle, right: -15 }}
      />
      <Handle
        type="target"
        position={Position.Right}
        id="rightTarget"
        style={{ ...sharedNodeHandleStyle, right: -15 }}
      />
      <Handle
        type="source"
        position={Position.Left}
        id="leftSource"
        style={{ ...sharedNodeHandleStyle, left: -15 }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="leftTarget"
        style={{ ...sharedNodeHandleStyle, left: -15 }}
      />
      <NodeText data={data} shapeSettings={shapeSettings} />
      <Link href={explorerURL} target="_blank">
        <svg
          width="89"
          height="122"
          viewBox="0 0 89 122"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M87.9483 75.4966L87.8927 95.7079L44.5 121L44.5577 100.789L87.9483 75.4966Z"
            stroke="white"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinejoin="round"
          />
          <path
            d="M87.9483 55.3623L87.8927 75.5736L44.5 100.866L44.5577 80.6543L87.9483 55.3623Z"
            stroke="white"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinejoin="round"
          />
          <path
            d="M87.9483 25.9663L87.8927 46.1776L44.5 71.4697L44.5577 51.2583L87.9483 25.9663Z"
            stroke="white"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinejoin="round"
          />
          <path
            d="M44.5 100.789L44.4427 121L1.05176 95.7079L1.10906 75.4966L44.5 100.789Z"
            fill="url(#paint0_linear_665_231)"
            stroke="white"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinejoin="round"
          />
          <path
            d="M44.5 80.6543L44.4427 100.866L1.05176 75.5736L1.10906 55.3623L44.5 80.6543Z"
            fill="url(#paint1_linear_665_231)"
            stroke="white"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinejoin="round"
          />
          <path
            d="M44.5 51.2583L44.4427 71.4697L1.05176 46.1776L1.10906 25.9663L44.5 51.2583Z"
            fill="url(#paint2_linear_665_231)"
            stroke="white"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinejoin="round"
          />
          <path
            d="M9.02014 50.9331L1.05176 55.564L44.6419 80.7318L87.9483 55.564L79.9277 50.9331"
            stroke="white"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinejoin="round"
          />
          <path
            d="M87.9483 26.1678L44.6419 51.3356L1.05176 26.1678L44.3582 1L87.9483 26.1678Z"
            fill="url(#paint3_linear_665_231)"
            stroke="white"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient
              id="paint0_linear_665_231"
              x1="1.05176"
              y1="98.2483"
              x2="44.5"
              y2="98.2483"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4EDEF3" />
              <stop offset="1" stopColor="#4EDEF3" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_665_231"
              x1="1.05176"
              y1="78.114"
              x2="44.5"
              y2="78.114"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4EDEF3" />
              <stop offset="1" stopColor="#4EDEF3" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_665_231"
              x1="1.05176"
              y1="48.718"
              x2="44.5"
              y2="48.718"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4EDEF3" />
              <stop offset="1" stopColor="#4EDEF3" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint3_linear_665_231"
              x1="1.05176"
              y1="26.1678"
              x2="87.9483"
              y2="26.1678"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4EDEF3" />
              <stop offset="1" stopColor="#4EDEF3" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </Link>
    </Box>
  )
}
