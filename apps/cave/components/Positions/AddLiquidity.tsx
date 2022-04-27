import { PlusIcon } from '@concave/icons'
import {
  Box,
  Button,
  Card,
  Flex,
  HStack,
  Modal,
  Text,
  useDisclosure,
  UseDisclosureReturn,
} from '@concave/ui'
import { InputField } from 'components/AMM'
import { CurrencyIcon } from 'components/CurrencyIcon'
import { TransactionSubmittedModal } from 'components/TransactionSubmittedModal'
import { parseUnits } from 'ethers/lib/utils'
import { ROUTER_ADDRESS } from 'gemswap-sdk'
import { useAddLiquidity, UseAddLiquidityData } from 'hooks/useAddLiquidity'
import { useApprovalWhenNeeded } from 'hooks/useAllowance'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import React from 'react'
import { chain } from 'wagmi'

const LiquidityTip = () => (
  <Card variant="secondary" p={4} backgroundBlendMode={'screen'}>
    <Text fontSize="lg">
      Tip: When you add liquidity, you will receive pool tokens representing your position. These
      tokens automatically earn fees proportional to your share of the pool, and can be redeemed at
      any time.
    </Text>
  </Card>
)

export const AddLiquidityContent = ({ userAddress }: { userAddress: string }) => {
  const supplyLiquidityDisclosure = useDisclosure()
  const transactionStatusDisclosure = useDisclosure()
  const [data, setters, call, clear] = useAddLiquidity(chain.ropsten, userAddress)
  const { amountADesired, amountBDesired, tokenA, tokenB, pair } = data
  const { updateInputValue, updateOutputValue, updateTokenA, updateTokenB, setTokenA, setTokenB } =
    setters
  const valid = tokenA && tokenB && amountADesired && amountBDesired
  const onSubmit = async () => {
    try {
      transactionStatusDisclosure.onOpen()
      await call()
    } catch (err) {
      console.warn(err)
      transactionStatusDisclosure.onClose()
    }
  }
  return (
    <>
      <LiquidityTip />
      <Flex direction={'column'} p={4} gap={2}>
        <InputField
          currencyIn={tokenA}
          currencyAmountIn={amountADesired}
          updateInputValue={(value) => {
            if (value?.toExact()) {
              updateInputValue('' + value.toExact())
            }
          }}
          updateCurrencyIn={updateTokenA}
        />
        <Flex align="center" justify="center">
          <Button
            shadow={'Up Small'}
            _focus={{ boxShadow: 'Up Small' }}
            bgColor="rgba(156, 156, 156, 0.01);"
            w={'34px'}
            h={'30px'}
            onClickCapture={console.log}
            borderRadius={'full'}
          >
            <PlusIcon />
          </Button>
        </Flex>
        <InputField
          currencyIn={tokenB}
          currencyAmountIn={amountBDesired}
          updateInputValue={(value) => {
            if (value?.toExact()) {
              updateOutputValue('' + value.toExact())
            }
          }}
          updateCurrencyIn={updateTokenB}
        />
      </Flex>
      <Button
        h={'50px'}
        p={4}
        shadow={'Up Small'}
        _focus={{
          shadow: 'Up Small',
        }}
        onClick={supplyLiquidityDisclosure.onOpen}
        isDisabled={!valid}
        bg={'rgba(113, 113, 113, 0.01)'}
      >
        <Text fontSize={'2xl'}>{pair ? 'Add Liquidity' : 'Create Liquidity'}</Text>
      </Button>
      <SupplyLiquidityModal
        isVisible={!!valid}
        disclosure={supplyLiquidityDisclosure}
        data={data}
        onConfirm={onSubmit}
      />
      <TransactionSubmittedModal
        title="Supply"
        label="Supply values"
        disclosure={transactionStatusDisclosure}
        hash={data.hash}
        onClose={clear}
      />
    </>
  )
}

const SupplyLiquidityModal = ({
  isVisible,
  disclosure,
  data,
  onConfirm = () => {},
}: {
  isVisible: boolean
  disclosure: UseDisclosureReturn
  data: UseAddLiquidityData
  onConfirm: () => void
}) => {
  if (!isVisible) {
    return <></>
  }
  return (
    <Modal
      bluryOverlay={true}
      title="Supply"
      isOpen={disclosure.isOpen}
      onClose={disclosure.onClose}
      isCentered
      size={'xl'}
      bodyProps={{
        gap: 6,
        shadow: 'Up for Blocks',
      }}
    >
      <SupplyLiquidityContent data={data} onConfirm={onConfirm} />
    </Modal>
  )
}
const SupplyLiquidityContent = ({
  data,
  onConfirm = () => {},
}: {
  data: UseAddLiquidityData
  onConfirm: () => void
}) => {
  const networkId = useCurrentSupportedNetworkId()
  const { pair, tokenA, tokenB, amountADesired, amountBDesired } = data
  const [needsApproveA, requestApproveA, approveLabel] = useApprovalWhenNeeded(
    tokenA,
    ROUTER_ADDRESS[networkId],
    parseUnits(amountADesired.toFixed(tokenA.decimals)),
  )
  const [needsApproveB, requestApproveB, approveLabelB] = useApprovalWhenNeeded(
    tokenB,
    ROUTER_ADDRESS[networkId],
    parseUnits(amountBDesired.toFixed(tokenB.decimals)),
  )
  const differenceBetweenAandB = +amountADesired?.toExact() / +amountBDesired?.toExact()
  const differenceBetweenBandA = +amountBDesired?.toExact() / +amountADesired?.toExact()

  const userPool =
    pair && amountADesired
      ? (100 / +pair.reserveOf(tokenA).add(amountADesired).toFixed()) * +amountADesired.toFixed()
      : 100
  return (
    <>
      <Text fontSize="3xl">
        {tokenA.symbol}/{tokenB.symbol} Pool Tokens
      </Text>
      <HStack justifyContent={'center'}>
        <CurrencyIcon currency={tokenA} />
        <CurrencyIcon currency={tokenB} />
      </HStack>
      <Box borderRadius={'2xl'} p={6} shadow={'down'}>
        <PositionInfoItem
          label="Rates"
          value={`1  ${tokenA.symbol} = ${differenceBetweenBandA.toPrecision(5)}
          ${tokenB.symbol}`}
        />
        <PositionInfoItem
          label=""
          value={`1  ${tokenB.symbol} = ${differenceBetweenAandB.toPrecision(5)}  ${tokenA.symbol}`}
        />
        <PositionInfoItem
          mt={8}
          color={'text.low'}
          label={`${tokenA.symbol} Deposited`}
          value={`${amountADesired.toSignificant()} ${tokenA.symbol}`}
        />
        <PositionInfoItem
          color={'text.low'}
          label={`${tokenB.symbol} Deposited`}
          value={`${amountBDesired.toSignificant()} ${tokenB.symbol}`}
        />
        <PositionInfoItem color={'text.low'} label="Share Pool" value={`${userPool.toFixed(3)}%`} />
      </Box>
      {needsApproveA && (
        <Button mt={2} p={6} fontSize={'2xl'} variant={'primary'} onClick={() => requestApproveA()}>
          {approveLabel}
        </Button>
      )}
      {needsApproveB && (
        <Button mt={2} p={6} fontSize={'2xl'} variant={'primary'} onClick={() => requestApproveB()}>
          {approveLabelB}
        </Button>
      )}
      {!needsApproveA && !needsApproveB && (
        <Button mt={2} p={6} fontSize={'2xl'} variant={'primary'} onClick={onConfirm}>
          Confirm Supply
        </Button>
      )}
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
