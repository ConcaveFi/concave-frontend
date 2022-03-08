import { Flex, FlexProps } from '@concave/ui'

export const InputContainer = (props: FlexProps) => (
  <Flex
    mx={-5}
    px={5}
    py={3}
    maxW={400}
    h={90}
    borderRadius="2xl"
    bgGradient="linear(to-tr, secondary.150, secondary.100)"
    align="start"
    {...props}
  />
)
