import { Box, useRadio, useRadioGroup, UseRadioProps } from '@chakra-ui/react'
import React from 'react'
import { gradientBorder } from '../theme/utils/gradientBorder'

type BoxRadioGroup<T> = {
  defaultValue?: string
  onChange: (value: string) => void
  options: string[]
}

export const BoxRadioGroup = <T extends unknown>({
  options,
  onChange = console.log,
  defaultValue = Object.keys(options)[0],
}: BoxRadioGroup<T>) => {
  const { getRadioProps } = useRadioGroup({
    defaultValue,
    onChange,
  })
  return (
    <>
      {options.map((value) => (
        <RadioCard key={value} {...getRadioProps({ value })}>
          {value}
        </RadioCard>
      ))}
    </>
  )
}

const checkedStyle = {
  ...gradientBorder({ borderRadius: '2xl' }),
  borderRadius: '2xl',
  boxShadow: 'Up Big',
}

const RadioCard: React.FC<React.PropsWithChildren<UseRadioProps>> = ({ children, ...props }) => {
  const { getInputProps, getCheckboxProps } = useRadio(props)
  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        minWidth={10}
        minHeight={8}
        textAlign="center"
        _checked={checkedStyle}
        px={2}
        py={1}
      >
        {children}
      </Box>
    </Box>
  )
}
