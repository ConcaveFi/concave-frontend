import { Box, HStack, NumericInput, Text } from '@concave/ui'
import { BigNumber, utils } from 'ethers'
import { parseUnits } from 'ethers/lib/utils'
import { useEffect, useState } from 'react'

export const BigNumberField = ({
  label,
  defaultValue,
  onChange,
}: {
  label: string
  defaultValue: BigNumber
  onChange: (number: BigNumber) => void
}) => {
  const [value, setValue] = useState(utils.formatEther(defaultValue))
  useEffect(() => {
    try {
      const bigNumber = parseUnits(value.toString() || `0`, 18)
      onChange(bigNumber)
    } catch (e) {
      onChange(BigNumber.from(0))
    }
  }, [value, onChange])

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
          value={value}
          decimalScale={5}
          p={1}
          pl={4}
          onValueChange={(values, sourceInfo) => {
            if (sourceInfo.source === 'prop') return
            setValue(values.value)
          }}
        />
      </Box>
    </HStack>
  )
}
