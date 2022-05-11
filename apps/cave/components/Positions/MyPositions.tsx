import { CurrencyAmount, Fetcher, Pair } from '@concave/gemswap-sdk'
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
import { precision } from 'hooks/usePrecision'
import { useAddressTokenList } from 'hooks/useTokenList'
import { concaveProvider } from 'lib/providers'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { useAccount, useNetwork } from 'wagmi'

export const MyPositions = () => {
  const [view, setView] = useState<'user' | 'all'>('all')
  const [{ data: network }] = useNetwork()
  const chainId = network?.chain?.id ?? 1
  const provider = concaveProvider(chainId)
  const allPairs = useQuery(['fetchPairs', chainId], () => {
    return Fetcher.fetchPairs(chainId, provider)
  })
  const [{ data: account }] = useAccount()
  const { data: tokens, isLoading: userPoolsLoading } = useAddressTokenList(account?.address)

  if (userPoolsLoading) {
    return <Loading size="lg" label="Loading user pools" />
  }
  if (allPairs.isLoading) {
    return <Loading size="lg" label="Loading pools" />
  }
  if (allPairs.error) {
    return <p>Error to get Pairs</p>
  }

  const userPairs = allPairs.data.filter((p) => {
    return tokens.find((t) => p.liquidityToken.address === t.address)
  })

  const pairs = view === 'user' ? userPairs : allPairs.data

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
    <Box borderRadius={'2xl'} p={4} shadow={'down'}>
      <Accordion as={Stack} allowToggle gap={2}>
        {pairs.map((pair) => {
          return (
            <LPPositionItem
              key={pair.liquidityToken.address}
              pair={pair}
              userAddress={userAddress}
            />
          )
        })}
      </Accordion>
    </Box>
  )
}

interface LPPosition {
  userAddress: string
  pair: Pair
}
const LPPositionItem = ({ userAddress, pair }: LPPosition) => {
  const userBalance = useCurrencyBalance(pair.liquidityToken)
  if (userBalance.isLoading) {
    return (
      <AccordionItem p={2} shadow="Up Big" borderRadius="2xl" alignItems="center">
        <AccordionButton disabled={true}>
          <Loading size="sm" rLabel="Loading pair info" />
        </AccordionButton>
        <AccordionPanel></AccordionPanel>
      </AccordionItem>
    )
  }
  if (userBalance.error) {
    return <Text>{`${userBalance.error}`}</Text>
  }
  const balance = userBalance.data || CurrencyAmount.fromRawAmount(pair.liquidityToken, '0')
  const userPoolShare = +userBalance.data?.toExact() / +pair.liquidityToken.totalSupply.toExact()
  return (
    <>
      <AccordionItem p={2} shadow="Up Big" borderRadius="2xl" alignItems="center">
        <AccordionButton>
          <HStack>
            <CurrencyIcon size={'sm'} currency={pair.token0} />
            <CurrencyIcon size={'sm'} currency={pair.token1} />
            <Text ml="24px" fontWeight="semibold" fontSize="lg">
              {pair.token0.symbol}/{pair.token1.symbol}
            </Text>
          </HStack>
        </AccordionButton>
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
            <PositionInfoItem label="Your total pool tokens:" value={balance.toSignificant()} />
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
            <PositionInfoItem
              label="Your pool share:"
              value={`${precision(userPoolShare * 100, 2).formatted}%`}
            />
          </Stack>
          <Flex gap={5} justify="center" mt={6}>
            <AddLiquidityModalButton pair={pair} />
            <RemoveLiquidityModalButton
              liquidityInfo={{ pair, userPoolShare, userBalance: balance }}
            />
          </Flex>
        </AccordionPanel>
      </AccordionItem>
    </>
  )
}

export const PositionInfoItem = ({ color = '', label, value, mt = 0, children = <></> }) => (
  <Flex justify="space-between" align={'center'} mt={mt}>
    <Text color={color}>{label}</Text>
    <HStack gap={2} align={'center'} alignContent={'center'}>
      <Text>{value}</Text>
      {children}
    </HStack>
  </Flex>
)
