import { Box, HStack, Input, Text } from '@concave/ui'
import { useState } from 'react'

export const EpochDateField = ({
  unixTimestap,
  label,
  onChange,
}: {
  label: string
  unixTimestap: number | Date
  onChange: (value: number) => void
}) => {
  const date = unixTimestap instanceof Date ? unixTimestap : new Date(unixTimestap * 1000)
  const [value, setValue] = useState(date)
  return (
    <HStack justifyContent={'center'} width={'full'}>
      <Text textColor={'text.low'} textAlign={'right'} fontWeight="bold" width={'full'}>
        {label}
      </Text>
      <Box width={'full'}>
        <Input
          width={'full'}
          height={'30px'}
          padding={2}
          borderRadius="full"
          type="date"
          value={value.toISOString().substring(0, 10)}
          onChange={({ target }) => {
            setValue(target.valueAsDate)
            onChange(target.valueAsDate.getTime() / 1000)
          }}
        ></Input>
      </Box>
    </HStack>
  )
}
