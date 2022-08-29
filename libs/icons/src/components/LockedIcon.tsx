import { Icon, IconProps } from '@chakra-ui/icons'

export const LockedIcon = (props: IconProps) => (
  <Icon viewBox="0 0 17 20" {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" fill="none">
      <path
        clipRule="evenodd"
        d="M13 19H3c-1.105 0-2-.895-2-2v-7c0-1.105.895-2 2-2h10c1.105 0 2 .895 2 2v7c0 1.105-.895 2-2 2Z"
        stroke="#2E97E2"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 8V5v0c0-2.209 1.791-4 4-4v0c2.209 0 4 1.791 4 4v3"
        stroke="#2E97E2"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </Icon>
)
