import { Token } from '@concave/gemswap-sdk'
import { Card, Collapse, Container, Flex, Heading, Image, Spinner, Stack, Text } from '@concave/ui'
import DividendsCard from 'components/Treasury/DividendsCard'
import TreasuryManagementCard from 'components/Treasury/TreasuryManagementCard'
import TreasuryRedeemCard from 'components/Treasury/TreasuryRedeemCard'
import TreasuryRevenueCard from 'components/Treasury/TreasuryRevenueCard'
import { useLiquidityInfo } from 'hooks/useLiquidityInfo'
import { fetchPortfolio } from 'lib/debank'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { chain } from 'wagmi'

const TREASURY_ADDRESS = '0x226e7AF139a0F34c6771DeB252F9988876ac1Ced'

const makeCurrencyFormat = (language, currency) =>
  new Intl.NumberFormat(language, {
    style: 'currency',
    currency,
    currencyDisplay: 'narrowSymbol',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

const formatUsd = (value) => makeCurrencyFormat('en-US', 'USD').format(value)

const TokenCard = ({ img, name, value, balance = null, children = null }) => {
  return (
    <Card
      variant="secondary"
      borderGradient="secondary"
      borderWidth={3}
      p={4}
      width={['100%', '400px', '450px']}
      shadow="Up Big"
      gap={4}
    >
      <Stack direction="row" justify="space-between" w="100%">
        <Stack direction="row" align="center">
          <Image src={img} maxW="28px" maxH="28px" alt="" />
          <Text fontWeight="bold">{name}</Text>
        </Stack>
        <Stack spacing={0} align="end">
          <Text fontWeight="bold">{value}</Text>
          {balance && <Text color="text.low">{balance}</Text>}
        </Stack>
      </Stack>
      {children}
    </Card>
  )
}

export default function Treasury() {
  const [isOnDividens, setIsOnDividends] = useState(true)
  const [dividendOpacity, setDividendOpacity] = useState(1)
  const liquidityToken = new Token(
    chain.mainnet.id,
    '0x84d53CBA013d0163BB07D65d5123D1634bc2a575',
    18,
    'CNV-LP',
    'Concave LP',
  )
  const [{ pair, token }, isLoading] = useLiquidityInfo(liquidityToken)
  const { data: treasury, isSuccess } = useQuery(['portfolio', TREASURY_ADDRESS], () =>
    fetchPortfolio(TREASURY_ADDRESS),
  )

  return (
    <Flex height={'full'} width="full" align={'center'} justify="center" position={'relative'}>
      <Flex direction={'column'} maxWidth={'900px'} height="" gap={6}>
        <Flex direction="row" width={'full'} justify={'space-around'}>
          <TreasuryRevenueCard />
          <TreasuryRedeemCard />
        </Flex>
        <TreasuryManagementCard />
        <DividendsCard />
      </Flex>
    </Flex>
    // </Flex>
  )
}
