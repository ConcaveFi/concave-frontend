import { Box, HStack, Input, Text } from '@concave/ui'
import { useUnixTimestamp } from 'hooks/useUnixTimestamp'
import { useRef } from 'react'

const removeTime = (date = new Date()) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}
const addTime = (date = new Date()) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59)
}

export const EpochDateField = (params: {
  label: string
  minDate: number
  maxDate: number
  date: number
  onChange: (value: number) => void
}) => {
  const {
    current: { minDate, maxDate, date, label, onChange },
  } = useRef(params)
  const now = Date.now() / 1000

  const unixTimestamp = useUnixTimestamp({
    min: removeTime(new Date(minDate * 1000)),
    max: new Date(maxDate * 1000),
    date: new Date((date > now ? date : now) * 1000),
    onChange: (date) => onChange(addTime(date).getTime() / 1000),
  })
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
          {...unixTimestamp.inputDateProps}
        ></Input>
      </Box>
    </HStack>
  )
}
