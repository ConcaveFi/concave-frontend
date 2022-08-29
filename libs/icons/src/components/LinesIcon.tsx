import { Icon, IconProps } from '@chakra-ui/icons'

export const LinesIcon = (props: IconProps) => (
  <Icon fill="#5F7A99" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect width="20" height="4.5" rx="1.125" />
    <rect x="8" y="9" width="12" height="5" rx="1.125" />
    <rect x="14" y="18" width="6" height="5" rx="1.125" />
  </Icon>
)
