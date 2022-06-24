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
import { ConnectWallet } from 'components/ConnectWallet'
import { CurrencyIcon } from 'components/CurrencyIcon'
import { Loading } from 'components/Loading'
import { useCurrencyBalance } from 'hooks/useCurrencyBalance'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { concaveProvider } from 'lib/providers'
import React from 'react'
import { useQuery } from 'react-query'
import { PositionsState } from './usePositionsState'

export const MyPositions = ({ state }: { state: PositionsState }) => {
  const { loading, error, setView, view, account, pairs } = state
  if (loading) {
    return <Loading size="lg" label={loading} />
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
      p={6}
      shadow="Up for Blocks"
    >
      <HStack w={'auto'} gap={4} justifyContent={'space-between'}>
        <LiquidityOptionButton
          label={'Your Pools'}
          active={view === 'user'}
          onClick={() => setView('user')}
        />
        <LiquidityOptionButton
          label={'All Pools'}
          active={view === 'all'}
          onClick={() => setView('all')}
        />
      </HStack>
      <PairsAccordion userAddress={account?.address} pairs={pairs} />
    </Card>
  )
}

const LiquidityOptionButton = ({ active, onClick, label }) => {
  return (
    <Box
      justifyContent={'center'}
      cursor={'pointer'}
      p={2}
      px={8}
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

interface PairsAccordionProps {
  userAddress?: string
  pairs: Pair[]
}
const PairsAccordion = ({ userAddress, pairs }: PairsAccordionProps) => {
  if (!pairs.length) {
    const { label, Button } = userAddress
      ? {
          label: 'You are not in any pools',
          Button: <AddLiquidityModalButton />,
        }
      : { label: 'You are disconnected.', Button: <ConnectWallet /> }

    return (
      <Box borderRadius={'2xl'} p={6} shadow={'down'}>
        <Flex gap={4} direction={'column'} justify="center" align={'center'}>
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
        maxH={'55vh'}
        apply="scrollbar.secondary"
        w={'100%'}
        overflowY={'auto'}
      >
        <Accordion as={Stack} allowToggle gap={2}>
          {pairs.map((pair) => (
            <AccordionItem
              key={pair.liquidityToken.address}
              p={2}
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
  const pairData = useQuery(
    [
      'fetchPairData',
      props.pair.liquidityToken.address,
      chainId,
      props.isExpanded,
      userBalance.data?.toExact(),
    ],
    () => Fetcher.fetchPairFromAddress(props.pair.liquidityToken.address, concaveProvider(chainId)),
    { enabled: props.isExpanded },
  )

  const pair = pairData.data
  if (userBalance.isLoading || pairData.isLoading || !userBalance.data) {
    return (
      <AccordionPanel>
        <Loading size="sm" />
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
          <PositionInfoItem label="Your total pool tokens:" value={balance.toSignificant()} />
        )}
        <PositionInfoItem
          label={`Pooled ${pair.token0.symbol}:`}
          value={pair.reserve0.toSignificant(6, { groupSeparator: ',' })}
        >
          <CurrencyIcon h={'32px'} size="sm" currency={pair.token0} />
        </PositionInfoItem>
        <PositionInfoItem
          label={`Pooled ${pair.token1.symbol}:`}
          value={pair.reserve1.toSignificant(6, { groupSeparator: ',' })}
        >
          <CurrencyIcon h={'32px'} size="sm" currency={pair.token1} />
        </PositionInfoItem>

        {balance.greaterThan(0) && (
          <PositionInfoItem label="Your pool share:" value={`${userPoolShare.toFixed()}%`} />
        )}
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
        <HStack>
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
  <Flex
    direction={{ base: 'column', sm: 'row' }}
    w={'full'}
    justify="space-between"
    align={'center'}
    mt={mt}
  >
    <Text color={color}>{label}</Text>
    <HStack gap={{ base: 0, sm: 2 }} align={'center'} alignContent={'center'}>
      <Text>{value}</Text>
      {children}
    </HStack>
  </Flex>
)
