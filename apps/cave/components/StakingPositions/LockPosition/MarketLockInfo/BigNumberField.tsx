import { Currency } from '@concave/core'
import { Box, HStack, NumericInput, Text } from '@concave/ui'
import { BigNumber, utils } from 'ethers'
import { parseUnits } from 'ethers/lib/utils'
import { useEffect, useState } from 'react'

const useBignumberField = (
  currency: Currency,
  onChange: (n: BigNumber) => void,
  defaultValue?: BigNumber,
) => {
  const [value, setValue] = useState(defaultValue ? +utils.formatEther(defaultValue) : ``)
  useEffect(() => {
    try {
      const bigNumber = parseUnits(value.toString() || `0`, currency.decimals)
      onChange(bigNumber)
    } catch (e) {
      onChange(BigNumber.from(0))
    }
  }, [value, onChange, currency.decimals])

  const onValueChange = (values, sourceInfo) => {
    if (sourceInfo.source === 'prop') return
    setValue(values.value)
  }
  return { value, onValueChange }
}

export const BigNumberField = ({
  label,
  defaultValue,
  onChange,
  currency,
  decimalScale = 5,
}: {
  label: string
  currency: Currency
  decimalScale: number
  defaultValue?: BigNumber
  onChange: (number: BigNumber) => void
}) => {
  const state = useBignumberField(currency, onChange, defaultValue)

  return (
    <HStack justifyContent={'center'} width={'full'}>
      <Text textColor={'text.low'} textAlign={'right'} fontWeight="bold" width={'full'}>
        {label}
      </Text>
      <Box width={'full'}>
        <NumericInput
          width={'full'}
          shadow={'Down Big'}
          borderRadius={'full'}
          maxLength={12}
          decimalScale={decimalScale}
          p={1}
          pl={4}
          {...state}
        />
      </Box>
    </HStack>
  )
}
