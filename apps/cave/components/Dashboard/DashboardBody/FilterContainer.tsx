import { Flex, useBreakpointValue } from '@concave/ui'
import { MetalBox } from 'components/MetalBox'

interface FilterContainerProps {}

export function FilterContainer(props: FilterContainerProps) {
  const mobileUI = useBreakpointValue({ base: true, md: false })
  return (
    <MetalBox
      height={'75px'}
      width="full"
      justify={'center'}
      align="center"
      shadow={mobileUI ? 'up' : 'none'}
      disableMetal={!mobileUI}
      bgVariant={mobileUI ? 'dark' : 'empty'}
      my={2}
    >
      <Flex transform={{ base: 'scale(0.8)', md: 'scale(1)' }} gap={0}></Flex>
    </MetalBox>
  )
}
