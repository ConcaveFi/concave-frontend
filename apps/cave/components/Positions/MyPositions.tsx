import { CurrencyAmount, Fetcher, NATIVE, Pair, ROUTER_ADDRESS, Token } from '@concave/gemswap-sdk'
import { SpinIcon } from '@concave/icons'
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Card,
  Flex,
  HStack,
  keyframes,
  Modal,
  NumericInput,
  Stack,
  Text,
  useDisclosure,
  UseDisclosureReturn,
  VStack,
} from '@concave/ui'
import { ConnectWallet } from 'components/ConnectWallet'
import { CurrencyIcon } from 'components/CurrencyIcon'
import { TransactionSubmittedDialog } from 'components/TransactionSubmittedDialog'
import { BigNumber, Transaction } from 'ethers'
import { useApprovalWhenNeeded } from 'hooks/useAllowance'
import { useCurrencyBalance } from 'hooks/useCurrencyBalance'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { precision } from 'hooks/usePrecision'
import { RemoveLiquidityState, useRemoveLiquidity } from 'hooks/useRemoveLiquidity'
import { useAddressTokenList } from 'hooks/useTokenList'
import { concaveProvider } from 'lib/providers'
import { AddLiquidityModalButton } from 'pages/addliquidity'
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
  const { data: tokens, isLoading } = useAddressTokenList(account?.address)

  if (allPairs.isLoading) {
    return (
      <Flex justifyContent={'center'}>
        <VStack gap={1}>
          <SpinIcon __css={spinnerStyles} width="16" height="16" viewBox="0 0 64 64" />
          <Text>Loading pools</Text>
        </VStack>
      </Flex>
    )
  }
  if (allPairs.error) {
    return <p>Error to get Pairs</p>
  }

  if (isLoading) {
    return (
      <Flex justifyContent={'center'}>
        <VStack gap={1}>
          <SpinIcon __css={spinnerStyles} width="16" height="16" viewBox="0 0 64 64" />
          <Text>Loading user pools</Text>
        </VStack>
      </Flex>
    )
  }
  const userPairs = allPairs.data.filter((p) => {
    return (tokens || []).find((t) => p.liquidityToken.address === t.address)
  })

  const pairs = view === 'user' ? userPairs : allPairs.data

  return (
    <Card
      gap={4}
      borderWidth={2}
      variant="primary"
      borderRadius="3xl"
      h={'auto'}
      w={'2xl'}
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
          label: 'You dont have pools on your wallet.',
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

const spin = keyframes({
  '0%': {
    transform: 'rotate(0deg)',
  },
  '100%': {
    transform: 'rotate(360deg)',
  },
})

const spinnerStyles = {
  animation: `${spin} 2s linear infinite`,
}

interface LPPosition {
  userAddress: string
  pair: Pair
}
const LPPositionItem = ({ userAddress, pair }: LPPosition) => {
  const removeLiquidity = useDisclosure()
  const userBalance = useCurrencyBalance(pair.liquidityToken)
  if (userBalance.isLoading) {
    return (
      <Flex justifyContent={'center'}>
        <SpinIcon __css={spinnerStyles} width="8" height="16" viewBox="0 0 64 64" />
      </Flex>
    )
  }
  if (userBalance.error) {
    return <Text>{`${userBalance.error}`}</Text>
  }
  const balance = userBalance.data || CurrencyAmount.fromRawAmount(pair.liquidityToken, '0')

  const userPoolShare = +userBalance.data?.toExact() / +pair.liquidityToken.totalSupply.toExact()
  // const { pair, token, userBalance, userPoolShare } = liquidityInfo

  return (
    <>
      <AccordionItem p={2} shadow="Up Big" borderRadius="2xl" alignItems="center">
        <AccordionButton>
          <HStack>
            <CurrencyIcon h={'32px'} currency={pair.token0} />
            <CurrencyIcon h={'32px'} currency={pair.token1} />
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
            {balance.greaterThan(0) && (
              <Button
                onClick={removeLiquidity.onOpen}
                variant="primary"
                size="medium"
                fontFamily="heading"
                w="100%"
              >
                Withdraw
              </Button>
            )}
          </Flex>
        </AccordionPanel>
      </AccordionItem>
      <RemoveLiquidityModal
        disclosure={removeLiquidity}
        liquidityInfo={{ pair, userPoolShare, userBalance }}
      />
    </>
  )
}

const PositionInfoItem = ({ color = '', label, value, mt = 0, children = <></> }) => (
  <Flex justify="space-between" align={'center'} mt={mt}>
    <Text color={color}>{label}</Text>
    <HStack gap={2} align={'center'} alignContent={'center'}>
      <Text>{value}</Text>
      {children}
    </HStack>
  </Flex>
)

const RemoveLiquidityModal = ({
  disclosure,
  liquidityInfo,
}: {
  liquidityInfo: {
    pair: Pair
    userPoolShare: number
    userBalance: any //QueryObserverSuccessResult<CurrencyAmount<Currency>, unknown>
  }
  disclosure: UseDisclosureReturn
}) => {
  const removeLiquidityState = useRemoveLiquidity(liquidityInfo)
  return (
    <Modal
      bluryOverlay={true}
      title="Remove Liquidity"
      isOpen={disclosure.isOpen}
      onClose={disclosure.onClose}
      isCentered
      size={'2xl'}
      bodyProps={{
        variant: 'primary',
        borderRadius: '3xl',
        p: 6,
        shadow: 'Up for Blocks',
        fontWeight: 'bold',
        fontSize: 'lg',
        gap: 6,
      }}
    >
      <AmountToRemove onChange={removeLiquidityState.setPercentToRemove} />
      <YouWillReceive {...removeLiquidityState} />
      <RemoveLiquidityActions removeLiquidityState={removeLiquidityState} />
      <YourPosition {...removeLiquidityState} {...liquidityInfo} />
    </Modal>
  )
}

const RemoveLiquidityActions = ({
  removeLiquidityState,
}: {
  removeLiquidityState: { pair: Pair } & RemoveLiquidityState
}) => {
  const networkId = useCurrentSupportedNetworkId()
  const transactionStatusDisclosure = useDisclosure()
  const [needsApprove, requestApproveA, approveLabel] = useApprovalWhenNeeded(
    removeLiquidityState.pair.liquidityToken,
    ROUTER_ADDRESS[networkId],
    BigNumber.from(10000),
  )

  const removeAproval = async () => {
    requestApproveA()
  }

  const confirmedWithdrawal = async () => {
    try {
      transactionStatusDisclosure.onOpen()
      await removeLiquidityState.removeLiquidity()
    } catch (err) {
      transactionStatusDisclosure.onClose()
    }
  }

  return (
    <Flex gap={4} h={45} justifyContent={'center'}>
      <Button
        disabled={!needsApprove || !removeLiquidityState.percentToRemove}
        w={250}
        variant={'primary'}
        onClick={removeAproval}
      >
        {approveLabel}
      </Button>
      <Button
        disabled={needsApprove || !removeLiquidityState.percentToRemove}
        w={250}
        variant={'primary'}
        onClick={confirmedWithdrawal}
      >
        Confirm Withdrawal
      </Button>

      <TransactionSubmittedDialog
        title="Withdraw"
        subtitle="Withdraw values"
        tx={{ hash: removeLiquidityState.hash } as Transaction}
        isOpen={!!removeLiquidityState.hash}
      />
    </Flex>
  )
}

const YourPosition = ({ pair, userPoolShare }: { pair: Pair; userPoolShare: number }) => {
  return (
    <Flex gap={7} direction={'column'} shadow="Up Big" px={4} py={4} borderRadius="2xl">
      <Text fontSize={'lg'}>Your Position</Text>
      <Flex gap={2} align={'center'}>
        <CurrencyIcon size="sm" currency={pair.token0} />
        <CurrencyIcon size="sm" currency={pair.token1} />
        <Text px={4}>
          {pair.token0.symbol}/{pair.token1.symbol}
        </Text>
      </Flex>
      <Stack
        fontWeight="bold"
        fontSize="lg"
        color="text.medium"
        borderRadius="2xl"
        shadow="inset 0px -5px 10px rgba(134, 175, 255, 0.05), inset -9px 12px 24px rgba(13, 17, 23, 0.4)"
        p={4}
        spacing={3}
      >
        <PositionInfoItem
          label="Your pool share:"
          value={`${precision(userPoolShare * 100, 2).formatted}%`}
        />
        <PositionInfoItem
          label={pair.token0.symbol}
          value={precision(+pair.reserve0.toExact() * userPoolShare).formatted}
        >
          <CurrencyIcon size="sm" currency={pair.token0} />
        </PositionInfoItem>
        <PositionInfoItem
          label={pair.token1.symbol}
          value={precision(+pair.reserve1.toExact() * userPoolShare).formatted}
        >
          <CurrencyIcon size="sm" currency={pair.token1} />
        </PositionInfoItem>
      </Stack>
    </Flex>
  )
}

const YouWillReceive = ({
  pair,
  amountAMin,
  amountBMin,
  hasNativeToken,
  receiveInNativeToken,
  tokenAIsNativeWrapper,
  tokenBIsNativeWrapper,
  handleNativeToken,
}: RemoveLiquidityState) => {
  return (
    <HStack gap={7} shadow="Up Big" px={6} py={3} borderRadius="2xl" align="center">
      <Box>
        <Text>You will receive:</Text>
        {hasNativeToken && (
          <Button onClick={handleNativeToken}>
            <Text fontWeight={400} fontStyle={'md'} color={'#2E97E2'} fontSize={'14px'}>
              Change to {receiveInNativeToken ? 'WETH' : 'ETH'}
            </Text>
          </Button>
        )}
      </Box>
      <ReceiveBox
        receiveInNative={tokenAIsNativeWrapper && receiveInNativeToken}
        amount={amountAMin}
        token={pair.token0}
      />
      <ReceiveBox
        receiveInNative={tokenBIsNativeWrapper && receiveInNativeToken}
        amount={amountBMin}
        token={pair.token1}
      />
    </HStack>
  )
}

const ReceiveBox = ({
  amount,
  token,
  receiveInNative,
}: {
  amount: number
  token: Token
  receiveInNative?: boolean
}) => {
  const currency = receiveInNative ? NATIVE[token.chainId] : token
  return (
    <HStack shadow="down" borderRadius="2xl" p={3}>
      <CurrencyIcon size="sm" currency={currency} />
      <Box>
        <Text fontFamily={'heading'} fontWeight={600}>
          {precision(amount, 4).formatted}
        </Text>
        <Text title={currency?.name} fontWeight={700} fontSize={'sm'} color={'text.low'}>
          {currency?.symbol}
        </Text>
      </Box>
    </HStack>
  )
}
const AmountToRemove = ({ onChange }: { onChange: (n: number) => void }) => {
  return (
    <Flex shadow="Up Big" px={6} py={3} borderRadius="2xl" justify="space-between" align="center">
      <Text>Amount to remove</Text>
      <NumericInput
        autoFocus={true}
        shadow="down"
        onValueChange={({ floatValue }, eventSrc) =>
          eventSrc.source === 'event' && onChange(floatValue)
        }
        borderRadius="2xl"
        isAllowed={({ floatValue }) => !floatValue || (floatValue <= 100 && floatValue >= 0)}
        py={2}
        px={4}
        w="180px"
        textAlign="right"
        suffix=" %"
        placeholder="0.0 %"
      />
    </Flex>
  )
}
