import {
  border,
  Box,
  BoxRadioGroup,
  Button,
  Card,
  Flex,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from '@concave/ui'
import { Dispatch, SetStateAction, useState } from 'react'

const highLightedBorder = {
  border: '2px solid #7DE0FF',
  // borderImageSource:
  //   'linear-gradient(41.89deg, #53399B 0.69%, #7DE0FF 38.19%, #504179 72.85%, #84E2FF 100%)',
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
  const boxProps = { width: width ? width : 110, py: 1, shadow: UpSmall }

  const textColor = active ? 'white' : '#5F7A99'

  const variant = active ? 'primary.outline' : 'secondary'
  return (
    <Flex
      _hover={{
        transform: 'scale(1.1)',
      }}
      transition={'all'}
      transitionDuration={'.3s'}
      direction="row"
      cursor={'pointer'}
      onClick={() => (props.onClick ? props.onClick(props) : '')}
      fontSize={14}
      fontWeight={700}
      alignItems="center"
      textColor={textColor}
    >
      <Button {...boxProps} rounded="2xl" variant={variant}>
        <Text textAlign={'center'}>{title}</Text>
      </Button>
    </Flex>
  )
}

{
  /* <Card
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
      shadow={UpSmall}
      css={active ? highLightedBorder : testBorder}
    >
      <Text>{title}</Text>
    </Card> */
}
