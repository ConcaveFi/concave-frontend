import { Input as ChakraInput, InputProps } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import NumberFormat, {
  NumberFormatProps,
  NumberFormatValues,
  SourceInfo,
} from 'react-number-format'

type OwnProps = {
  onChangeValue?: NumberFormatProps['onValueChange']
}
export type NumericInputProps = OwnProps & InputProps & NumberFormatProps
export const NumericInput = ({
  onChange,
  onValueChange,
  onChangeValue,
  ...props
}: NumericInputProps) => {
  /**
   * The method onValueChange is called allways that value is changed, and it can make a new bugs like this https://codesandbox.io/s/react-number-format-demo-forked-qj310g?file=/demo.js
   */
  const ctx: { value?: NumberFormatValues; sourceInfo?: SourceInfo } = {}
  return (
    <ChakraInput
      as={NumberFormat}
      thousandSeparator
      variant="unstyled"
      placeholder="0.0"
      fontFamily="heading"
      fontWeight={700}
      onChange={(...args) => {
        onChange?.(...args)
        onChangeValue?.(ctx.value, ctx.sourceInfo)
      }}
      onValueChange={(value, sourceInfo) => {
        ctx.value = value
        ctx.sourceInfo = sourceInfo
        onValueChange?.(value, sourceInfo)
      }}
      fontSize={24}
      _placeholder={{ color: 'text.low' }}
      {...props}
    />
  )
}
