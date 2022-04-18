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
      size="unset"
      placeholder="0.0"
      fontFamily="heading"
      fontWeight="bold"
      _placeholder={{ color: 'text.low' }}
      {...props}
    />
  )
}
