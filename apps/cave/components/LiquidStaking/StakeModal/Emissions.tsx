import React from 'react'
import { Box, HStack, Image, Text } from '@concave/ui'
function Emissions(props: any) {
  return (
    <Box py={2} px={5}>
      <Box
        mx="auto"
        pt={5}
        pb={3}
        w="220px"
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
          {/* {props.vapr} % */}
          Calculating
        </Text>
        <Image mx="auto" src={`/assets/liquidstaking/modal-arrow-logo.svg`} alt="arrow down logo" />
        <Box
          shadow="down"
          borderTopRadius="xl"
          borderBottomRadius="full"
          w="90%"
          pt={4}
          pb={10}
          px={3}
          mx="auto"
          filter="drop-shadow(0px 0px 27px #81b3ff4f)"
        >
          <HStack>
            {/* <Image
              src={`/assets/liquidstaking/modal-moreinfo-logo.svg`}
              h={5}
              w={5}
              alt="more info logo"
            /> */}
            <Text mx="auto" color="text.low" fontSize="sm">
              Bonding Emissions:
            </Text>
          </HStack>
          <Text mx="auto" fontSize="md" fontWeight="bold">
            Coming Soon
          </Text>
          <Text color="text.low" fontSize="sm">
            +
          </Text>
          <HStack>
            {/* <Image
              // mx="auto"
              ml={6}
              src={`/assets/liquidstaking/modal-moreinfo-logo.svg`}
              h={5}
              alt="more info logo"
            /> */}
            <Text mx="auto" color="text.low" fontSize="sm">
              Base Emissions:
            </Text>
          </HStack>
          <Text mx="auto" fontSize="md" fontWeight="bold">
            Coming Soon
          </Text>
          <Text color="text.low" fontSize="sm">
            +
          </Text>
          <HStack>
            {/* <Image
              mx="auto"
              src={`/assets/liquidstaking/modal-moreinfo-logo.svg`}
              h={5}
              alt="more info logo"
            /> */}
            <Text mx="auto" color="text.low" fontSize="sm">
              Quarterly Dividends:
            </Text>
          </HStack>
          <Text fontSize="md" fontWeight="bold">
            Coming Soon
          </Text>
        </Box>
      </Box>
    </Box>
  )
}

export default Emissions
