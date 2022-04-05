import { Icon, IconProps } from '@chakra-ui/icons'

export const CnvQuestionIcon = (props: IconProps) => (
  <Icon viewBox="0 0 16 16" {...props}>
    <circle cx="8" cy="8" r="7.5" fillOpacity="0.01" stroke="url(#b)" />
    <path
      d="M7.217 9.787h1.23v-.11c0-1.81 1.82-1.41 1.82-3.31 0-1.26-.96-2.1-2.32-2.1-1.28 0-2.05.66-2.29 1.63l1.29.43c.11-.48.46-.85.98-.85.57 0 .93.37.93.87 0 1.19-1.64.9-1.64 3.33v.11Zm-.07 1.88h1.37v-1.37h-1.37v1.37Z"
      fill="url(#c)"
    />

    <defs>
      <linearGradient id="b" x1="0" y1="8.258" x2="16" y2="8.258" gradientUnits="userSpaceOnUse">
        <stop stopColor="#72639B" />
        <stop offset="1" stopColor="#44B9DE" />
      </linearGradient>
      <linearGradient
        id="c"
        x1="2.667"
        y1="7.714"
        x2="13.333"
        y2="7.714"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#72639B" />
        <stop offset="1" stopColor="#44B9DE" />
      </linearGradient>
      <filter
        id="a"
        x="0"
        y="0"
        width="16"
        height="17"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feColorMatrix
          in="SourceAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.33 0" />
        <feBlend in2="shape" result="effect1_innerShadow_1478_3966" />
      </filter>
    </defs>
  </Icon>
)
