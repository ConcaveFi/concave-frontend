import { Icon, IconProps } from '@chakra-ui/icons'

export const SpinIcon = (props: IconProps) => (
  <Icon width="16" height="16" viewBox="0 0 64 64" fill="none" {...props}>
    <path
      d="M63 32A31 31 0 1 1 26.837 1.433"
      stroke="url(#a)"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <defs>
      <linearGradient
        id="a"
        x1=".937"
        y1="64"
        x2="60.865"
        y2="-2.812"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#53399B" />
        <stop offset=".378" stopColor="#7DE0FF" />
        <stop offset=".727" stopColor="#504179" />
        <stop offset="1" stopColor="#84E2FF" />
      </linearGradient>
    </defs>
  </Icon>
)
