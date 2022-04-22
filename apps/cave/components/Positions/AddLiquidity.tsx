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
import { BigNumber } from 'ethers'
import { ROUTER_ADDRESS } from 'gemswap-sdk'
import { useAddLiquidity, UseAddLiquidityData } from 'hooks/useAddLiquidity'
import { useApprovalWhenNeeded } from 'hooks/useAllowance'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import React from 'react'
import { chain } from 'wagmi'

export const AddLiquidityContent = ({ userAddress }: { userAddress: string }) => {
  const supplyLiquidityModal = useDisclosure()
  const [data, setters, call, clear] = useAddLiquidity(chain.ropsten, userAddress)
  const { amountADesired, amountBDesired, tokenA, tokenB } = data
  const { updateInputValue, updateOutputValue, updateTokenA, updateTokenB, setTokenA, setTokenB } =
    setters
  const valid = tokenA && tokenB && amountADesired && amountBDesired
  return (
    <>
      <Card variant="secondary" p={4} backgroundBlendMode={'screen'}>
        <Text fontSize="lg">
          Tip: When you add liquidity, you will receive pool tokens representing your position.
          These tokens automatically earn fees proportional to your share of the pool, and can be
          redeemed at any time.
        </Text>
      </Card>
      <Flex direction={'column'} p={4} gap={2}>
        <InputField
          currencyIn={tokenA}
          currencyAmountIn={amountADesired}
          updateInputValue={updateInputValue}
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
          updateInputValue={updateOutputValue}
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
        isDisabled={!valid}
        bg={'rgba(113, 113, 113, 0.01)'}
      >
        <Text
          fontSize={'2xl'}
          onClick={() => {
            console.log('open modal')
            supplyLiquidityModal.onOpen()
          }}
        >
          Add Liquidity
        </Text>
      </Button>

      {valid ? (
        <SupplyLiquidityModal disclosure={supplyLiquidityModal} data={data} onConfirm={call} />
      ) : (
        <></>
      )}
      {data?.hash ? (
        <TransactionSubmittedModal
          disclosure={supplyLiquidityModal}
          hash={data.hash}
          onClose={clear}
        />
      ) : (
        <></>
      )}
    </>
  )
}

const SupplyLiquidityModal = ({
  disclosure,
  data,
  onConfirm = () => {},
}: {
  disclosure: UseDisclosureReturn
  data: UseAddLiquidityData
  onConfirm: () => void
}) => {
  const { tokenA, tokenB, amountADesired, amountBDesired, userAddress } = data
  const networkId = useCurrentSupportedNetworkId()
  const [needsApproveA, requestApproveA, approveStatusA, approveLabel] = useApprovalWhenNeeded(
    tokenA,
    ROUTER_ADDRESS[networkId],
    userAddress,
    BigNumber.from(100000000000000),
  )
  const [needsApproveB, requestApproveB, approveStatusB, approveLabelB] = useApprovalWhenNeeded(
    tokenB,
    ROUTER_ADDRESS[networkId],
    userAddress,
    BigNumber.from(10000000000000),
  )
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
          value={`1  ${tokenA.symbol} =  ${
            1 // usePrecision(wrapperTokenA.price / wrapperTokenB.price).formatted
          } ${tokenB.symbol}`}
        />
        <PositionInfoItem
          label=""
          value={`1  ${tokenB.symbol} =  ${
            1 // usePrecision(wrapperTokenB.price / wrapperTokenA.price).formatted
          } ${tokenA.symbol}`}
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
        <PositionInfoItem color={'text.low'} label="Share Pool" value={'2.786%'} />
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
      {!needsApproveA && !needsApproveA && (
        <Button mt={2} p={6} fontSize={'2xl'} variant={'primary'} onClick={onConfirm}>
          Confirm Supply
        </Button>
      )}
    </Modal>
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
