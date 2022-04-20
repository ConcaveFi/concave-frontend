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
import { TokenInput } from 'components/AMM/TokenInput'
import { parseInputAmount } from 'components/AMM/utils/parseInputAmount'
import { CurrencyIcon } from 'components/CurrencyIcon'
import { TransactionSubmittedModal } from 'components/TransactionSubmittedModal'
import { useAddLiquidity, UseAddLiquidityData } from 'hooks/useAddLiquidity'
import { useApprovalWhenNeeded } from 'hooks/useAllowance'
import React from 'react'
import { chain, useBalance } from 'wagmi'

export const AddLiquidityContent = ({ userAddress }: { userAddress: string }) => {
  const supplyLiquidityModal = useDisclosure()
  const [data, setters, call, clear] = useAddLiquidity(chain.ropsten, userAddress)
  const { amountADesired, amountBDesired, tokenA, tokenB } = data
  const { setAmountADesired, setTokenA, setTokenB, setAmountBDesired } = setters
  const valid = tokenA && tokenB && amountADesired && amountBDesired
  const [{ data: balanceA }] = useBalance({
    addressOrName: userAddress,
    token: tokenA?.address,
    formatUnits: tokenA?.decimals,
  })
  const [{ data: balanceB }] = useBalance({
    addressOrName: userAddress,
    token: tokenB?.address,
    formatUnits: tokenB?.decimals,
  })

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
        <TokenInput
          currencyAmount={amountADesired}
          currency={tokenA}
          onChangeValue={(value) => {
            setAmountADesired(parseInputAmount(value, tokenA))
          }}
          onSelectCurrency={(token) => {
            setTokenA(token)
          }}
        >
          <HStack></HStack>
        </TokenInput>
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
        <TokenInput
          currencyAmount={amountBDesired}
          currency={tokenB}
          onChangeValue={(value) => {
            setAmountBDesired(parseInputAmount(value, tokenB))
          }}
          onSelectCurrency={(token) => {
            setTokenB(token)
          }}
        >
          <HStack></HStack>
        </TokenInput>
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
  const [needsApproveA, requestApproveA, loadingApproveA] = useApprovalWhenNeeded(
    tokenA,
    '0xc9c07a4526915014bc60791fca2eef51975a3694',
    userAddress,
    amountADesired.toExact(),
  )
  const [needsApproveB, requestApproveB, loadingApproveB] = useApprovalWhenNeeded(
    tokenB,
    '0xc9c07a4526915014bc60791fca2eef51975a3694',
    userAddress,
    amountBDesired.toExact(),
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
          value={`${amountADesired.toExact()} ${tokenA.symbol}`}
        />
        <PositionInfoItem
          color={'text.low'}
          label={`${tokenB.symbol} Deposited`}
          value={`${amountBDesired.toExact()} ${tokenB.symbol}`}
        />
        <PositionInfoItem color={'text.low'} label="Share Pool" value={'2.786%'} />
      </Box>
      {needsApproveA && (
        <Button mt={2} p={6} fontSize={'2xl'} variant={'primary'} onClick={() => requestApproveA()}>
          {!loadingApproveA
            ? `Approve to use ${amountADesired.toExact()} ${tokenA.symbol}`
            : 'approving'}
        </Button>
      )}
      {needsApproveB && (
        <Button mt={2} p={6} fontSize={'2xl'} variant={'primary'} onClick={() => requestApproveB()}>
          {!loadingApproveB
            ? `Approve to use ${amountBDesired.toExact()} ${tokenB.symbol}`
            : 'approving'}
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
