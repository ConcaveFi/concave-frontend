import { Flex, FlexProps } from '@concave/ui'

export const InputContainer = (props: FlexProps) => (
  <Flex
    mx={-5}
    px={5}
    py={3}
    borderRadius="2xl"
    bgGradient="linear(to-tr, secondary.150, secondary.100)"
    {...props}
  />
)
