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
import { BondChartSimulation } from './bondchart'

export function BondTypeCard() {
  const [rangeSliderValue, setRangeSliderValue] = React.useState([5, 50])
  return (
    <Flex flexDir={'row'} gap={10} mt={4} mb={4}>
      <Card
        p={5}
        gap={4}
        variant="primary"
        h="fit-content"
        shadow="Block Up"
        w="100%"
        maxW="450px"
        height="380px"
        justify={'center'}
      >
        <Flex justify={'center'} flexDir="column" px={3} gap={2}>
          <Flex
            shadow="down"
            width="400px"
            height="60px"
            p={3}
            mt={2}
            justify={'center'}
            rounded={'2xl'}
          >
            <Text
              px={3}
              verticalAlign={'center'}
              textAlign={'left'}
              fontSize="24px"
              fontWeight="600"
              textColor="text.high"
            >
              Discount Type
            </Text>
          </Flex>

          <Flex
            shadow="down"
            width="400px"
            height="70px"
            mt={2}
            alignContent={'center'}
            rounded={'2xl'}
            p={3}
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
            mt={4}
          ></BondSlider>
          <BondSlider
            onChangeValue={setRangeSliderValue}
            label1={'Discount Range:'}
            label2={'%'}
            maxValue={100}
            defaultValue={[0, 100]}
            step={0.05}
            mb={2}
          ></BondSlider>
        </Flex>
      </Card>
      <BondChartSimulation></BondChartSimulation>
    </Flex>
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
  mt?: Number
  mb?: number
}

function BondSlider(props: sliderLabel) {
  const { onChangeValue, label1, label2, maxValue, minValue, step, defaultValue, mt, mb } = props

  const min = minValue || 0
  const max = maxValue || 100

  const _step = step || 1
  const mtop = mt || 0
  const mbottom = mt || 0
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
      mt={mtop}
      mb={mbottom}
    >
      <Flex width="120px" align="center">
        <Text ml={2} color={'text.low'} fontSize="14px">
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
          px={3}
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
