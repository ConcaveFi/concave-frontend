import React from 'react'
import { Text, Button, HStack, Stack, Flex, StackDivider, Card } from '@concave/ui'

import { ExpandArrowIcon } from '@concave/icons'
import { GasIcon } from '@concave/icons'
import { TransitionSettingsModalButton } from './TransactionSettings'
import { Select } from './Select'
import { SwapState } from 'hooks/useSwap'
import { BaseInput } from './BaseInput'
import { InputContainer } from './InputContainer'
import { MaxAmount } from './MaxAmount'

function FromInput({
  maxAmount,
  value,
  onChangeValue,
  tokenOptions,
  selectedToken,
  onSelectToken,
  balances,
}: {
  maxAmount: number
  value: string
  onChangeValue: (value: string) => void
  tokenOptions: string[]
  selectedToken: typeof tokenOptions[number]
  onSelectToken: (token: typeof selectedToken) => void
  balances: { [key: string]: number }
}) {
  return (
    <Flex direction="column" gap={1} px={5}>
      <InputContainer shadow="down">
        <Stack align="start">
          <BaseInput
            value={value}
            onValueChange={({ value }) => onChangeValue(value)}
            isAllowed={({ floatValue }) => floatValue <= maxAmount}
          />
          <Text fontWeight={'bold'} textColor={'text.low'}>
            $3,214
          </Text>
        </Stack>
        <Stack align="end">
          <Select tokens={tokenOptions} onSelect={onSelectToken} selected={selectedToken} />
          <MaxAmount
            label="Balance:"
            max={balances[selectedToken]}
            onClick={() => onChangeValue(maxAmount.toString())}
          />
        </Stack>
      </InputContainer>
    </Flex>
  )
}

function ToInput({
  maxAmount,
  value,
  onChangeValue,
  tokenOptions,
  selectedToken,
  onSelectToken,
  balances,
}: {
  maxAmount: number
  value: string
  onChangeValue: (value: string) => void
  tokenOptions: string[]
  selectedToken: typeof tokenOptions[number]
  onSelectToken: (token: typeof selectedToken) => void
  balances: { [key: string]: number }
}) {
  return (
    <Flex direction="column" gap={1} px={5}>
      <InputContainer shadow="down">
        <Stack align="start">
          <BaseInput
            value={value}
            onValueChange={({ value }) => onChangeValue(value)}
            isAllowed={({ floatValue }) => floatValue <= maxAmount}
          />
          <Text fontWeight={'bold'} textColor={'text.low'}>
            $3,380
          </Text>
        </Stack>
        <Stack align="end">
          <Select tokens={tokenOptions} onSelect={onSelectToken} selected={selectedToken} />
          <Text fontSize={'xs'} textColor={'text.low'}>
            Balance: {balances[selectedToken]}
          </Text>
        </Stack>
      </InputContainer>
    </Flex>
  )
}

export function SwapCard({
  buttonLabel,
  swap,
}: {
  buttonLabel: string
  active: string
  swap: SwapState
}) {
  return (
    <Card
      shadow="up"
      maxW="400"
      h={390}
      px={10}
      py={8}
      gap={2}
      bgGradient="linear(to-tr, secondary.150, secondary.100)"
      padding="8"
    >
      <FromInput
        maxAmount={100}
        balances={swap.balances}
        value={`${swap.inputTokenValue}`}
        onChangeValue={(from) => swap.setInputTokenValue(+from)}
        tokenOptions={swap.inputTokens}
        selectedToken={swap.selectedInputToken}
        onSelectToken={swap.setSelectedInputToken}
      />
      <Flex align="center" justify="center">
        <Button
          shadow={'outsideDown'}
          as={Button}
          padding={'4px 14px 4px 14px'}
          bgColor="rgba(156, 156, 156, 0.01);"
          minW="43"
          maxH="26"
          sx={{
            borderRadius: 'full',
            py: 2,
            px: 3,
            height: 'auto',
            fontWeight: 600,
          }}
        >
          <ExpandArrowIcon />
        </Button>
      </Flex>
      <ToInput
        maxAmount={100}
        balances={swap.balances}
        value={`${swap.outputTokenValue}`}
        onChangeValue={(to) => swap.setOutputTokenValue(+to)}
        tokenOptions={swap.outputTokens}
        selectedToken={swap.selectedOutputToken}
        onSelectToken={swap.setSelectedOutputToken}
      />
      <HStack
        divider={<StackDivider boxShadow={'1px 0px 2px #101317'} />}
        margin="1"
        align="center"
        justify="center"
      >
        <HStack>
          <Text fontWeight={700} fontSize="xs">
            1 {swap.selectedOutputToken} = {swap.valueInOutputToken} {swap.selectedInputToken}
          </Text>
          <Text paddingRight={2} fontWeight={700} fontSize="xs" textColor="text.low">
            (${swap.priceInUSD})
          </Text>
          <GasIcon viewBox="0 0 16 16" />
          <Text fontWeight={700} fontSize="xs" textColor="text.low">
            ${swap.gasPrice}
          </Text>
        </HStack>
        <TransitionSettingsModalButton swap={swap} />
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
