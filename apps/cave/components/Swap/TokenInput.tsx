import { Flex, FlexProps, NumericInput, Stack, Text, useMultiStyleConfig } from '@concave/ui'
import { useCurrency } from 'hooks/useCurrency'
import React from 'react'
import { Token, TokenSelect } from './TokenSelect'

export function TokenInput({
  children,
  value,
  price,
  selected,
  onChangeValue,
  onSelectToken,
}: {
  value: string
  price: number
  selected?: Token
  onChangeValue: (value: number) => void
  onSelectToken: (token: Token) => void
} & FlexProps) {
  const styles = useMultiStyleConfig('Input', { variant: 'primary', size: 'unset' })

  return (
    <Flex
      sx={{ ...styles.field }}
      px={5}
      py={3}
      rounded="2xl"
      w="auto"
      shadow="down"
      justify="space-between"
    >
      <Stack justify="space-between">
        <NumericInput
          decimalScale={5}
          w="100%"
          value={+value ? value : ''}
          onChangeValue={(value) => {
            if (!value) return
            const { floatValue } = value
            onChangeValue(floatValue)
          }}
        />
        <Text fontWeight="bold" color="text.low">
          {useCurrency(price * +value)}
        </Text>
      </Stack>
      <Stack justify="center" align="end" minW="130px" w="auto">
        <TokenSelect onSelect={onSelectToken} selected={selected} />
        {children}
      </Stack>
    </Flex>
  )
}
