import { Icon, IconProps } from '@chakra-ui/icons'

export const LinesIcon = (props: IconProps) => (
  <Icon width="4" height="4" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect width="12" height="2.25" rx="1.125" fill="#5F7A99" />
    <rect x="4.5" y="4.5" width="7.5" height="2.25" rx="1.125" fill="#5F7A99" />
    <rect x="7.5" y="9" width="4.5" height="2.25" rx="1.125" fill="#5F7A99" />
  </Icon>
)
