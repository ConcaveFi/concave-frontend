import { Icon, IconProps } from '@chakra-ui/icons'

export const PlusIcon = (props: IconProps) => (
  <Icon viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.1 1a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v5h-5a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h5v5a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-5h5a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-5V1Z"
      fill="url(#a)"
    />
    <defs>
      <linearGradient id="a" x1="8.1" y1="16" x2="8.1" y2="0" gradientUnits="userSpaceOnUse">
        <stop stopColor="#536090" />
        <stop offset="1" stopColor="#62749C" />
      </linearGradient>
    </defs>
  </Icon>
)
