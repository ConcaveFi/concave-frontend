import React, { useEffect, useState } from 'react'
import { Box, Flex, HStack, Image, Text, Tooltip, useMediaQuery } from '@concave/ui'
function Emissions(props: any) {
  const Informations = (props) => {
    return (
      <Box
        // shadow="down"
        borderTopRadius="xl"
        borderBottomRadius="full"
        w="80%"
        pt={4}
        pb={{ base: 0, md: 10 }}
        px={{ base: 0, md: 3 }}
        mx="auto"
        filter="drop-shadow(0px 0px 27px #81b3ff4f)"
        {...props}
      >
        <Flex textAlign={'center'} direction={'column'} justify={'center'} align="center">
          <Text mx={{ base: '', sm: 'auto' }} color="text.low" fontSize="sm">
            Bonding Emissions:
          </Text>
          <Text mx={{ base: '', sm: 'auto' }} fontSize="sm" fontWeight="bold">
            Calculating
          </Text>
          <Text mx={{ base: '', sm: 'auto' }} color="text.low" fontSize="sm">
            +
          </Text>
          <Text mx={{ base: '', sm: 'auto' }} color="text.low" fontSize="sm">
            Base Emissions:
          </Text>
          <Text mx={{ base: '', sm: 'auto' }} fontSize="sm" fontWeight="bold">
            {Math.sign(props?.vapr) !== 1 ? 'Calculating' : `${(props?.vapr * 100).toFixed(2)}%`}
          </Text>
          <Text mx={{ base: '', sm: 'auto' }} color="text.low" fontSize="sm">
            +
          </Text>
          <Text mx={{ base: '', sm: 'auto' }} color="text.low" fontSize="sm">
            Quarterly Dividends:
          </Text>
          <Text mx={{ base: '', sm: 'auto' }} fontSize="md" fontWeight="bold">
            Calculating
          </Text>
          <Image
            mt={4}
            mx="auto"
            src={`/assets/liquidstaking/modal-moreinfo-logo.svg`}
            alt="arrow down logo"
            onMouseOver={() => props.setShowFloatingCards(true)}
            onMouseLeave={() => props.setShowFloatingCards(false)}
          />
        </Flex>
      </Box>
    )
  }

  return (
    <Flex direction={'column'} py={2} px={5} maxW={{ base: '90px', sm: 'full' }}>
      <Flex direction={'row'} maxW={{ base: '100px', sm: '260px' }}>
        <Flex
          mx="auto"
          pt={5}
          pb={3}
          w="240px"
          h="full"
          minW={'150px'}
          minHeight={'300px'}
          shadow="down"
          borderRadius="full"
          textAlign="center"
          direction={'column'}
          ml={{ base: -4, sm: -1 }}
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
          <Text fontSize="lg" fontWeight="bold" mb="2"></Text>
          <Image
            mx="auto"
            src={`/assets/liquidstaking/modal-moreinfo-logo.svg`}
            alt="arrow down logo"
            onMouseOver={() => props.setShowFloatingCards(true)}
            onMouseLeave={() => props.setShowFloatingCards(false)}
          />
          <Image
            display={{ base: 'none', md: 'flex' }}
            mx="auto"
            src={`/assets/liquidstaking/modal-arrow-logo.svg`}
            alt="arrow down logo"
          />
          <Informations display={{ base: 'none', md: 'block' }} />
        </Flex>

        <Image
          mr={3}
          display={{ base: 'block', md: 'none' }}
          src={`/assets/liquidstaking/modal-arrow-logo.svg`}
          width="60px"
          alt="arrow down logo"
          transform={'rotate(-90deg)'}
        />
        <Informations display={{ base: 'block', md: 'none' }} />
      </Flex>
    </Flex>
  )
}

export default Emissions
