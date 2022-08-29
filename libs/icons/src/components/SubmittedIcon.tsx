import { Icon, IconProps } from '@chakra-ui/icons'

export const SubmittedIcon = (props: IconProps) => (
  <Icon width="16" height="16" viewBox="0 0 56 56" fill="none" {...props}>
    <path
      d="M55 1H9a8 8 0 0 0-8 8v46l5.304-4.752L11.607 55l5.304-4.752L22.214 55l5.304-4.752L32.82 55l5.304-4.752L43.429 55V9a8 8 0 0 1 8-8h.678"
      stroke="url(#linearGradientSubmitted)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 16h15.5M6 24h32M6 32h32M6 40h32"
      stroke="url(#b)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <linearGradient
        id="linearGradientSubmitted"
        x1="1.791"
        y1="55"
        x2="52.355"
        y2="-1.373"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#53399B" />
        <stop offset=".378" stopColor="#7DE0FF" />
        <stop offset=".727" stopColor="#504179" />
        <stop offset="1" stopColor="#84E2FF" />
      </linearGradient>
      <linearGradient id="b" x1="6" y1="28.387" x2="38" y2="28.387" gradientUnits="userSpaceOnUse">
        <stop stopColor="#72639B" />
        <stop offset="1" stopColor="#44B9DE" />
      </linearGradient>
    </defs>
  </Icon>
)
