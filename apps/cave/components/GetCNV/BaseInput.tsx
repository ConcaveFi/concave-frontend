import { Input, InputProps } from '@concave/ui'
import React from 'react'
import NumberFormat, { NumberFormatProps } from 'react-number-format'

export const BaseInput = (props: InputProps & NumberFormatProps) => (
  <Input
    as={NumberFormat}
    thousandSeparator
    variant="unstyled"
    placeholder="0.0"
    fontFamily="heading"
    fontWeight={700}
    fontSize={24}
    _placeholder={{ color: 'text.high' }}
    {...props}
  />
)
