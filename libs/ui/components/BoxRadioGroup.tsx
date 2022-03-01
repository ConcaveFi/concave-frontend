import { Box, useRadio, useRadioGroup, UseRadioProps } from '@chakra-ui/react'
import { gradientStroke } from '../theme/utils/gradientStroke'
import React, { useMemo } from 'react'

type BoxRadioGroup<T> = {
  defaultValue?: string
  onChange: (value: T) => void
  options: { [key: string]: T }
}

export const BoxRadioGroup = <T extends unknown>({
  options,
  onChange = console.log,
  defaultValue = Object.keys(options)[0],
}: BoxRadioGroup<T>) => {
  const { getRadioProps } = useRadioGroup({
    defaultValue,
    onChange: (a) => {
      onChange(options[a])
    },
  })
  return (
    <>
      {Object.keys(options).map((value) => {
        const radio = getRadioProps({ value })
        return (
          <RadioCard key={value} {...radio}>
            {value}
          </RadioCard>
        )
      })}
    </>
  )
}

const RadioCard: React.FC = (props: UseRadioProps & { children: React.FC }) => {
  const { getInputProps, getCheckboxProps } = useRadio(props)
  const input = getInputProps()
  const checkbox = getCheckboxProps()
  const checked = useMemo(() => {
    return {
      ...gradientStroke({}),
      borderRadius: '2xl',
      boxShadow:
        '0px 5px 14px rgba(0, 0, 0, 0.47), 4px -7px 15px rgba(174, 177, 255, 0.13), inset -1px 1px 2px rgba(128, 186, 255, 0.24)',
    }
  }, [])
  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        minWidth={10}
        minHeight={8}
        textAlign="center"
        _checked={checked}
        px={2}
        py={1}
      >
        {props.children}
      </Box>
    </Box>
  )
}
