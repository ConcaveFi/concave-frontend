import React, { useEffect, useState } from 'react'
import { Box, Flex, HStack, Image, Text, useMediaQuery } from '@concave/ui'
function Emissions(props: any) {
  const [isLargerThan700] = useMediaQuery('(min-width: 700px)')

  const [margin, setMargin] = useState('auto')

  useEffect(() => {
    setMargin(isLargerThan700 ? 'auto' : '')
  }, [isLargerThan700])
  const informations = () => {
    return (
      <Box
        // shadow="down"
        borderTopRadius="xl"
        borderBottomRadius="full"
        w="90%"
        pt={4}
        pb={10}
        px={3}
        mx="auto"
        filter="drop-shadow(0px 0px 27px #81b3ff4f)"
      >
        <Flex
          textAlign={'center'}
          direction={'column'}
          justify={'center'}
          align="center"
          mt={isLargerThan700 ? 0 : 8}
        >
          <HStack>
            {/* <Image
              src={`/assets/liquidstaking/modal-moreinfo-logo.svg`}
              h={5}
              w={5}
              alt="more info logo"
            /> */}
            <Text mx={margin} color="text.low" fontSize="sm">
              Bonding Emissions:
            </Text>
          </HStack>
          <Text mx={margin} fontSize="md" fontWeight="bold">
            Coming Soon
          </Text>
          <Text mx={margin} color="text.low" fontSize="sm">
            +
          </Text>
          <HStack>
            {/* <Image
              // 
              ml={6}
              src={`/assets/liquidstaking/modal-moreinfo-logo.svg`}
              h={5}
              alt="more info logo"
            /> */}
            <Text mx={margin} color="text.low" fontSize="sm">
              Base Emissions:
            </Text>
          </HStack>
          <Text mx={margin} fontSize="md" fontWeight="bold">
            Coming Soon
          </Text>
          <Text mx={margin} color="text.low" fontSize="sm">
            +
          </Text>
          <HStack>
            {/* <Image              
              src={`/assets/liquidstaking/modal-moreinfo-logo.svg`}
              h={5}
              alt="more info logo"
            /> */}
            <Text mx={margin} color="text.low" fontSize="sm">
              Quarterly Dividends:
            </Text>
          </HStack>
          <Text mx={margin} fontSize="md" fontWeight="bold">
            Coming Soon
          </Text>
        </Flex>
      </Box>
    )
  }

  return (
    <Flex direction={'column'} py={2} px={5}>
      <Flex direction={'row'} gap="4">
        <Flex
          mx="auto"
          pt={5}
          pb={3}
          w="220px"
          h="full"
          minW={'150px'}
          minHeight={'300px'}
          shadow="down"
          borderRadius="full"
          textAlign="center"
          direction={'column'}
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
          {isLargerThan700 && (
            <Image
              mx="auto"
              src={`/assets/liquidstaking/modal-arrow-logo.svg`}
              alt="arrow down logo"
            />
          )}
          {isLargerThan700 && informations()}
        </Flex>
        {!isLargerThan700 && (
          <Image
            mx="auto"
            src={`/assets/liquidstaking/modal-arrow-logo.svg`}
            alt="arrow down logo"
            transform={'rotate(-90deg)'}
          />
        )}
        {!isLargerThan700 && informations()}
      </Flex>
    </Flex>
  )
}

export default Emissions
