import { SpinIcon } from '@concave/icons'
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Card,
  CloseButton,
  Flex,
  Heading,
  HStack,
  keyframes,
  Modal,
  NumericInput,
  Stack,
  Text,
  useDisclosure,
  UseDisclosureReturn,
} from '@concave/ui'
import { useAddressTokenList } from 'components/AMM/hooks/useTokenList'
import { CurrencyIcon } from 'components/CurrencyIcon'
import { TransactionSubmittedModal } from 'components/TransactionSubmittedModal'
import { BigNumber } from 'ethers'
import { Pair, ROUTER_ADDRESS, Token } from 'gemswap-sdk'
import { useApprovalWhenNeeded } from 'hooks/useAllowance'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { LiquidityInfoData, useLiquidityInfo } from 'hooks/useLiquidityInfo'
import { precision, usePrecision } from 'hooks/usePrecision'
import { RemoveLiquidityState, useRemoveLiquidity } from 'hooks/useRemoveLiquidity'
import React from 'react'

export const MyPositions = ({ account }) => {
  const { data: tokens, isLoading } = useAddressTokenList(account.address)
  if (isLoading) {
    return <p>loading pools</p>
  }
  const liquidityPoolTokens = tokens.filter((p) => {
    return p.name == 'Concave LP'
  })
  if (!liquidityPoolTokens.length) {
    return <p>{"You don't have pools"}</p>
  }

  return (
    <>
      <RewardsBanner />
      <Card variant="primary" borderRadius="3xl" p={6} shadow="Up for Blocks">
        <Accordion as={Stack} allowToggle gap={2}>
          {liquidityPoolTokens.map((liquidityPoolToken) => {
            return (
              <LPPositionItem
                key={liquidityPoolToken.address}
                liquidityPoolToken={liquidityPoolToken}
                userAddress={account.address}
              />
            )
          })}
        </Accordion>
      </Card>
    </>
  )
}

const RewardsBanner = () => (
  <Card variant="secondary" p={4} gap={4}>
    <Flex justify="space-between">
      <Heading as="h2" fontSize="lg">
        Liquidity Provider Rewards
      </Heading>
      <CloseButton blendMode="multiply" _hover={{ blendMode: 'normal' }} />
    </Flex>
    <Text fontSize="lg">
      Liquidity providers earn a 0.25% fee on all trades proportional to their share of the pool.
      Fees are added to the pool, accrue in real time and can be claimed by withdrawing your
      liquidity.
    </Text>
  </Card>
)

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
  liquidityPoolToken: Token
}
const LPPositionItem = ({ userAddress, liquidityPoolToken }: LPPosition) => {
  const [liquidityInfo, isLoading] = useLiquidityInfo(liquidityPoolToken)
  const removeLiquidity = useDisclosure()
  if (isLoading) {
    return (
      <Flex justifyContent={'center'}>
        <SpinIcon __css={spinnerStyles} width="8" height="16" viewBox="0 0 64 64" />
      </Flex>
    )
  }
  const { pair, token, userBalance, userPoolShare } = liquidityInfo
  return (
    <>
      <AccordionItem p={2} shadow="Up Big" borderRadius="2xl" alignItems="center">
        <AccordionButton>
          <HStack>
            {/* //TODO https://github.com/ConcaveFi/concave-frontend/issues/118 */}
            <CurrencyIcon h={'32px'} currency={pair.token0} />
            <CurrencyIcon h={'32px'} currency={pair.token1} />
            <Text ml="24px" fontWeight="semibold" fontSize="lg">
              {pair.token0.symbol}/{pair.token1.symbol}
            </Text>
          </HStack>
          {/* <Button
            variant="secondary"
            borderRadius="full"
            pl={3}
            pr={1}
            fontSize="lg"
            rightIcon={<AccordionIcon h="28px" w="auto" />}
            iconSpacing={0}
            ml="auto"
          >
            Manage
          </Button> */}
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
            <PositionInfoItem label="Your total pool tokens:" value={userBalance.data.formatted} />
            <PositionInfoItem
              label={`Pooled ${pair.token0.symbol}:`}
              value={pair.reserve0.toFixed(2)}
            >
              <CurrencyIcon h={'32px'} size="sm" currency={pair.token0} />
            </PositionInfoItem>
            <PositionInfoItem
              label={`Pooled ${pair.token1.symbol}:`}
              value={pair.reserve1.toFixed(2)}
            >
              <CurrencyIcon h={'32px'} size="sm" currency={pair.token1} />
            </PositionInfoItem>
            <PositionInfoItem
              label="Your pool share:"
              value={`${precision(userPoolShare * 100, 2).formatted}%`}
            />
          </Stack>
          <Flex gap={5} justify="center" mt={6}>
            {/* <Button onClick={addLiquidity.onOpen} variant="primary" h={12} w={40} fontSize="lg">
              Add
            </Button> */}
            <Button onClick={removeLiquidity.onOpen} variant="primary" h={12} w={40} fontSize="lg">
              Withdraw
            </Button>
          </Flex>
        </AccordionPanel>
      </AccordionItem>
      <RemoveLiquidityModal disclosure={removeLiquidity} liquidityInfo={liquidityInfo} />
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
  liquidityInfo: LiquidityInfoData
  disclosure: UseDisclosureReturn
}) => {
  const removeLiquidityState = useRemoveLiquidity({
    liquidityInfo,
  })
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
      <YourPosition {...removeLiquidityState} />
    </Modal>
  )
}

const RemoveLiquidityActions = ({
  removeLiquidityState,
}: {
  removeLiquidityState: RemoveLiquidityState
}) => {
  const networkId = useCurrentSupportedNetworkId()
  const transactionStatusDisclosure = useDisclosure()
  const [needsApprove, requestApproveA, approveLabel] = useApprovalWhenNeeded(
    removeLiquidityState.token,
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

      <TransactionSubmittedModal
        title="Withdraw"
        label="Withdraw values"
        disclosure={transactionStatusDisclosure}
        hash={removeLiquidityState.hash}
        onClose={() => {
          console.log('close')
        }}
      />
    </Flex>
  )
}

const YourPosition = ({ pair, userPoolShare }: LiquidityInfoData) => {
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
}: {
  amountAMin: number
  amountBMin: number
  pair: Pair
}) => {
  return (
    <HStack gap={7} shadow="Up Big" px={6} py={3} borderRadius="2xl" align="center">
      <Box>
        <Text>You will receive:</Text>
        <Text fontWeight={400} fontStyle={'md'} color={'#2E97E2'} fontSize={'14px'}>
          You will receive:
        </Text>
      </Box>
      <ReceiveBox amount={amountAMin} token={pair.token0} />
      <ReceiveBox amount={amountBMin} token={pair.token1} />
    </HStack>
  )
}

const ReceiveBox = ({ amount, token }: { amount: number; token: Token }) => {
  return (
    <HStack shadow="down" borderRadius="2xl" p={3}>
      <CurrencyIcon size="sm" currency={token} />
      <Box>
        <Text fontFamily={'heading'} fontWeight={600}>
          {usePrecision(amount, 7).formatted}
        </Text>
        <Text title={token?.name} fontWeight={700} fontSize={'sm'} color={'text.low'}>
          {token?.symbol}
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
