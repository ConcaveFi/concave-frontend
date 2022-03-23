import { Flex, FlexProps, NumericInput, Stack, Text } from '@concave/ui'
import { useCurrency } from 'hooks/useCurrency'
import React from 'react'
import { InputContainer } from './InputContainer'
import { Select } from './Select'

export function Input({
  children,
  value,
  price,
  symbol,
  tokenOptions,
  onChangeValue,
  onSelectToken,
  ...flexProps
}: {
  symbol: string
  value: string
  price: number
  tokenOptions: string[]
  onChangeValue: (value: number) => void
  onSelectToken: (token: string) => void
} & FlexProps) {
  return (
    <Flex direction="column" px={5} {...flexProps}>
      <InputContainer shadow="down" justifyContent={'space-between'}>
        <Stack justifyContent={'space-between'}>
          <NumericInput
            decimalScale={5}
            w={'100%'}
            value={+value ? value : ''}
            onChangeValue={(value) => {
              if (!value) return
              const { floatValue } = value
              onChangeValue(floatValue)
            }}
          />
          <Text fontWeight={'bold'} textColor={'text.low'}>
            {useCurrency(price * +value)}
          </Text>
        </Stack>
        <Flex direction={'column'} align={'flex-end'} minW={'130px'} w={'auto'}>
          <Select tokens={tokenOptions} onSelect={onSelectToken} selected={symbol} />
          {children}
        </Flex>
      </InputContainer>
    </Flex>
  )
}
