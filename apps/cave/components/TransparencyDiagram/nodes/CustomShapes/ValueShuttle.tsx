import { Box } from '@concave/ui'
import { Handle, Position } from 'react-flow-renderer'
import { sharedNodeContainerStyle, sharedNodeHandleStyle } from '../../styles'
import { NodeDisplayData, ShapeLabelSettingsType } from '../../types'
import { NodeText } from '../NodeText'

export function ValueShuttle({ data }: { data: NodeDisplayData }) {
  const shapeSettings: ShapeLabelSettingsType = {
    labelBottom: '-55px',
  }

  return (
    <Box sx={{ ...sharedNodeContainerStyle }}>
      <Handle
        type="target"
        position={Position.Top}
        id="topTarget"
        style={{ ...sharedNodeHandleStyle, top: -15, left: '50%' }}
      />
      <Handle
        type="source"
        position={Position.Top}
        id="topSource"
        style={{ ...sharedNodeHandleStyle, top: -15, left: '50%' }}
      />
      <Handle
        type="target"
        position={Position.Bottom}
        id="bottomTarget"
        style={{ ...sharedNodeHandleStyle, bottom: '-66px', left: '50%' }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottomSource"
        style={{ ...sharedNodeHandleStyle, bottom: '-66px', left: '50%' }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="rightSource"
        style={{ ...sharedNodeHandleStyle, top: '50%', right: -8 }}
      />
      <Handle
        type="target"
        position={Position.Right}
        id="rightTarget"
        style={{ ...sharedNodeHandleStyle, top: '50%', right: -8 }}
      />
      <Handle
        type="source"
        position={Position.Left}
        id="leftSource"
        style={{ ...sharedNodeHandleStyle, top: '50%', left: -15 }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="leftTarget"
        style={{ ...sharedNodeHandleStyle, top: '50%', left: -15 }}
      />
      <NodeText data={data} shapeSettings={shapeSettings} />
      <svg
        width="167"
        height="82"
        viewBox="0 0 167 82"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M115.622 1.00415L128.271 1.02392L123.498 9.94551L117.993 11.9323L97.0295 9.3214L111.055 1.98109C112.476 1.29336 114.043 0.95825 115.622 1.00415Z"
          stroke="white"
          strokeWidth="2"
          strokeMiterlimit="10"
        />
        <path
          d="M116.038 80.9958L128.687 80.9761L123.914 72.0545L118.409 70.0677L97.4459 72.6786L111.471 80.0189C112.893 80.7066 114.459 81.0417 116.038 80.9958Z"
          stroke="white"
          strokeWidth="2"
          strokeMiterlimit="10"
        />
        <path
          d="M146.545 32.0947L146.57 49.9424L149.091 49.9424C149.114 49.9424 149.139 49.9424 149.162 49.9424C152.036 49.9424 154.359 45.9386 154.35 41.0115C154.342 36.0843 152.01 32.089 149.136 32.0947C149.114 32.0947 149.088 32.0947 149.066 32.0947L146.545 32.0947Z"
          fill="url(#paint0_linear_665_267)"
          stroke="white"
          strokeWidth="2"
          strokeMiterlimit="10"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M135.127 61.3695C137.182 61.2604 139.325 59.3759 141.025 55.7045C142.737 52.0036 143.819 46.8221 143.81 41.0498C143.8 35.2773 142.703 30.0998 140.98 26.4038C139.271 22.7384 137.123 20.8586 135.068 20.752L135.067 19.7388L136.863 19.7275L137.032 19.7275C143.894 19.719 149.47 29.2513 149.487 41.0227C149.504 52.7942 143.956 62.3547 137.095 62.3547L136.925 62.3547L135.129 62.3745L135.127 61.3695Z"
          fill="white"
        />
        <path
          d="M118.41 70.0663L82.3096 74.4368C64.2317 76.6081 45.8315 72.4659 30.8423 62.1515C30.2131 61.7185 29.5885 61.2771 28.9687 60.8272L2.01135 41.2232L28.9093 21.543C29.5282 21.0912 30.15 20.648 30.7802 20.2131C45.758 9.86479 64.1271 5.65486 82.2136 7.78947L118.201 12.0288M127.363 68.9299C135.116 66.6025 140.995 54.9836 140.975 41.0228C140.955 27.6152 135.501 16.3821 128.196 13.4704"
          stroke="white"
          strokeWidth="2"
          strokeMiterlimit="10"
        />
        <path
          d="M28.898 21.5487L2 41.2289L28.9573 60.8329C29.1071 60.943 29.2625 61.0447 29.4123 61.1548C33.8661 57.7496 36.9662 50.0864 36.9521 41.1781C36.938 32.2698 33.8181 24.6179 29.3558 21.2268C29.2032 21.3341 29.0506 21.4386 28.898 21.5487Z"
          stroke="url(#paint1_linear_665_267)"
          strokeWidth="2"
          strokeMiterlimit="10"
        />
        <path
          d="M28.898 21.5487L2 41.2289L28.9573 60.8329C29.1071 60.943 29.2625 61.0447 29.4123 61.1548C33.8661 57.7496 36.9662 50.0864 36.9521 41.1781C36.938 32.2698 33.8181 24.6179 29.3558 21.2268C29.2032 21.3341 29.0506 21.4386 28.898 21.5487Z"
          fill="url(#paint2_linear_665_267)"
          stroke="white"
          strokeWidth="2"
          strokeMiterlimit="10"
        />
        <path
          d="M135.998 62.0189L164.609 76.8906L162.831 79.9089L150.727 79.9287C148.87 79.9046 147.027 79.5893 145.267 78.9941L121.554 71.283C116.451 69.6227 111.711 66.0199 109.403 62.0528L111.152 59.153L135.998 62.0189Z"
          stroke="white"
          strokeWidth="2"
          strokeMiterlimit="10"
        />
        <path
          d="M137.776 58.9974L164.609 76.8903L152.505 76.9072C150.647 76.8831 148.805 76.5678 147.045 75.9726L123.332 68.2615C118.228 66.6012 113.489 63.0012 111.18 59.0341L137.776 58.9974Z"
          fill="white"
        />
        <path
          d="M135.936 20.0523L164.504 5.08747L162.718 2.06625L150.603 2.09448C148.745 2.12525 146.904 2.44631 145.146 3.04602L121.464 10.8193C116.377 12.4937 111.638 16.1078 109.349 20.0806L111.107 22.9775L135.936 20.0523Z"
          stroke="white"
          strokeWidth="2"
          strokeMiterlimit="10"
        />
        <path
          d="M137.722 23.065L164.504 5.09299L152.397 5.10995C150.541 5.14027 148.7 5.46135 146.943 6.06149L123.253 13.8404C118.152 15.5148 113.424 19.1317 111.135 23.1045L137.722 23.065Z"
          fill="white"
        />
        <defs>
          <linearGradient
            id="paint0_linear_665_267"
            x1="150.448"
            y1="49.9424"
            x2="150.448"
            y2="32.0946"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#079D7C" />
            <stop offset="1" stopColor="#079D7C" stopOpacity="0" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_665_267"
            x1="15.0336"
            y1="55.5331"
            x2="28.9902"
            y2="20.9022"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#5277F7" />
            <stop offset="0.04" stopColor="#547EF8" />
            <stop offset="0.09" stopColor="#5993FA" />
            <stop offset="0.15" stopColor="#60B4FD" />
            <stop offset="0.19" stopColor="#66CCFF" />
            <stop offset="0.34" stopColor="#5277F7" />
            <stop offset="0.62" stopColor="#5A99FA" />
            <stop offset="0.85" stopColor="#5FAEFC" />
            <stop offset="1" stopColor="#61B6FD" />
          </linearGradient>
          <linearGradient
            id="paint2_linear_665_267"
            x1="19.4761"
            y1="61.1548"
            x2="19.4761"
            y2="21.2268"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#079D7C" stopOpacity="0" />
            <stop offset="1" stopColor="#079D7C" />
          </linearGradient>
        </defs>
      </svg>
    </Box>
  )
}
