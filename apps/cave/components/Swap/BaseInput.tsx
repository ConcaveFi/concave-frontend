import { Input, InputProps } from '@concave/ui'
import React from 'react'

export const BaseInput = (props: InputProps) => (
  <Input
    variant="unstyled"
    type="number"
    placeholder="0.0"
    fontFamily="heading"
    fontWeight={700}
    fontSize={24}
    _placeholder={{ color: 'text.high' }}
    {...props}
  />
)
