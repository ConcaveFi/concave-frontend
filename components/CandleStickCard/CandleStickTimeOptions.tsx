import { Box, HStack, StackProps, useRadio, useRadioGroup } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { gradientStroke } from 'theme/utils/gradientStroke'

type OwnProps = StackProps & { onChangeInteral: (interval: number) => void }
export const CandleStickTimeOptions = ({ onChangeInteral, ...stackProps }: OwnProps) => {
  const intervals = {
    '5m': 5 * 60,
    '15m': 15 * 60,
    '1H': 60 * 60,
    '4H': 4 * 60 * 60,
    '1D': 24 * 60 * 60,
  }

  const { getRadioProps } = useRadioGroup({
    defaultValue: '5m',
    onChange: (a) => {
      onChangeInteral(intervals[a])
    },
  })
  return (
    <HStack
      py={1}
      px={2}
      borderRadius={'3xl'}
      boxShadow="-1px 1px 3px rgba(126, 162, 255, 0.26), inset 0px -5px 5px rgba(255, 255, 255, 0.02), inset -9px 12px 24px rgba(13, 17, 23, 0.49)"
      {...stackProps}
    >
      {Object.keys(intervals).map((value) => {
        const radio = getRadioProps({ value })
        return (
          <RadioCard key={value} {...radio}>
            {value}
          </RadioCard>
        )
      })}
    </HStack>
  )
}

const RadioCard = (props) => {
  const { getInputProps, getCheckboxProps } = useRadio(props)
  const input = getInputProps()
  const checkbox = getCheckboxProps()
  const checked = useMemo(() => {
    return { ...gradientStroke({}), borderRadius: '2xl' }
  }, [])
  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        minWidth={12}
        align="center"
        boxShadow="md"
        _checked={checked}
        px={2}
        py={1}
      >
        {props.children}
      </Box>
    </Box>
  )
}
