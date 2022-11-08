import { Flex } from '@concave/ui'
import { ACNVChart } from './ACNVChart'
import { BbtCNVChart } from './BbtCNVChart'
import { DuneChartCard } from './DuneChartCard'
import { LockedCNVChart } from './LockedCNVChart'
import { LockedCNVSeriesChart } from './LockedCNVSeriesChart'
import { LsdCNVHoldersChart } from './LsdCNVUniqueHolders'
import { PoolIdChart } from './PoolIdChart'

export default function TransparencyCharts({ isMobile }: { isMobile: boolean }) {
  let style
  if (isMobile) {
    style = {
      groupDirection: 'column',
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
      groupDirection: 'row',
      textChartFontSize: '6xl',
      lockedCnv: {
        width: '60%',
      },
      lsdCnv: {
        width: '50%',
      },
    }
  }

  return (
    <Flex w={'100%'} direction={'column'} gap={6}>
      <Flex gap={6} direction={style.groupDirection}>
        <LockedCNVChart width={style.lockedCnv.width} fontSize={style.textChartFontSize} />
        <LockedCNVSeriesChart />
        <LsdCNVHoldersChart width={style.lsdCnv.width} fontSize={style.textChartFontSize} />
      </Flex>
      <Flex gap={6} direction={style.groupDirection}>
        <PoolIdChart />
        <DuneChartCard src="https://dune.com/embeds/975956/1690648/39547f93-eb48-4ed3-8dfd-fcb14390d86b" />
      </Flex>
      <Flex gap={6} direction={style.groupDirection}>
        <ACNVChart fontSize={style.textChartFontSize} />
        <BbtCNVChart />
      </Flex>
    </Flex>
  )
}
