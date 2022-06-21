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
  return (
    <Card
      p={5}
      gap={2}
      variant="primary"
      h="fit-content"
      shadow="Block Up"
      w="100%"
      maxW="430px"
      height="386px"
    >
      <Flex shadow="down" width="384px" height="60px" alignContent={'center'} rounded={'2xl'}>
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
        width="384px"
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

      <RangeSliderExample></RangeSliderExample>
    </Card>
  )
}

function RangeSliderExample() {
  const [rangeSliderValue, setRangeSliderValue] = React.useState([5, 50])
  return (
    <Flex shadow="down" width="384px" height="77px" alignContent={'center'} rounded={'2xl'}>
      <RangeSlider
        aria-label={['min', 'max']}
        defaultValue={[5, 50]}
        onChange={setRangeSliderValue}
        fontWeight={'bold'}
      >
        <RangeSliderMark value={rangeSliderValue[0]} color="white" ml="-6" w="12">
          <Flex direction={'column'}>
            <Text mt="-6px">{rangeSliderValue[0] + '%'}</Text>
            <Text color={'text.low'} mt="4">
              min
            </Text>
          </Flex>
        </RangeSliderMark>
        <RangeSliderMark value={rangeSliderValue[1]} color="white" ml="-6" w="12">
          <Flex direction={'column'}>
            <Text mt="-6px">{rangeSliderValue[1] + '%'}</Text>
            <Text color={'text.low'} mt="4">
              max
            </Text>
          </Flex>
        </RangeSliderMark>
        <RangeSliderTrack bg={''}>
          <RangeSliderFilledTrack bg={'linear-gradient(90deg, #72639B 0%, #44B9DE 100%)'} />
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
  )
}
