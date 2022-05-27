import { SpinIcon } from '@concave/icons'
import { Box, Card, Flex, Text } from '@concave/ui'
import { purchaseBond } from 'components/Bond/BondState'
import { formatDistanceStrict } from 'date-fns'
import { commify } from 'ethers/lib/utils'
import { useGet_Accrualbondv1_Last10_SoldQuery } from 'graphql/generated/graphql'
import { useEffect, useState } from 'react'
import { GlassPanel } from '../TreasuryManagementCard'
import { spinAnimation } from './TreasuryManagementMobile'

export default function TreasuryRevenueMobile({
  loading,
  cnv,
  treasury,
}: {
  loading: boolean
  cnv: any
  treasury: any
}) {
  // get total Treasury
  const sumTotal = treasury?.treasury.map((i: any) => i.total)
  const reducer = (acc: any, curr: any) => acc + curr
  const seed = 600000
  const total = sumTotal?.reduce(reducer) + seed

  const { data, isLoading, isSuccess } = useGet_Accrualbondv1_Last10_SoldQuery()

  const [lastsSolds, setLastsSolds] = useState([])

  useEffect(() => {
    if (data) {
      setLastsSolds(data.logAccrualBondsV1_BondSold.slice(0, 3))
    }
  }, [data])

  const relativeTimeline = lastsSolds
    ? lastsSolds.map((value, index) => (
        <Text key={index} opacity={1 - (index / 10) * 3}>
          {formatDistanceStrict(value.timestamp * 1000, new Date().getTime()) + ' ago'}{' '}
        </Text>
      ))
    : ['loading', 'loading', 'loading']
  const lastsAmounts = lastsSolds
    ? lastsSolds.map((value, index) => (
        <Text key={index} opacity={1 - (index / 10) * 3}>
          {commify(parseFloat(value.inputAmount).toFixed(2)) + ' DAI'}
        </Text>
      ))
    : ['0', '0', '0']
  const lastsOutputamounts = lastsSolds
    ? lastsSolds.map((value, index) => (
        <Text key={index} opacity={1 - (index / 10) * 3}>
          {'+$' + commify(parseFloat(value.output).toFixed(2))}
        </Text>
      ))
    : ['0', '0', '0']

  return (
    <Card width={'340px'} height="610px" gap={0}>
      {!loading ? (
        <>
          <GlassPanel mb={6} width={'340px'} height="216px" direction={'column'}>
            <CardInfo
              info={'Market Cap'}
              value={'$' + commify(cnv.cnvData.data.marketCap.toFixed(2))}
            />
            <Box h="1px" width={'full'} bg="stroke.primary" />
            <CardInfo info={'CNV Price'} value={'$' + commify(cnv.cnvData.data.last.toFixed(2))} />
            <Box h="1px" width={'full'} bg="stroke.primary" />
            <CardInfo
              info={`Treasury value per CNV`}
              value={'$' + commify((total / cnv.cnvData.data.totalSupply).toFixed(2))}
            />
          </GlassPanel>
          <GlassPanel width={'340px'} height="216px" direction={'column'}>
            <CardInfo info={'Treasury Revenue 24h'} value={'Coming soon'} />
            <Box h="1px" width={'full'} bg="stroke.primary" />
            <CardInfo info={'Treasury Value'} value={'$' + commify(total.toFixed(2))} />
            <Box h="1px" width={'full'} bg="stroke.primary" />
            <CardInfo
              info={`Concave Liquidity`}
              value={'$' + commify(cnv.cnvData.data.totalSupply.toFixed(2))}
            />
          </GlassPanel>
        </>
      ) : (
        <GlassPanel
          width={'340px'}
          height="445px"
          direction={'column'}
          justify="center"
          align={'center'}
          gap={5}
        >
          <Text fontSize={'3xl'} fontWeight="bold">
            Loading Assets ...
          </Text>
          <SpinIcon animation={spinAnimation(3)} />
        </GlassPanel>
      )}
      <Flex
        width={'full'}
        flex={1}
        align="center"
        textColor={'text.accent'}
        fontSize="md"
        fontWeight={'bold'}
      >
        {!loading ? (
          <>
            <Flex direction={'column'} gap={2} textAlign="center" flex={1}>
              {relativeTimeline}
            </Flex>
            <Flex direction={'column'} gap={2} textAlign="center" flex={1}>
              {lastsAmounts}
            </Flex>
            <Flex direction={'column'} gap={2} textAlign="center" flex={1}>
              {lastsOutputamounts}
            </Flex>
          </>
        ) : (
          <Flex flex={1} justify={'center'} align="center">
            <Text opacity={0.6} fontSize={'2xl'}>
              Loading Bond Solds...
            </Text>
          </Flex>
        )}
      </Flex>
    </Card>
  )
}

const CardInfo = ({ info, value }) => {
  return (
    <Flex width={'full'} height="72px">
      <Flex width={'50%'} justify="center" align={'center'}>
        <Text fontSize={'13px'} fontWeight="bold" textColor={'text.low'}>
          {info}
        </Text>
      </Flex>
      <Flex width={'50%'} justify="center" align={'center'} fontWeight="bold">
        <Text>{value}</Text>
      </Flex>
    </Flex>
  )
}
