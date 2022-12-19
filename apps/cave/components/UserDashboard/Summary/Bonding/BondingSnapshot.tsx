import { Flex, Spinner } from '@concave/ui'
import { useBondSpotPrice, useRoi } from 'components/Bond/BondInfo'
import { DataTable } from 'components/UserDashboard/DataTable'
import { SnapshotLineChart } from 'components/UserDashboard/SnapshotLineChart'
import { SnapshotTextCard } from 'components/UserDashboard/SnapshotTextCard'
import { useCNVPrice } from 'hooks/useCNVPrice'
import { useState } from 'react'
import { DataTableCard } from '../../DataTableCard'
import { useUserBondState } from '../../hooks/useUserBondState'
import { SnapshotCard } from '../../SnapshotCard'
import { SnapshotText } from '../../SnapshotText'
import { bondchartdata } from '../dummyChartData'
import { BondPositionCard } from './BondPositionCard'

export const BondingSnapshot = () => {
  const [isExpanded, setExpand] = useState(false)
  const userBondState = useUserBondState()
  const bondSpotPrice = useBondSpotPrice()
  const roi = useRoi(bondSpotPrice)
  const cnvPrice = useCNVPrice()

  return (
    <>
      <SnapshotCard isExpanded={!isExpanded}>
        <SnapshotLineChart data={bondchartdata} dataKeys={['CNV Price', 'Bond Price']} />
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
          <SnapshotText title={'CNV Bonding'} data={`${+userBondState.data?.totalPending} CNV`} />
          <SnapshotText title={'CNV Owed'} data={`${+userBondState.data?.totalOwed} CNV`} />
          <Flex
            userSelect={'none'}
            justifyContent={'center'}
            alignItems={'center'}
            alignSelf={'center'}
            height={'50px'}
            width={'145px'}
            shadow={'down'}
            borderRadius={'3xl'}
            cursor={'not-allowed'}
          >
            Redeem All
          </Flex>
        </SnapshotTextCard>
      </SnapshotCard>
      <Flex flexDir={'column'} w={'100%'} justifyContent={'space-between'}>
        <DataTableCard
          dataTableLabel={'Bonding Positions'}
          route={'/smart-bonding'}
          buttonLabel={'Dynamic Bonds'}
          setExpand={setExpand}
          isExpanded={isExpanded}
        >
          {userBondState.isLoading ? (
            <Spinner />
          ) : (
            <DataTable>
              {userBondState.data?.positions.map((position, i) => (
                <BondPositionCard key={i} {...position} />
              ))}
            </DataTable>
          )}
        </DataTableCard>
      </Flex>
    </>
  )
}
