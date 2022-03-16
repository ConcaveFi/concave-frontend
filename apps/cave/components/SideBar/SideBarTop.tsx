import React from 'react'
import { Box, Flex, Text, VStack, HStack } from '@chakra-ui/react'
import { Image } from '@concave/ui'
import { ConnectWallet } from 'components/ConnectWallet'
import { ButtonLink } from 'components/ButtonLink'
import { MdOutlineDashboard } from 'react-icons/md'

function SideBarTop() {
  return (
    <div>
      <Box
        top="16px"
        border-radius="16px"
        shadow="down"
        bgGradient="linear(to-tr, secondary.150, secondary.100)"
        px={2}
        py={10}
        box-shadow="lg"
        rounded="lg"
      >
        <Flex
          alignItems="center"
          justify="center"
          my={4}
          filter="drop-shadow(0px 0px 27px #81b3ff4f)"
        >
          <Image src="/assets/concave/logomark.svg" alt="concave logo" maxWidth="52px" />
          <Image src="/assets/concave/logotype.svg" alt="concave logo" width="100px" ml={3} />
        </Flex>

        <VStack gap="1" align="flex-end" mt={7}>
          <ButtonLink
            href="/treasury"
            variant="primary.outline"
            bgGradient="linear(to-tr, secondary.150, secondary.100)"
            w="200px"
            size="large"
            borderRadius="2xl"
          >
            <HStack gap="2">
              <MdOutlineDashboard fontSize="20px" />
              <Text fontSize="lg">Dashboard</Text>
            </HStack>
          </ButtonLink>
          <ConnectWallet />
        </VStack>
      </Box>
    </div>
  )
}

export default SideBarTop
