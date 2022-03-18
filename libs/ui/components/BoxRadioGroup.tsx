import { Box, useRadio, useRadioGroup, UseRadioProps } from '@chakra-ui/react'
import React, { useMemo } from 'react'
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
      {options.map((value) => {
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
      ...gradientBorder({ borderRadius: '2xl' }),
      borderRadius: '2xl',
      boxShadow: 'Up Big',
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
