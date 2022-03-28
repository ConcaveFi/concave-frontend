import { Flex, FlexProps, NumericInput, Stack, Text } from '@concave/ui'
import { useCurrency } from 'hooks/useCurrency'
import { TokenType } from 'lib/tokens'
import React from 'react'
import { InputContainer } from './InputContainer'
import { Select } from './Select'

export function Input({
  children,
  value,
  price,
  selected,
  commonBases,
  onChangeValue,
  onSelectToken,
  ...flexProps
}: {
  value: string
  price: number
  selected: TokenType
  commonBases: TokenType[]
  symbol: string
  maxAmount: number
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
        <Flex direction={'column'} justifyContent={'space-between'} minW={'130px'} w={'auto'}>
          <Select commonBases={commonBases} onSelect={onSelectToken} selected={selected} />
          {children}
        </Flex>
      </InputContainer>
    </Flex>
  )
}
