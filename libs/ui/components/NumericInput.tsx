import { Input as ChakraInput, InputProps } from '@chakra-ui/react'
import React from 'react'
import NumberFormat, { NumberFormatProps } from 'react-number-format'

export const NumericInput = (props: InputProps & NumberFormatProps) => (
  <ChakraInput
    as={NumberFormat}
    thousandSeparator
    variant="unstyled"
    placeholder="0.0"
    fontFamily="heading"
    fontWeight={700}
    fontSize={24}
    _placeholder={{ color: 'text.low' }}
    {...props}
  />
)
