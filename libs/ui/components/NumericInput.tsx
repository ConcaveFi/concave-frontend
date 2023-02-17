import { Input as ChakraInput, InputProps } from '@chakra-ui/react'
import { NumericFormat, NumericFormatProps } from 'react-number-format'

export type NumericInputProps = NumericFormatProps<InputProps>
export const NumericInput = (props: NumericInputProps) => {
  return (
    <ChakraInput
      as={NumericFormat}
      variant="unstyled"
      inputMode="decimal"
      size="unset"
      placeholder="0.0"
      allowedDecimalSeparators={['.', ',']}
      thousandsGroupStyle="thousand" 
      thousandSeparator
      allowLeadingZeros
      allowNegative={false}
      fontFamily="heading"
      fontWeight="bold"
      _placeholder={{ color: 'text.low' }}
      {...props}
    />
  )
}
