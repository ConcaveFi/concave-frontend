import { Box } from '@concave/ui'
import { Handle, Position } from 'react-flow-renderer'
import { sharedNodeContainerStyle, sharedNodeHandleStyle } from '../../styles'
import { NodeDisplayData } from '../../types'
import { NodeText } from '../NodeText'

export function User({ data }: { data: NodeDisplayData }) {
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
      <svg
        width="89"
        height="127"
        viewBox="0 0 89 127"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M23.8671 54.7979C10.261 64.6332 1 84.0685 1 106.437C1 117.241 20.3068 126 44.123 126C67.9391 126 87.246 117.241 87.246 106.437C87.246 84.0686 77.985 64.6334 64.379 54.798C58.9723 59.5456 51.8839 62.4242 44.1231 62.4242C36.3623 62.4242 29.2738 59.5456 23.8671 54.7979Z"
          fill="url(#paint0_radial_665_161)"
        />
        <path
          d="M23.8671 54.7979L24.527 54.0464L23.9277 53.5202L23.2813 53.9874L23.8671 54.7979ZM64.379 54.798L64.9648 53.9875L64.3184 53.5203L63.7191 54.0465L64.379 54.798ZM2 106.437C2 84.3144 11.1624 65.2156 24.453 55.6083L23.2813 53.9874C9.35972 64.0509 0 83.8226 0 106.437H2ZM44.123 125C32.3238 125 21.6901 122.828 14.0436 119.36C6.30611 115.849 2 111.205 2 106.437H0C0 112.474 5.3473 117.611 13.2173 121.181C21.1783 124.792 32.106 127 44.123 127V125ZM86.246 106.437C86.246 111.205 81.9398 115.849 74.2024 119.36C66.5559 122.828 55.9222 125 44.123 125V127C56.14 127 67.0677 124.792 75.0287 121.181C82.8987 117.611 88.246 112.474 88.246 106.437H86.246ZM63.7931 55.6084C77.0837 65.2158 86.246 84.3145 86.246 106.437H88.246C88.246 83.8227 78.8863 64.051 64.9648 53.9875L63.7931 55.6084ZM63.7191 54.0465C58.4879 58.6402 51.6319 61.4242 44.1231 61.4242V63.4242C52.1359 63.4242 59.4567 60.4511 65.0388 55.5494L63.7191 54.0465ZM44.1231 61.4242C36.6143 61.4242 29.7582 58.6401 24.527 54.0464L23.2073 55.5493C28.7894 60.4511 36.1103 63.4242 44.1231 63.4242V61.4242Z"
          fill="white"
        />
        <ellipse
          cx="44.123"
          cy="31.5"
          rx="31"
          ry="30.5"
          fill="url(#paint1_radial_665_161)"
          stroke="white"
          strokeWidth="2"
          strokeMiterlimit="10"
        />
        <defs>
          <radialGradient
            id="paint0_radial_665_161"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(55.3468 71.0768) rotate(123.66) scale(50.092 52.2763)"
          >
            <stop stopColor="#407BFF" />
            <stop offset="1" stopColor="#407BFF" stopOpacity="0" />
          </radialGradient>
          <radialGradient
            id="paint1_radial_665_161"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(52.1915 19.0702) rotate(121.485) scale(38.2152 38.5027)"
          >
            <stop stopColor="#407BFF" />
            <stop offset="1" stopColor="#407BFF" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
      <NodeText data={data} />
    </Box>
  )
}
