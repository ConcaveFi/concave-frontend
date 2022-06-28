import { Flex } from '@chakra-ui/react'
import { BondGraphicCard } from './BondGraphicCard'

export const BondGraphics = () => {
  return (
    <Flex direction={'column'} width="full" gap="6" mt={6}>
      <Flex justify={'space-between'}>
        <BondGraphicCard
          src="https://dune.com/embeds/870572/1517430/1d989b49-6f5a-412d-bbab-53949231f413"
          title="Cumlative DAI bonded"
        />
        <BondGraphicCard
          src="https://dune.com/embeds/870572/1517448/63a0892d-450b-4f95-83b2-1cd879ae55b9"
          title="Cumlative CNV bonded"
        />
      </Flex>
      <Flex justify={'space-between'}>
        <BondGraphicCard
          src="https://dune.com/embeds/870572/1517380/0a732574-e53d-4e97-8241-770ae7bbbf2b"
          title="DAI bonded events"
        />
        <BondGraphicCard
          src="https://dune.com/embeds/870572/1517536/2850cf66-1cf1-447e-b46f-878ab1ae7acd"
          title="CNV bonded events"
        />
      </Flex>
    </Flex>
  )
}
