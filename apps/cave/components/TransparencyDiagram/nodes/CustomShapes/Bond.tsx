import { Box } from '@concave/ui'
import { Handle, Position } from 'react-flow-renderer'
import { sharedNodeContainerStyle, sharedNodeHandleStyle } from '../../styles'
import { NodeDisplayData, ShapeLabelSettingsType } from '../../types'
import { NodeText } from '../NodeText'

export function Bond({ data }: { data: NodeDisplayData }) {
  const shapeSettings: ShapeLabelSettingsType = {
    labelBottom: '-50px',
  }

  return (
    <Box sx={{ ...sharedNodeContainerStyle }}>
      <Handle
        type="target"
        position={Position.Top}
        id="topTarget"
        style={{ ...sharedNodeHandleStyle, top: -16 }}
      />
      <Handle
        type="source"
        position={Position.Top}
        id="topSource"
        style={{ ...sharedNodeHandleStyle, top: -16 }}
      />
      <Handle
        type="target"
        position={Position.Bottom}
        id="bottomTarget"
        style={{ ...sharedNodeHandleStyle, bottom: -66 }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottomSource"
        style={{ ...sharedNodeHandleStyle, bottom: -66 }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="rightSource"
        style={{ ...sharedNodeHandleStyle, right: -16 }}
      />
      <Handle
        type="target"
        position={Position.Right}
        id="rightTarget"
        style={{ ...sharedNodeHandleStyle, right: -16 }}
      />
      <Handle
        type="source"
        position={Position.Left}
        id="leftSource"
        style={{ ...sharedNodeHandleStyle, left: -16 }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="leftTarget"
        style={{ ...sharedNodeHandleStyle, left: -16 }}
      />
      <NodeText data={data} shapeSettings={shapeSettings} />
      <svg
        width="210"
        height="122"
        viewBox="0 0 210 122"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M70.2803 50.2681C70.2518 45.1496 66.8418 40.0311 60.0549 36.1262C46.4833 28.3154 24.55 28.3154 11.0652 36.1262C4.32332 40.0311 0.970524 45.1496 1.00019 50.2681C1.01828 52.0138 1.40861 53.7358 2.14527 55.3198C2.96506 57.1161 4.22332 58.861 5.92115 60.4963C7.36952 61.8929 9.13768 63.2084 11.2256 64.4099C24.7973 72.2208 46.7305 72.2208 60.2154 64.4099C62.2901 63.2051 64.0429 61.8907 65.4759 60.4952C67.1155 58.8982 68.3331 57.1961 69.1353 55.4435C69.8822 53.8421 70.2732 52.0987 70.2814 50.3327C70.2814 50.3097 70.2814 50.29 70.2803 50.2681Z"
          fill="url(#paint0_linear_665_195)"
          stroke="white"
          strokeWidth="2"
          strokeMiterlimit="10"
        />
        <path
          d="M147.915 21C147.886 15.8815 144.476 10.763 137.689 6.85813C124.118 -0.952709 102.184 -0.952709 88.6997 6.85813C81.9578 10.763 78.605 15.8815 78.6347 21C78.6528 22.7458 79.0431 24.4677 79.7798 26.0517C80.5996 27.848 81.8578 29.5929 83.5557 31.2282C85.004 32.6248 86.7722 33.9403 88.8601 35.1419C102.432 42.9527 124.365 42.9527 137.85 35.1419C139.925 33.937 141.677 32.6226 143.11 31.2271C144.75 29.6301 145.968 27.928 146.77 26.1755C147.517 24.574 147.908 22.8306 147.916 21.0646C147.916 21.0416 147.916 21.0219 147.915 21Z"
          stroke="white"
          strokeWidth="2"
          strokeMiterlimit="10"
        />
        <path
          d="M208.352 50.2681C208.323 45.1496 204.913 40.0311 198.126 36.1262C184.555 28.3154 162.621 28.3154 149.137 36.1262C142.395 40.0311 139.042 45.1496 139.072 50.2681C139.09 52.0138 139.48 53.7358 140.217 55.3198C141.037 57.1161 142.295 58.861 143.993 60.4963C145.441 61.8929 147.209 63.2084 149.297 64.4099C162.869 72.2208 184.802 72.2208 198.287 64.4099C200.362 63.2051 202.114 61.8907 203.547 60.4952C205.187 58.8982 206.405 57.1961 207.207 55.4435C207.954 53.8421 208.345 52.0987 208.353 50.3327C208.353 50.3097 208.353 50.29 208.352 50.2681Z"
          fill="url(#paint1_linear_665_195)"
          stroke="white"
          strokeWidth="2"
          strokeMiterlimit="10"
        />
        <path
          d="M208.353 50.3338L208.353 60.5016C208.383 65.6228 205.03 70.7439 198.288 74.6508C184.803 82.4657 162.87 82.4657 149.298 74.6508C142.51 70.7439 139.096 65.6228 139.072 60.5016C139.072 60.4797 139.072 60.4578 139.072 60.4359L139.072 50.2681C139.09 52.0147 139.48 53.7376 140.217 55.3224C141.036 57.1197 142.295 58.8654 143.992 60.5016C145.441 61.8989 147.209 63.2151 149.297 64.4173C162.869 72.2322 184.802 72.2322 198.287 64.4173C200.361 63.2118 202.114 61.8967 203.547 60.5005C205.187 58.9027 206.404 57.1997 207.207 55.4462C207.953 53.8443 208.344 52.1004 208.353 50.3338V50.3338Z"
          stroke="white"
          strokeWidth="2"
          strokeMiterlimit="10"
        />
        <path
          d="M70.2812 50.3338L70.2812 60.5016C70.312 65.6228 66.9581 70.7439 60.2162 74.6508C46.7314 82.4657 24.7982 82.4657 11.2265 74.6508C4.43851 70.7439 1.02418 65.6228 1 60.5016C1 60.4797 1 60.4578 1 60.4359L1 50.2681C1.01809 52.0147 1.40841 53.7376 2.14507 55.3224C2.96487 57.1197 4.22312 58.8654 5.92095 60.5016C7.36932 61.8989 9.13748 63.2151 11.2254 64.4173C24.7971 72.2322 46.7303 72.2322 60.2151 64.4173C62.2899 63.2118 64.0427 61.8967 65.4757 60.5005C67.1152 58.9027 68.3328 57.1997 69.1351 55.4462C69.8819 53.8443 70.2728 52.1004 70.2812 50.3338V50.3338Z"
          stroke="white"
          strokeWidth="2"
          strokeMiterlimit="10"
        />
        <path
          d="M130.717 101C130.689 95.8815 127.279 90.763 120.492 86.8581C106.92 79.0473 84.987 79.0473 71.5022 86.8581C64.7603 90.763 61.4075 95.8815 61.4372 101C61.4553 102.746 61.8456 104.468 62.5823 106.052C63.4021 107.848 64.6603 109.593 66.3581 111.228C67.8065 112.625 69.5747 113.94 71.6626 115.142C85.2342 122.953 107.168 122.953 120.652 115.142C122.727 113.937 124.48 112.623 125.913 111.227C127.552 109.63 128.77 107.928 129.572 106.175C130.319 104.574 130.71 102.831 130.718 101.065C130.718 101.042 130.718 101.022 130.717 101Z"
          stroke="white"
          strokeWidth="2"
          strokeMiterlimit="10"
        />
        <path
          d="M68.5617 44.1709L86.4573 33.8051M86.4573 33.8051L74.117 33.8051M86.4573 33.8051L86.4573 40.8782"
          stroke="white"
          strokeWidth="2"
        />
        <path
          d="M147.425 73.4388L122.639 87.7071M122.639 87.7071L134.98 87.7071M122.639 87.7071L122.639 80.6339"
          stroke="white"
          strokeWidth="2"
        />
        <defs>
          <linearGradient
            id="paint0_linear_665_195"
            x1="0.999999"
            y1="70.2681"
            x2="70.0264"
            y2="29.8327"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#6D25B6" />
            <stop offset="1" stopColor="#6D25B6" stopOpacity="0" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_665_195"
            x1="139.072"
            y1="70.2681"
            x2="208.098"
            y2="29.8327"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#6D25B6" />
            <stop offset="1" stopColor="#6D25B6" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </Box>
  )
}
