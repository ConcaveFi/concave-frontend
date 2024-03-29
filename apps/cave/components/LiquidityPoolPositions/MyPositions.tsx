import { CurrencyAmount, Percent } from '@concave/core'
import { Fetcher, Pair } from '@concave/gemswap-sdk'
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Card,
  Flex,
  HStack,
  Stack,
  Text,
} from '@concave/ui'

import { AddLiquidityModalButton } from 'components/AMM/AddLiquidity/AddLiquidity'
import { RemoveLiquidityModalButton } from 'components/AMM/RemoveLiquidity/RemoveLiquidity'
import { CurrencyIcon } from 'components/CurrencyIcon'
import { Loading } from 'components/Loading'
import { ConnectButton } from 'components/UserWallet/ConnectButton'
import { useCurrencyBalance } from 'hooks/useCurrencyBalance'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { compactFormat } from 'utils/bigNumberMask'
import { useAccount, useProvider } from 'wagmi'
import { PositionsState } from './hooks/usePositionsState'
export const MyPositions = ({ state }: { state: PositionsState }) => {
  const router = useRouter()
  const { loading, error, setView, view, pairs, user } = state
  if (loading) {
    return <Loading message={loading} />
  }
  if (error) {
    return <Text>error</Text>
  }
  return (
    <Card
      gap={4}
      borderWidth={2}
      variant="primary"
      borderRadius="3xl"
      h={'auto'}
      maxW={'2xl'}
      w={'full'}
      p={{ base: 4, sm: 6 }}
      shadow="Up for Blocks"
    >
      {!!user && (
        <HStack w={'auto'} gap={4} justifyContent={'space-between'}>
          <LiquidityOptionButton
            label={'Your pools'}
            active={view === 'user'}
            onClick={() => {
              router.push('/user-dashboard?view=Liquidity')
            }}
          />
          <LiquidityOptionButton
            label={'All pools'}
            active={view === 'all'}
            onClick={() => setView('all')}
          />
        </HStack>
      )}
      <PairsAccordion pairs={pairs} />
    </Card>
  )
}

const LiquidityOptionButton = ({ active = false, onClick = () => {}, label = '' }) => {
  return (
    <Box
      justifyContent={'center'}
      cursor={'pointer'}
      p={2}
      px={{ base: 4, sm: 8 }}
      shadow={active ? 'Down Big' : 'Up Big'}
      borderRadius="2xl"
      alignItems="center"
      onClick={onClick}
    >
      <Text fontWeight="semibold" fontSize="lg">
        {label}
      </Text>
    </Box>
  )
}

export const PairsAccordion = ({
  pairs,
  maxH,
  isLoading,
  isFetching,
}: {
  pairs: Pair[]
  maxH?: string
  isLoading?: boolean
  isFetching?: boolean
}) => {
  const { address } = useAccount()
  if (isLoading) {
    return <Loading message="Loading positions" />
  }
  if (isFetching) {
    return <Loading message="Updating positions" />
  }

  if (!pairs.length) {
    const { label, Button } = address
      ? {
          label: 'You are not in any pools',
          Button: <></>,
        }
      : { label: 'You are disconnected.', Button: <ConnectButton /> }

    return (
      <Box borderRadius={'2xl'} p={{ base: 4, sm: 6 }} h={'full'} shadow={'down'}>
        <Flex
          gap={4}
          direction={'column'}
          justifyContent={'space-around'}
          h={'full'}
          align={'center'}
        >
          <Text>{label}</Text>
          {Button}
        </Flex>
      </Box>
    )
  }
  return (
    <Box borderRadius={'2xl'} px={{ base: 0, sm: 4 }} py={2} shadow={'down'} w={'100%'}>
      <Box
        borderRadius={'2xl'}
        p={{ base: 2, sm: 4 }}
        maxH={maxH || '55vh'}
        apply="scrollbar.secondary"
        w={'100%'}
        overflowY={'auto'}
      >
        <Accordion as={Stack} allowToggle gap={2}>
          {pairs.map((pair) => (
            <AccordionItem
              key={pair.liquidityToken.address}
              shadow="Up Big"
              borderRadius="2xl"
              alignItems="center"
            >
              {({ isExpanded }) => <LPPositionItem isExpanded={isExpanded} pair={pair} />}
            </AccordionItem>
          ))}
        </Accordion>
      </Box>
    </Box>
  )
}

export const LiquidityPoolPainel = (props: LPPosition) => {
  const chainId = useCurrentSupportedNetworkId()
  const userBalance = useCurrencyBalance(props.pair.liquidityToken)
  const provider = useProvider()
  const pairData = useQuery(
    [
      'fetchPairData',
      props.pair.liquidityToken.address,
      chainId,
      props.isExpanded,
      userBalance.data?.toExact(),
    ],
    () => Fetcher.fetchPairFromAddress(props.pair.liquidityToken.address, provider),
    { enabled: props.isExpanded },
  )

  const pair = pairData.data
  if (userBalance.isLoading || pairData.isLoading || !userBalance.data) {
    return (
      <AccordionPanel>
        <Loading />
      </AccordionPanel>
    )
  }
  if (userBalance.error || pairData.error)
    return <Text>{`${userBalance.error || pairData.error}`}</Text>

  if (!pair) return <AccordionPanel />
  const balance = userBalance.data || CurrencyAmount.fromRawAmount(pair.liquidityToken, '0')

  const userPoolShare =
    pair.liquidityToken?.totalSupply &&
    new Percent(userBalance.data.quotient, pair.liquidityToken.totalSupply.quotient)
  return (
    <AccordionPanel>
      <Stack
        fontWeight="bold"
        fontSize="lg"
        color="text.medium"
        borderRadius="2xl"
        shadow="down"
        p={4}
        spacing={4}
      >
        {balance.greaterThan(0) && (
          <PositionInfoItem
            label="Your total pool tokens:"
            value={compactFormat(balance.quotient.toString(), balance.currency)}
          />
        )}
        {balance.greaterThan(0) && (
          <PositionInfoItem label="Your pool share:" value={`${userPoolShare.toFixed()}%`} />
        )}
        <PositionInfoItem
          label={`Pooled ${pair.token0.symbol}:`}
          value={compactFormat(pair.reserve0.quotient.toString(), pair.token0)}
        >
          <CurrencyIcon link h={'32px'} size="sm" currency={pair.token0} />
        </PositionInfoItem>
        <PositionInfoItem
          label={`Pooled ${pair.token1.symbol}:`}
          value={compactFormat(pair.reserve1.quotient.toString(), pair.token1)}
        >
          <CurrencyIcon link h={'32px'} size="sm" currency={pair.token1} />
        </PositionInfoItem>
      </Stack>
      <Flex gap={5} justify="center" mt={6}>
        <AddLiquidityModalButton pair={pair} />
        <RemoveLiquidityModalButton liquidityInfo={{ pair, userPoolShare, userBalance: balance }} />
      </Flex>
    </AccordionPanel>
  )
}

interface LPPosition {
  isExpanded?: boolean
  pair: Pair
}
const LPPositionItem = (props: LPPosition) => {
  return (
    <>
      <AccordionButton>
        <HStack py={1.5}>
          <CurrencyIcon size={'sm'} currency={props.pair.token0} />
          <CurrencyIcon size={'sm'} currency={props.pair.token1} />
          <Text ml="24px" fontWeight="semibold" fontSize="lg">
            {props.pair.token0.symbol}/{props.pair.token1.symbol}
          </Text>
        </HStack>
      </AccordionButton>
      <LiquidityPoolPainel {...props} />
    </>
  )
}

export const PositionInfoItem = ({ color = '', label, value, mt = 0, children = <></> }) => (
  <Flex direction={{ sm: 'row' }} w={'full'} justify="space-between" align={'center'} mt={mt}>
    <Text fontSize={{ base: '12px', md: 'md' }} color={color}>
      {label}
    </Text>
    <HStack
      fontSize={{ base: '12px', md: 'md' }}
      gap={{ base: 0, sm: 2 }}
      align={'center'}
      alignContent={'center'}
    >
      <Text>{value}</Text>
      {children}
    </HStack>
  </Flex>
)
