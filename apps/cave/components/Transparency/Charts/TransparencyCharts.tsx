import { Flex, useBreakpointValue } from '@concave/ui'
import { ACNVChart } from './ACNVChart'
import { BbtCNVChart } from './BbtCNVChart'
import { DuneChartCard } from './DuneChartCard'
import { LockedCNVChart } from './LockedCNVChart'
import { LockedCNVSeriesChart } from './LockedCNVSeriesChart'
import { LsdCNVHoldersChart } from './LsdCNVUniqueHolders'
import { PoolIdChart } from './PoolIdChart'

export default function TransparencyCharts() {
  const isMobile = useBreakpointValue({ base: true, md: false })

  let style
  if (isMobile) {
    style = {
      textChartFontSize: '7xl',
      lockedCnv: {
        width: 'full',
      },
      lsdCnv: {
        width: 'full',
      },
    }
  } else {
    style = {
      textChartFontSize: '7xl',
      lockedCnv: {
        width: '60%',
      },
      lsdCnv: {
        width: '50%',
      },
    }
  }

  return (
    <Flex w={'inherit'} direction={'column'} gap={6}>
      <Flex gap={6} direction={{ base: 'column', lg: 'row' }}>
        <LockedCNVChart width={style.lockedCnv.width} fontSize={style.textChartFontSize} />
        <LockedCNVSeriesChart />
        <LsdCNVHoldersChart width={style.lsdCnv.width} fontSize={style.textChartFontSize} />
      </Flex>
      <Flex gap={6} direction={{ base: 'column', lg: 'row' }}>
        <PoolIdChart />
        <DuneChartCard src="https://dune.com/embeds/975956/1690648/39547f93-eb48-4ed3-8dfd-fcb14390d86b" />
      </Flex>
      <Flex gap={6} direction={{ base: 'column', lg: 'row' }}>
        <ACNVChart fontSize={style.textChartFontSize} />
        <BbtCNVChart />
      </Flex>
    </Flex>
  )
}
