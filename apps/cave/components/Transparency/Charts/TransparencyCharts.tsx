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
        <DuneChartCard src="https://dune.com/embeds/975956/1690648/39547f93-eb48-4ed3-8dfd-fcb14390d86b" />
      </Flex>
    </Flex>
  )
}
