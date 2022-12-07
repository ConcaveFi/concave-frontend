import { Currency } from '@concave/core'
import { ExpandArrowIcon, WarningTwoIcon } from '@concave/icons'
import {
  Box,
  Button,
  Checkbox,
  Flex,
  HStack,
  Modal,
  NumericInput,
  StackDivider,
  Text,
} from '@concave/ui'
import { CurrencyIcon } from 'components/CurrencyIcon'
import { UseTransaction } from 'hooks/TransactionsRegistry/useTransaction'
import { useState } from 'react'
import { useBondSpotPrice, useRoi } from './BondInfo'

const TokenInfo = ({
  currency,
  amount,
}: {
  address: string
  symbol: string
  price: string | number
  currency: Currency
  amount: string | number
  loss?: number
}) => {
  return (
    <Flex
      borderRadius={'3xl'}
      justifyContent={'space-between'}
      boxShadow={'Down Medium'}
      px={5}
      p={4}
    >
      <Box w={200}>
        <NumericInput disabled fontSize={'32px'} decimalScale={5} value={amount} />
        <Text fontWeight={700} fontSize={14} textColor="text.low"></Text>
      </Box>
      <HStack>
        <CurrencyIcon width={'32px'} currency={currency} />
        <Text fontSize={24} fontWeight={700}>
          {currency.symbol.toUpperCase()}
        </Text>
      </HStack>
    </Flex>
  )
}

const InOutArrow = () => {
  return (
    <Flex align="center" justify="center" mt={-3}>
      <Box
        shadow="Up Small"
        px={3}
        py={1}
        bgGradient="linear(to-tr, blackAlpha.500 1%, transparent 90%)"
        rounded="3xl"
      >
        <ExpandArrowIcon w="18px" h="18px" />
      </Box>
    </Flex>
  )
}

export const ConfirmBondModal = ({
  currencyIn,
  currencyOut,
  amountIn,
  amountOut,
  isOpen,
  onClose,
  bondPrice,
  minimumAmountOut,
  slippage,
  transaction,
}: {
  transaction: UseTransaction
  currencyIn: Currency
  currencyOut: Currency
  amountIn: string | number
  amountOut: string
  tokenInUsdPrice: string
  tokenInRelativePriceToTokenOut: string
  isOpen: boolean
  onClose: () => void
  bondPrice: string
  minimumAmountOut: string
  slippage: string
}) => {
  const [agree, setAgree] = useState(false)
  const bondSpot = useBondSpotPrice()
  const roi = useRoi(bondSpot)

  const negativeRoi = roi.data < 0

  const onCloseModal = () => {
    setAgree(false)
    onClose()
  }

  return (
    <Modal bluryOverlay={true} title="Confirm bond" isOpen={isOpen} onClose={onCloseModal}>
      <div>
        <TokenInfo
          currency={currencyIn}
          address={currencyIn.isToken ? currencyIn.address : currencyIn.symbol}
          symbol={currencyIn.symbol}
          amount={amountIn}
          price={amountIn}
        />
        <InOutArrow />
        <TokenInfo
          currency={currencyOut}
          address={currencyOut.isToken ? currencyOut.address : currencyOut.symbol}
          symbol={currencyOut.symbol}
          amount={amountOut}
          price={amountOut}
        />
      </div>

      <Flex fontSize="sm" fontWeight="bold" my={6} justify="center" flexWrap="wrap">
        <Text>Bond Price CNV: ${parseFloat(bondPrice).toFixed(2)}</Text>
      </Flex>

      <Flex direction="column" borderRadius="3xl" mb={8} p={6} shadow="Down Medium">
        <Text align="center" fontSize="sm" fontWeight="bold">
          Min CNV Out: {minimumAmountOut}
        </Text>
        <StackDivider borderRadius="full" mx={-4} my={4} h={0.5} bg="stroke.secondary" />
        <Text align="center" fontSize="sm" fontWeight="bold">
          Slippage: {slippage}%
        </Text>
      </Flex>

      {negativeRoi && (
        <Flex color={'yellow.100'} direction="column" align={'center'}>
          <WarningTwoIcon boxSize={'25px'} color="yellow.100" />
          <Text textAlign={'center'}>
            Current bond roi Is{' '}
            <Text color={'red.300'} as="strong">
              negative
            </Text>
            , <br /> are you sure you want to bond anyway? <br /> You may lose money.
          </Text>
        </Flex>
      )}
      {negativeRoi && (
        <Flex px={2} gap={4} mt={3} mb={1}>
          <Checkbox defaultChecked={agree} onChange={(v) => setAgree(!agree)} />
          <Text color={'text.low'}>
            I understand that bond roi is{' '}
            <Text as={'strong'} color="red.300">
              {roi.data.toFixed(2) || '0'}%
            </Text>
          </Text>
        </Flex>
      )}

      <Button
        variant="primary"
        size="large"
        onClick={transaction.sendTx}
        disabled={transaction.isWaitingForConfirmation || (roi.data < 0 && !agree)}
        w="full"
      >
        {transaction.isWaitingForConfirmation ? 'Confirm in wallet' : 'Confirm bond'}
      </Button>
    </Modal>
  )
}
