import { Flex, FlexProps, NumericInput, Stack, Text } from '@concave/ui'
import { useCurrency } from 'hooks/useCurrency'
import React from 'react'
import { InputContainer } from './InputContainer'
import { MaxAmount } from './MaxAmount'
import { Select } from './Select'
import { Token } from './useSwap'

export function Input({
  token,
  maxAmount,
  onChangeValue,
  tokenOptions,
  onSelectToken,
  ...flexProps
}: {
  token: Token
  tokenOptions: string[]
  onChangeValue: (value: number) => void
  onSelectToken: (token: string) => void
  maxAmount?: number
} & FlexProps) {
  return (
    <Flex direction="column" px={5} {...flexProps}>
      <InputContainer shadow="down" justifyContent={'space-between'}>
        <Stack justifyContent={'space-between'}>
          <NumericInput
            max={maxAmount}
            value={token.amount}
            onChangeValue={({ floatValue }) => {
              onChangeValue(floatValue)
            }}
          />
          <Text fontWeight={'bold'} textColor={'text.low'}>
            {useCurrency(token.price * +token.amount)}
          </Text>
        </Stack>
        <Stack>
          <Select tokens={tokenOptions} onSelect={onSelectToken} selected={token.symbol} />
          {maxAmount && (
            <MaxAmount
              label="Balance:"
              max={token.maxAmount}
              onClick={() => onChangeValue(token.maxAmount)}
            />
          )}
        </Stack>
      </InputContainer>
    </Flex>
  )
}
