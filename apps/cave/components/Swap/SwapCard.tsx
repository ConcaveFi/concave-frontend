import React from 'react'
import {
  Text,
  Button,
  HStack,
  Flex,
  StackDivider,
  Card,
  NumericInput,
  CardProps,
} from '@concave/ui'
import { ExpandArrowIcon, SwapSettingsIcon } from '@concave/icons'
import { GasIcon } from '@concave/icons'
import { SwapSettingsModal } from './SwapSettings'
import { SwapSettingsCard } from './SwapSettingsCard'
import { UseSwap } from './useSwap'
import { useCurrency } from 'hooks/useCurrency'
import { useGasPrice } from 'hooks/useGasPrice'
import { Input } from './Input'

export function SwapCard({
  buttonLabel,
  swap,
  active,
  ...cardProps
}: {
  buttonLabel: string
  active: string
  swap: UseSwap
} & CardProps) {
  return (
    <Card {...cardProps}>
      <Input
        token={swap.from}
        maxAmount={swap.from.maxAmount}
        onChangeValue={(amount) => {
          swap.setFrom({ ...swap.from, amount })
        }}
        tokenOptions={swap.inputTokens}
        onSelectToken={(symbol) => swap.setFrom({ ...swap.from, symbol })}
      />
      <Flex align="center" justify="center">
        <Button
          shadow={'outsideDown'}
          _focus={{ boxShadow: 'outsideDown' }}
          as={Button}
          padding={'4px 14px 4px 14px'}
          bgColor="rgba(156, 156, 156, 0.01);"
          minW="43"
          maxH="26"
          onClickCapture={swap.swithTokens}
          borderRadius={'full'}
        >
          <ExpandArrowIcon />
        </Button>
      </Flex>
      <Input
        token={swap.to}
        tokenOptions={swap.outputTokens}
        onChangeValue={(amount) => swap.setTo({ ...swap.to, amount })}
        onSelectToken={(symbol) => {
          swap.setTo({ ...swap.to, symbol })
        }}
      />
      <HStack
        divider={<StackDivider boxShadow={'1px 0px 2px #101317'} />}
        margin="1"
        align="center"
        justify="center"
      >
        <HStack>
          <HStack justifyContent={'center'} flexWrap={'wrap'}>
            <Text fontSize="xs">
              1 {swap.to.symbol} = {(swap.to.price / swap.from.price).toFixed(4)} {swap.from.symbol}
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
        <SwapSettingsModal>
          <SwapSettingsIcon viewBox="0 0 20 25" cursor={'pointer'} />
          <SwapSettingsCard swap={swap}></SwapSettingsCard>
        </SwapSettingsModal>
      </HStack>
      <Button
        shadow={
          '20px -20px 39px rgba(120, 182, 255, 0.25), 0px 5px 14px rgba(0, 0, 0, 0.47), inset 0px -10px 20px rgba(117, 164, 255, 0.5);'
        }
        fontSize="2xl"
        variant="primary"
        size="large"
        isFullWidth
      >
        {buttonLabel}
      </Button>
    </Card>
  )
}
