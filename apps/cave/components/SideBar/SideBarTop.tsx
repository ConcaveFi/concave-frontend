import React from 'react'
import { Box, Flex, Text, Stack, HStack } from '@concave/ui'
import { Image } from '@concave/ui'
import { ConnectWallet } from 'components/ConnectWallet'
import { ButtonLink } from 'components/ButtonLink'
import { MdOutlineDashboard } from 'react-icons/md'

function SideBarTop() {
  return (
    <Box shadow="down" px={2} py={10} rounded="lg">
      <Flex
        alignItems="center"
        justify="center"
        my={4}
        filter="drop-shadow(0px 0px 27px #81b3ff4f)"
      >
        <Image src="/assets/concave/logomark.svg" alt="concave logo" maxWidth="52px" />
        <Image src="/assets/concave/logotype.svg" alt="concave logo" width="100px" ml={3} />
      </Flex>

      <Stack gap="1" align="flex-end" mt={7}>
        <ButtonLink
          href="/treasury"
          variant="primary.outline"
          size="medium"
          w="full"
          leftIcon={<MdOutlineDashboard size="20px" />}
        >
          <HStack gap="2">
            <MdOutlineDashboard fontSize="20px" />
            <Text fontSize="lg">Dashboard</Text>
          </HStack>
        </ButtonLink>
        <ConnectWallet />
      </Stack>
    </Box>
  )
}

export default SideBarTop
