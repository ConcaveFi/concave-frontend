import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  HStack,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderMark,
  RangeSliderThumb,
  RangeSliderTrack,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Text,
  Tooltip,
} from '@concave/ui'
import { ButtonLink } from 'components/ButtonLink'
import React, { useState } from 'react'
import { MdGraphicEq, MdOutlineDashboard } from 'react-icons/md'

export function BondTypeCard() {
  const [rangeSliderValue, setRangeSliderValue] = React.useState([5, 50])
  return (
    <Card
      p={5}
      gap={2}
      variant="primary"
      h="fit-content"
      shadow="Block Up"
      w="100%"
      maxW="430px"
      height="332px"
    >
      <Flex shadow="down" width="400px" height="60px" alignContent={'center'} rounded={'2xl'}>
        <Text
          fontWeight="bold"
          verticalAlign={'bottom'}
          ml={1}
          mt={4}
          align={'left'}
          fontSize="24px"
        >
          Discount Type
        </Text>
      </Flex>

      <Flex
        shadow="down"
        width="400px"
        height="60px"
        mt={2}
        alignContent={'center'}
        rounded={'2xl'}
      >
        <HStack justify={'space-around'} width="full">
          <Button
            my={3}
            variant="secondary"
            size="lg"
            w="109px"
            rightIcon={<MdOutlineDashboard size="20px" />}
            bgColor="secondary.75"
            fontSize="14px"
            rounded={'3xl'}
          >
            vAMM
          </Button>
          <Button
            my={3}
            variant="secondary"
            size="lg"
            w="109px"
            rightIcon={<MdOutlineDashboard size="20px" />}
            bgColor="secondary.75"
            fontSize="14px"
            rounded={'3xl'}
          >
            Fixed
          </Button>
          <Button
            my={3}
            variant="primary"
            size="lg"
            w="109px"
            rightIcon={<MdOutlineDashboard size="20px" />}
            bgColor="secondary.75"
            fontSize="14px"
            rounded={'3xl'}
          >
            Custom
          </Button>
        </HStack>
      </Flex>

      <BondSlider
        onChangeValue={setRangeSliderValue}
        label1={'Vesting Term:'}
        label2={'Days'}
        maxValue={360}
        defaultValue={[0, 360]}
      ></BondSlider>
      <BondSlider
        onChangeValue={setRangeSliderValue}
        label1={'Discount Range:'}
        label2={'%'}
        maxValue={100}
        defaultValue={[0, 100]}
        step={0.05}
      ></BondSlider>
    </Card>
  )
}
type sliderLabel = {
  onChangeValue: ([minValue, maxValue]: [number, number]) => void
  label1: string
  label2: string
  maxValue?: number
  minValue?: number
  step?: number
  defaultValue?: number[]
}

function BondSlider(props: sliderLabel) {
  const { onChangeValue, label1, label2, maxValue, minValue, step, defaultValue } = props

  const min = minValue || 0
  const max = maxValue || 100
  const _step = step || 1
  const _defaultValue = [defaultValue[0], defaultValue[1]] || [5, 50]
  const [rangeSliderValue, setRangeSliderValue] = React.useState([
    _defaultValue[0],
    _defaultValue[1],
  ])

  return (
    <Flex
      shadow="down"
      width="400px"
      height="77px"
      alignContent={'center'}
      rounded={'2xl'}
      flexDirection="row"
    >
      <Flex width="120px" align="center">
        <Text color={'text.low'} fontSize="14px">
          {label1}
        </Text>
      </Flex>
      <Flex width="242px ">
        <RangeSlider
          min={min}
          max={max}
          step={_step}
          defaultValue={[_defaultValue[0], _defaultValue[1]]}
          onChange={(value) => {
            setRangeSliderValue(value)
            onChangeValue([value[0], value[1]])
          }}
          fontWeight={'bold'}
        >
          <RangeSliderMark value={rangeSliderValue[0]} color="white" ml="-6" w="14">
            <Flex direction={'column'}>
              <Text fontSize="12px">
                {rangeSliderValue[0]} {label2}{' '}
              </Text>
              <Text color={'text.low'} mt="6">
                min
              </Text>
            </Flex>
          </RangeSliderMark>
          <RangeSliderMark value={rangeSliderValue[1]} color="white" ml="-6" w="14">
            <Flex direction={'column'}>
              <Text fontSize="12px">{rangeSliderValue[1] + ' ' + label2}</Text>
              <Text color={'text.low'} mt="6">
                max
              </Text>
            </Flex>
          </RangeSliderMark>
          <RangeSliderTrack bg={''}>
            <Box border="2px dotted" borderColor="text.low"></Box>
            <RangeSliderFilledTrack
              position={'absolute'}
              bg={'linear-gradient(90deg, #72639B 0%, #44B9DE 100%)'}
            />
          </RangeSliderTrack>
          <RangeSliderThumb
            bg={'linear-gradient(90deg, #72639B 0%, #44B9DE 100%)'}
            bgSize="200%"
            bgPosition={'center'}
            boxSize="15px"
            index={0}
          />
          <RangeSliderThumb
            bg={'linear-gradient(90deg, #72639B 0%, #44B9DE 100%)'}
            bgSize="200%"
            bgPosition={'center'}
            boxSize="15px"
            index={1}
          />
        </RangeSlider>
      </Flex>
    </Flex>
  )
}
