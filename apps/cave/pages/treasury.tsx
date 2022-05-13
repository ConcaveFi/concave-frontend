// import { Token } from '@concave/gemswap-sdk'
import {
  Card,
  Collapse,
  Container,
  Flex,
  Heading,
  Image,
  ScaleFade,
  Spinner,
  Stack,
  Text,
} from '@concave/ui'
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

  const revenueCardLoaded =
    treaStatus === 'success' && cnvStatus === 'success' && cnvData && !!treaData

  return (
    <Flex height={'full'} width="full" align={'center'} justify="center" position={'relative'}>
      <Flex direction={'column'} maxWidth={'900px'} height="">
        <Flex direction="row" width={'full'} justify={'space-around'}>
          <ScaleFade in={revenueCardLoaded}>
            {treaStatus === 'success' && cnvStatus === 'success' && cnvData && treaData && (
              <TreasuryRevenueCard cnv={cnvData} treasury={treaData} />
            )}
          </ScaleFade>
          <LoadingState mr={6} my={0} width={'630px'} isLoading={!revenueCardLoaded} />
          <TreasuryRedeemCard />
        </Flex>
        {/* for treasury assets  */}
        <ScaleFade in={revenueCardLoaded}>
          {cnvStatus === 'success' && cnvData && <TreasuryManagementCard assets={treaData} />}
        </ScaleFade>
        <LoadingState width={'900px'} isLoading={!revenueCardLoaded} my={6} />
        <DividendsCard />
      </Flex>
    </Flex>
  )
}

const LoadingState = (props) => {
  return (
    <ScaleFade in={props.isLoading}>
      <Card
        mr={props.mr}
        my={props.my}
        display={props.isLoading ? 'flex' : 'none'}
        width={props.width}
        height="330px"
        justify={'center'}
        align="center"
      >
        <Text fontSize={'4xl'} fontWeight="700">
          Is Loading...
        </Text>
      </Card>
    </ScaleFade>
  )
}
