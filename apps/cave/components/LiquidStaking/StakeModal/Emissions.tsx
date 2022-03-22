import React from 'react'
import {
  Box,
  Button,
  Card,
  Image,
  Modal,
  ModalHeader,
  Stack,
  Text,
  useDisclosure,
} from '@concave/ui'

function Emissions(props) {
  return (
    <Box p={2}>
      <Box
        mx="auto"
        pt={5}
        pb={3}
        w="30%"
        h="full"
        shadow="down"
        borderRadius="full"
        textAlign="center"
        ml={-1}
      >
        <Text color="text.low" fontSize="sm">
          Stake period
        </Text>
        <Text fontSize="lg" fontWeight="bold">
          {props.period}
        </Text>
        <Image
          mx="auto"
          src={`/assets/liquidstaking/${props.icon}-logo.svg`}
          alt="stake period logo"
        />
        <Text color="text.low" fontSize="sm">
          {props.vaprText}
        </Text>
        <Text fontSize="lg" fontWeight="bold">
          {props.vapr} %
        </Text>
        <Image mx="auto" src={`/assets/liquidstaking/modal-arrow-logo.svg`} alt="arrow down logo" />
        <Box
          shadow="down"
          borderTopRadius="xl"
          borderBottomRadius="full"
          w="90%"
          h="150px"
          mx="auto"
          filter="drop-shadow(0px 0px 27px #81b3ff4f)"
        ></Box>
      </Box>
    </Box>
  )
}

export default Emissions
