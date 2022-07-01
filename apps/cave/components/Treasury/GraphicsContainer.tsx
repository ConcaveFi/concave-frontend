import { Flex } from '@chakra-ui/react'
import { BondGraphicCard } from './GraphicCard'

export const BondGraphics = () => {
  return (
    <Flex direction={'column'} width="full" gap="6" mt={6}>
      <Flex
        direction={{ base: 'column', xl: 'row' }}
        justify={'space-between'}
        gap={{ base: 6, xl: 0 }}
      >
        <BondGraphicCard
          src="https://dune.com/embeds/975759/1690284/f4220aa1-790a-4bbd-8802-34c47074f282"
          // src="https://dune.com/embeds/870572/1517430/1d989b49-6f5a-412d-bbab-53949231f413"
          title="Cumlative DAI bonded"
        />
        <BondGraphicCard
          src="https://dune.com/embeds/975856/1690504/31383fa2-2c2d-4fbd-a96b-4fe4a3ece9c3"
          // src="https://dune.com/embeds/870572/1517448/63a0892d-450b-4f95-83b2-1cd879ae55b9"
          title="Cumlative CNV bonded"
        />
      </Flex>
      <Flex
        direction={{ base: 'column', xl: 'row' }}
        justify={'space-between'}
        gap={{ base: 6, xl: 0 }}
      >
        <BondGraphicCard
          src="https://dune.com/embeds/975956/1690648/39547f93-eb48-4ed3-8dfd-fcb14390d86b"
          // src="https://dune.com/embeds/870572/1517380/0a732574-e53d-4e97-8241-770ae7bbbf2b"
          title="DAI bond events"
        />
        <BondGraphicCard
          src="https://dune.com/embeds/975834/1690395/9eea0cf9-b4c9-4534-9670-3ae0af658420"
          // src="https://dune.com/embeds/870572/1517536/2850cf66-1cf1-447e-b46f-878ab1ae7acd"
          title="CNV bond events"
        />
      </Flex>
    </Flex>
  )
}
