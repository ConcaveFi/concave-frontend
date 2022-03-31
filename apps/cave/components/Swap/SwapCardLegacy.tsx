import { ExpandArrowIcon, GasIcon } from '@concave/icons'
import {
  Button,
  Card,
  CardProps,
  Flex,
  HStack,
  StackDivider,
  Text,
  useDisclosure,
} from '@concave/ui'
import { Currency } from '@uniswap/sdk-core'
import { useAuth } from 'contexts/AuthContext'
import { useCurrency } from 'hooks/useCurrency'
import { useGasPrice } from 'hooks/useGasPrice'
import { useRoundPrecision } from 'hooks/usePrecision'
import React from 'react'
import { ConfirmSwap } from './ConfirmSwap'
import { Settings } from './Settings'
import { TokenBalance } from './TokenBalance'
import { TokenInput } from './TokenInput'
import { TransactionStatusModal } from './TransactionStatus'
import { TransactionSubmitted } from './TransactionSubmitted'
import { UseSwap } from './useSwap'

export function SwapCardLegacy({
  buttonLabel,
  swap,
  ...cardProps
}: {
  buttonLabel: string
  swap: UseSwap
} & CardProps) {
  const confirm = useDisclosure()
  const status = useDisclosure()
  const submitted = useDisclosure()
  const x = useAuth()

  return (
    <Card gap={2} p={6} h="fit-content" shadow="Block Up" {...cardProps}>
      <TokenInput
        value={'' + swap.fromAmount}
        currency={swap.from.token}
        onChangeValue={(value: string) => {
          swap.setFromAmount(value)
        }}
        onChangeCurrency={(token: Currency) => {
          swap.setFromSymbol(token.symbol)
        }}
      >
        <TokenBalance
          value={swap.from.balance?.formatted}
          onClick={() => swap.setFromAmount(swap.from.balance?.formatted)}
        />
      </TokenInput>
      <Switch swap={swap} />
      <TokenInput
        value={'' + swap.toAmount}
        currency={swap.to.token}
        onChangeValue={swap.setToAmount}
        onChangeCurrency={(token: Currency) => {
          swap.setToSymbol(token.symbol)
        }}
      >
        <Text
          py={1}
          px={3}
          fontWeight={400}
          fontSize={'xs'}
          textAlign={'right'}
          textColor="text.low"
        >
          Balance: {useRoundPrecision(+swap.to.balance?.formatted).formatted}
        </Text>
      </TokenInput>
      <HStack
        divider={
          <StackDivider
            borderColor={'transparent'}
            bg={'stroke.secondary'}
            boxShadow={'1px 0px 2px #101317'}
            borderRadius={'3xl'}
            style={{
              marginTop: '4px',
            }}
            mt={8}
            h={8}
            w={0.5}
          />
        }
        align="center"
        justify="center"
      >
        <HStack>
          <HStack justifyContent={'center'} flexWrap={'wrap'}>
            <Text fontSize="xs">
              1 {swap.to.token?.symbol} ={' '}
              {useRoundPrecision(swap.to.price / swap.from.price).formatted}{' '}
              {swap.from.token?.symbol}
            </Text>
            <Text paddingRight={2} fontSize="xs" textColor="text.low">
              ({useCurrency(swap.to.price)})
            </Text>
          </HStack>
          <GasIcon viewBox="0 0 16 16" />
          <Text fontSize="xs" textColor="text.low">
            {useGasPrice()}
          </Text>
        </HStack>
        <Settings onClose={console.log} />
      </HStack>

      <TransactionStatusModal
        isOpen={false}
        onClose={() => {
          status.onClose()
          submitted.onOpen()
        }}
      />

      <ConfirmSwap
        isOpen={false}
        swap={swap}
        onClose={() => {
          status.onOpen()
          confirm.onClose()
        }}
      />

      <TransactionSubmitted
        isOpen={false}
        swap={swap}
        onClose={() => {
          submitted.onClose()
        }}
      />
      <Button variant="primary" size="large" isFullWidth onClick={confirm.onOpen}>
        {buttonLabel}
      </Button>
    </Card>
  )
}

const Switch = ({ swap }: { swap: UseSwap }) => {
  return (
    <Flex align="center" justify="center">
      <Button
        shadow={'Up Small'}
        _focus={{ boxShadow: 'Up Small' }}
        padding={'4px 14px 4px 14px'}
        bgColor="rgba(156, 156, 156, 0.01);"
        minW="43"
        maxH="26"
        onClickCapture={swap.switchTokens}
        borderRadius={'full'}
      >
        <ExpandArrowIcon />
      </Button>
    </Flex>
  )
}
