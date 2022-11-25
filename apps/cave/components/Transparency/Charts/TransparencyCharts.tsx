import { Flex } from '@concave/ui'
import { ACNVChart } from './ACNVChart'
import { BbtCNVChart } from './BbtCNVChart'
import { LockedCNVChart } from './LockedCNVChart'
import { LockedCNVSeriesChart } from './LockedCNVSeriesChart'
import { LsdCNVHoldersChart } from './LsdCNVUniqueHolders'
import { StakePoolEngagementChart } from './StakePoolEngagementChart'


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
        <StakePoolEngagementChart isMobile={isMobile} />

      </Flex>
      <Flex gap={6} direction={style.groupDirection}>
        <ACNVChart fontSize={style.textChartFontSize} />
        <BbtCNVChart />
      </Flex>
    </Flex>
  )
}
