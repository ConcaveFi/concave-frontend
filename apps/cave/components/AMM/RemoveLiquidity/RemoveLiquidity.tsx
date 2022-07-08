import { Currency, CurrencyAmount, NATIVE, ROUTER_ADDRESS, Token, Percent } from '@concave/core'
import { Pair } from '@concave/gemswap-sdk'
import {
  Box,
  Button,
  Flex,
  HStack,
  Modal,
  NumericInput,
  Stack,
  Text,
  useDisclosure,
} from '@concave/ui'
import { useCurrencyButtonState } from 'components/CurrencyAmountButton/CurrencyAmountButton'
import { CurrencyIcon } from 'components/CurrencyIcon'
import { PositionInfoItem } from 'components/Positions/MyPositions'
import { TransactionErrorDialog } from 'components/TransactionErrorDialog'
import { TransactionSubmittedDialog } from 'components/TransactionSubmittedDialog'
import { WaitingConfirmationDialog } from 'components/WaitingConfirmationDialog'
import { Transaction } from 'ethers'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { RemoveLiquidityState, useRemoveLiquidity } from 'hooks/useRemoveLiquidity'
import React, { useState } from 'react'

export const RemoveLiquidityModalButton = ({
  liquidityInfo,
  label = 'Withdraw',
  ...buttonProps
}: {
  label?: string
  liquidityInfo: {
    pair: Pair
    userPoolShare: Percent
    userBalance: CurrencyAmount<Currency>
  }
}) => {
  const removeLiquidityDisclosure = useDisclosure()
  const removeLiquidityState = useRemoveLiquidity(liquidityInfo)
  if (!liquidityInfo.userBalance.greaterThan(0)) {
    return <></>
  }
  return (
    <>
      <Button
        onClick={removeLiquidityDisclosure.onOpen}
        variant="primary"
        size="medium"
        fontFamily="heading"
        w="100%"
        {...buttonProps}
      >
        {label}
      </Button>
      <Modal
        bluryOverlay={true}
        title="Remove Liquidity"
        isOpen={removeLiquidityDisclosure.isOpen}
        onClose={removeLiquidityDisclosure.onClose}
        isCentered
        size={'2xl'}
        bodyProps={{
          variant: 'primary',
          borderRadius: '3xl',
          borderWidth: 2,
          p: 6,
          shadow: 'Up for Blocks',
          fontWeight: 'bold',
          fontSize: 'lg',
          gap: 6,
        }}
      >
        <AmountToRemove onChange={removeLiquidityState.setPercentToRemove} />
        <YouWillReceive {...removeLiquidityState} />
        <RemoveLiquidityActions
          removeLiquidityState={removeLiquidityState}
          closeParentComponent={removeLiquidityDisclosure.onClose}
        />
        <YourPosition {...removeLiquidityState} {...liquidityInfo} />
      </Modal>
    </>
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
              Receive {receiveInNativeToken ? 'WETH' : 'ETH'} instead
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
  amount: CurrencyAmount<Currency>
  token: Token
  receiveInNative?: boolean
}) => {
  const currency = receiveInNative ? NATIVE[token.chainId] : token
  return (
    <HStack shadow="down" borderRadius="2xl" p={3}>
      <CurrencyIcon size="sm" currency={currency} />
      <Box>
        <Text fontFamily={'heading'} fontWeight={600}>
          {amount ? amount?.toFixed(4) : 0}
        </Text>
        <Text title={currency?.name} fontWeight={700} fontSize={'sm'} color={'text.low'}>
          {currency?.symbol}
        </Text>
      </Box>
    </HStack>
  )
}
const RemoveLiquidityActions = ({
  removeLiquidityState,
  closeParentComponent,
}: {
  removeLiquidityState: { pair: Pair } & RemoveLiquidityState
  closeParentComponent: VoidFunction
}) => {
  const networkId = useCurrentSupportedNetworkId()

  const {
    isOpen: isOpenSubmitted,
    onClose: onCloseSubmitted,
    onOpen: onOpenSubmitted,
  } = useDisclosure()

  const [txError, setTxError] = useState('')
  const { isOpen: isOpenError, onClose: onCloseError, onOpen: onOpenError } = useDisclosure()

  const [waitingForConfirm, setWaitingForConfirm] = useState(false)

  const confirmedWithdrawal = async () => {
    try {
      setWaitingForConfirm(true)
      await removeLiquidityState.removeLiquidity().then(() => {
        onOpenSubmitted()
        setWaitingForConfirm(false)
      })
    } catch (err) {
      setWaitingForConfirm(false)
      onCloseSubmitted()
      setTxError(err.message)
      onOpenError()
    }
  }
  const currencyAmount = CurrencyAmount.fromRawAmount(
    removeLiquidityState.pair.liquidityToken,
    removeLiquidityState.amountToRemove.toString(),
  )
  const useCurrencyState = useCurrencyButtonState(currencyAmount, ROUTER_ADDRESS[networkId])

  return (
    <Flex gap={4} h={45} justifyContent={'center'}>
      <Button
        disabled={!removeLiquidityState.percentToRemove}
        {...useCurrencyState.buttonProps}
        w={250}
        variant={'primary'}
      />

      <Button
        disabled={!useCurrencyState.approved || !removeLiquidityState.percentToRemove}
        w={250}
        variant={'primary'}
        onClick={confirmedWithdrawal}
      >
        Confirm withdrawal
      </Button>

      <WaitingConfirmationDialog isOpen={waitingForConfirm} title={'Confirm Liquidity Removal'}>
        <Flex
          width={'200px'}
          height="107px"
          rounded={'2xl'}
          mt={4}
          shadow={'Down Medium'}
          align={'center'}
          direction={'column'}
        >
          <Text textColor={'text.low'} fontWeight="700" fontSize={18} mt={4}>
            You will receive
          </Text>
          <Text fontWeight={'700'} textColor="text.accent">
            {`${removeLiquidityState.amountAMin.toFixed(2)} ${
              removeLiquidityState.pair.token0.symbol
            }`}
          </Text>
          <Text fontWeight={'700'} textColor="text.accent">
            {`${removeLiquidityState.amountBMin.toFixed(2)} ${
              removeLiquidityState.pair.token1.symbol
            }`}
          </Text>
        </Flex>
      </WaitingConfirmationDialog>

      <TransactionSubmittedDialog
        title="Withdraw"
        subtitle="Withdraw"
        tx={{ hash: removeLiquidityState.hash } as Transaction}
        isOpen={isOpenSubmitted}
        closeParentComponent={closeParentComponent}
      />
      <TransactionErrorDialog error={txError} isOpen={isOpenError} />
    </Flex>
  )
}

const YourPosition = ({ pair, userPoolShare }: { pair: Pair; userPoolShare: Percent }) => {
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
        <PositionInfoItem label="Your pool share:" value={`${userPoolShare.toFixed(2)}%`} />
        <PositionInfoItem
          label={pair.token0.symbol}
          value={pair.reserve0.multiply(userPoolShare).toFixed(2)}
        >
          <CurrencyIcon size="sm" currency={pair.token0} />
        </PositionInfoItem>
        <PositionInfoItem
          label={pair.token1.symbol}
          value={pair.reserve1.multiply(userPoolShare).toFixed(2)}
        >
          <CurrencyIcon size="sm" currency={pair.token1} />
        </PositionInfoItem>
      </Stack>
    </Flex>
  )
}
