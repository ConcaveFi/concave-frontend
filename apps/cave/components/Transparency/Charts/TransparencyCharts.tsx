import { Flex } from '@concave/ui'
import { ACNVChart } from './ACNVChart'
import { BbtCNVChart } from './BbtCNVChart'
import { DuneChartCard } from './DuneChartCard'
import { LockedCNVChart } from './LockedCNVChart'
import { LockedCNVSeriesChart } from './LockedCNVSeriesChart'
import { PoolIdChart } from './PoolIdChart'

export default function TransparencyCharts() {
  return (
    <Flex w={'inherit'} direction={'column'} gap={6}>
      <Flex gap={6} direction={{ base: 'column', lg: 'row' }}>
        <LockedCNVChart />
        <LockedCNVSeriesChart />
        <PoolIdChart />
      </Flex>
      <Flex gap={6} direction={{ base: 'column', lg: 'row' }}>
        <ACNVChart />
        <BbtCNVChart />
      </Flex>
      <Flex gap={6} direction={{ base: 'column', lg: 'row' }}>
        <DuneChartCard src="https://dune.com/embeds/975759/1690284/f4220aa1-790a-4bbd-8802-34c47074f282" />
        <DuneChartCard src="https://dune.com/embeds/975856/1690504/31383fa2-2c2d-4fbd-a96b-4fe4a3ece9c3" />
      </Flex>
      <Flex gap={6} direction={{ base: 'column', lg: 'row' }}>
        <DuneChartCard src="https://dune.com/embeds/975956/1690648/39547f93-eb48-4ed3-8dfd-fcb14390d86b" />
        <DuneChartCard src="https://dune.com/embeds/975834/1690395/9eea0cf9-b4c9-4534-9670-3ae0af658420" />
      </Flex>
    </Flex>
  )
}
