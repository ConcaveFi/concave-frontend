import { border, Box, Text } from '@concave/ui'
import { Dispatch, SetStateAction, useState } from 'react'

const highLightedBorder = {
  border: '2px solid #7DE0FF',
}
const testBorder = {
  border: '2px solid transparent',
}
const UpSmall = `0px 4px 4px rgba(0, 0, 0, 0.25), inset -1px 1px 2px rgba(128, 186, 255, 0.05)`

interface ToggleButtonProps {
  title: string
  active?: boolean
  width?: number
  height?: number
  flexGrow?: boolean
  onClick?: (props: ToggleButtonProps) => void
}

export default function ToggleButton(props: ToggleButtonProps) {
  const { title, height, width, flexGrow } = props
  const active = !!props.active

  const textColor = active ? 'white' : '#5F7A99'

  return (
    <Box
      _hover={{
        transform: 'scale(1.1)',
      }}
      transition={'all'}
      transitionDuration={'.3s'}
      onClick={() => (props.onClick ? props.onClick(props) : '')}
      fontSize={14}
      fontWeight={700}
      textColor={textColor}
      cursor={'pointer'}
      width={width ? width : {}}
      py={1}
      px={4}
      rounded="2xl"
      shadow={UpSmall}
      css={active ? highLightedBorder : testBorder}
    >
      <Text>{title}</Text>
    </Box>
  )
}
