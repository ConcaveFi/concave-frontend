import { Flex, Text, useBreakpoint, useBreakpointValue } from '@chakra-ui/react'
import { Card } from '@concave/ui'

type BondGraphicCardProps = { src: string }
export const BondGraphicCard = ({ src }: BondGraphicCardProps) => {
  return (
    <Card
      fontWeight={'bold'}
      variant="secondary"
      w={{ base: '340px', md: '510px', lg: '380px', xl: '430px' }}
      p={4}
      h="300px"
    >
      <Flex src={src} w="full" h={'full'} as={'iframe'} rounded={'2xl'} overflow="hidden"></Flex>
    </Card>
  )
}

export const BondGraphics = () => (
  <Flex direction={'column'} gap={6}>
    <Flex gap={6} direction={{ base: 'column', lg: 'row' }}>
      <BondGraphicCard src="https://dune.com/embeds/975759/1690284/f4220aa1-790a-4bbd-8802-34c47074f282" />
      <BondGraphicCard src="https://dune.com/embeds/975856/1690504/31383fa2-2c2d-4fbd-a96b-4fe4a3ece9c3" />
    </Flex>
    <Flex gap={6} direction={{ base: 'column', lg: 'row' }}>
      <BondGraphicCard src="https://dune.com/embeds/975956/1690648/39547f93-eb48-4ed3-8dfd-fcb14390d86b" />
      <BondGraphicCard src="https://dune.com/embeds/975834/1690395/9eea0cf9-b4c9-4534-9670-3ae0af658420" />
    </Flex>
  </Flex>
)
