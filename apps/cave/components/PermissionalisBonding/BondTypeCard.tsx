import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  HStack,
  RangeSlider,
  RangeSliderFilledTrack,
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
import React from 'react'
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
      <Flex shadow="down" width="384px" height="60px" alignContent={'center'} rounded={'2xl'}>
        <RangeSlider aria-label={['min', 'max']} defaultValue={[30, 80]}>
          <RangeSliderTrack bg="red.100">
            <RangeSliderFilledTrack bg="tomato" />
          </RangeSliderTrack>
          <RangeSliderThumb boxSize={6} index={0}>
            <Box color="tomato" as={MdGraphicEq} />
          </RangeSliderThumb>
          <RangeSliderThumb boxSize={6} index={1}>
            <Box color="tomato" as={MdGraphicEq} />
          </RangeSliderThumb>
        </RangeSlider>
      </Flex>
    </Card>
  )
}

function SliderThumbWithTooltip() {
  const [sliderValue, setSliderValue] = React.useState(5)
  const [showTooltip, setShowTooltip] = React.useState(false)
  return (
    <Slider
      id="slider"
      defaultValue={5}
      min={0}
      max={360}
      colorScheme="teal"
      onChange={(v) => setSliderValue(v)}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <SliderMark value={sliderValue} mb="2" mt="1" ml="-2.5" fontSize="sm">
        {sliderValue} Days
      </SliderMark>

      <SliderMark value={70} mb="2" mt="1" ml="-2.5" fontSize="sm">
        70 Days
      </SliderMark>
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <Tooltip
        hasArrow
        bg="teal.500"
        color="white"
        placement="top"
        isOpen={showTooltip}
        label={`${sliderValue}%`}
      >
        <SliderThumb />
      </Tooltip>

      <RangeSlider aria-label={['min', 'max']} defaultValue={[30, 80]}>
        <RangeSliderTrack bg="red.100">
          <RangeSliderFilledTrack bg="tomato" />
        </RangeSliderTrack>
        <RangeSliderThumb boxSize={6} index={0}>
          <Box color="tomato" as={MdGraphicEq} />
        </RangeSliderThumb>
        <RangeSliderThumb boxSize={6} index={1}>
          <Box color="tomato" as={MdGraphicEq} />
        </RangeSliderThumb>
      </RangeSlider>
    </Slider>
  )
}
