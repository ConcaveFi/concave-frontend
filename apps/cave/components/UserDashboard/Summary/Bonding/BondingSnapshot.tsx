import { ChevronRightIcon } from '@concave/icons'
import { Button, Flex } from '@concave/ui'
import { useBondSpotPrice, useRoi } from 'components/Bond/BondInfo'
import { ComingSoom } from 'components/ComingSoon'
import { ToggleContentButton } from 'components/ToggleContentButton'
import { DataTable } from 'components/UserDashboard/DataTable'
import { SnapshotLineChart } from 'components/UserDashboard/SnapshotLineChart'
import { SnapshotTextCard } from 'components/UserDashboard/SnapshotTextCard'
import { useCNVPrice } from 'hooks/useCNVPrice'
import router from 'next/router'
import { useState } from 'react'
import { compactFormat } from 'utils/bigNumberMask'
import { DataTableCard } from '../../DataTableCard'
import { useUserBondState } from '../../hooks/useUserBondState'
import { SnapshotCard } from '../../SnapshotCard'
import { SnapshotText } from '../../SnapshotText'
import { bondchartdata } from '../dummyChartData'
import { BondPositionCardMemo } from './BondPositionCard'

export const BondingSnapshot = () => {
  const [isExpanded, setExpand] = useState(false)
  const userBondState = useUserBondState()
  const bondSpotPrice = useBondSpotPrice()
  const roi = useRoi(bondSpotPrice)
  const cnvPrice = useCNVPrice()

  return (
    <Flex flexDir={'column'} w={'100%'} h="100%" gap={4}>
      <SnapshotCard show={!isExpanded}>
        <ComingSoom>
          <SnapshotLineChart data={bondchartdata} dataKeys={['CNV Price', 'Bond Price']} />
        </ComingSoom>
        <SnapshotTextCard>
          <SnapshotText
            title={'Current Bond Price'}
            data={`${(+bondSpotPrice.data || 0).toFixed(2)} USD`}
          />
          <SnapshotText
            title={'CNV Market Price'}
            data={`${(cnvPrice.price || 0).toFixed(2)} USD`}
          />
          <SnapshotText title={'Current ROI'} data={roi.data?.toFixed(2) + '%'} />
          <SnapshotText
            title={'CNV Bonding'}
            data={`${compactFormat(userBondState.data?.bonding)} CNV`}
          />
          <SnapshotText
            title={'CNV Owed'}
            data={`${compactFormat(userBondState.data?.owed)} CNV`}
          />
        </SnapshotTextCard>
      </SnapshotCard>
      <DataTableCard
        dataTableOptions={
          <Flex gap={{ base: 2, sm: 4 }} w={'full'}>
            <ToggleContentButton handle={setExpand} isExpanded={isExpanded} />
          </Flex>
        }
        isLoading={userBondState.isLoading}
        hasPositions={userBondState.data?.positions.length}
      >
        <DataTable>
          {userBondState.data?.positions.map((position, i) => (
            <BondPositionCardMemo key={i} {...position} />
          ))}
        </DataTable>
      </DataTableCard>
    </Flex>
  )
}
