// import { Token } from '@concave/gemswap-sdk'
import { Card, Collapse, Container, Flex, Heading, Image, Spinner, Stack, Text } from '@concave/ui'
import DividendsCard from 'components/Treasury/DividendsCard'
import TreasuryManagementCard from 'components/Treasury/TreasuryManagementCard'
import TreasuryRedeemCard from 'components/Treasury/TreasuryRedeemCard'
import TreasuryRevenueCard from 'components/Treasury/TreasuryRevenueCard'
// import { useLiquidityInfo } from 'hooks/useLiquidityInfo'
// import { fetchPortfolio } from 'lib/debank'
// import { useState } from 'react'
// import { useQuery } from 'react-query'
// import { chain } from 'wagmi'
import { useGet_TreasuryQuery, useGet_Amm_Cnv_InfosQuery } from 'graphql/generated/graphql'

export default function Treasury() {
  const { status: treaStatus, data: treaData } = useGet_TreasuryQuery()
  const { status: cnvStatus, data: cnvData } = useGet_Amm_Cnv_InfosQuery()

  return (
    <Flex height={'full'} width="full" align={'center'} justify="center" position={'relative'}>
      <Flex direction={'column'} maxWidth={'900px'} height="" gap={6}>
        <Flex direction="row" width={'full'} justify={'space-around'}>
          {treaStatus === 'success' && cnvStatus === 'success' && cnvData && treaData && (
            <TreasuryRevenueCard cnv={cnvData} treasury={treaData} />
          )}
          <TreasuryRedeemCard />
        </Flex>
        {/* for treasury assets  */}
        {cnvStatus === 'success' && cnvData && <TreasuryManagementCard assets={treaData} />}
        <DividendsCard />
      </Flex>
    </Flex>
  )
}
