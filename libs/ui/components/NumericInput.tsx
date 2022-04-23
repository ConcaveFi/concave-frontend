import { Input as ChakraInput, InputProps } from '@chakra-ui/react'
import React from 'react'
import NumberFormat, { NumberFormatProps } from 'react-number-format'

export type NumericInputProps = NumberFormatProps<InputProps>
export const NumericInput = (props: NumericInputProps) => {
  return (
    <ChakraInput
      as={NumberFormat}
      thousandSeparator
      variant="unstyled"
      inputMode="decimal"
      size="unset"
      placeholder="0.0"
      allowedDecimalSeparators={['.', ',']}
      allowLeadingZeros
      allowNegative={false}
      isNumericString
      fontFamily="heading"
      fontWeight="bold"
      _placeholder={{ color: 'text.low' }}
      {...props}
    />
  )
}
