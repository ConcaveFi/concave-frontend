import React, { useEffect } from 'react'
import { Box, Flex, Text, Stack, HStack } from '@concave/ui'
import { Image } from '@concave/ui'
import { ConnectWallet } from 'components/ConnectWallet'
import { ButtonLink } from 'components/ButtonLink'
import { MdOutlineDashboard } from 'react-icons/md'
import { useBalance } from 'wagmi'
import { useAuth } from 'contexts/AuthContext'

function SideBarTop() {
  const { user } = useAuth()
  const [{ data, error, loading }, getCNVBalance] = useBalance({
    addressOrName: user.address,
    // token: '0x7B731FFcf1b9C6E0868dA3F1312673A12Da28dc5', // INSERT CNV ADDRESS
  })

  useEffect(() => {
    console.log(`error:${error}`)
  })

  return (
    <Box shadow="down" px={2} pt={10} pb={3} rounded="2xl">
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
          href="treasury"
          variant="primary.outline"
          size="medium"
          w="full"
          leftIcon={<MdOutlineDashboard size="20px" />}
        >
          Dashboard
        </ButtonLink>
        <Box shadow="down" w="full" p={2} rounded="2xl">
          <ConnectWallet />
          <Flex justifyContent="space-between" p={2} mt={2}>
            <Text color="text.low" fontWeight="bold" fontSize="md" lineHeight="100%">
              Your CNV Balance
            </Text>
            <Text color="text.low" fontWeight="bold" fontSize="md" lineHeight="100%">
              {loading ? 0 : data?.formatted} CNV
            </Text>
          </Flex>
        </Box>
      </Stack>
    </Box>
  )
}

export default SideBarTop
