import { Box, HStack, Input, Text } from '@concave/ui'
import { useUnixTimestamp } from 'hooks/useUnixTimestamp'

export const EpochDateField = ({
  minDate,
  maxDate,
  date,
  label,
  onChange,
}: {
  label: string
  minDate: number
  maxDate: number
  date: number
  onChange: (value: number) => void
}) => {
  const unixTimestamp = useUnixTimestamp({
    min: new Date(minDate * 1000),
    max: new Date(maxDate * 1000),
    date: new Date(date * 1000),
    onChange: (date) => onChange(date.getTime() / 100),
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
