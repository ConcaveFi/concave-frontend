import { ChainId, CNV } from '@concave/gemswap-sdk'
import { Box, Flex, Image, Stack, Text } from '@concave/ui'
import { ButtonLink } from 'components/ButtonLink'
import { ConnectWallet } from 'components/ConnectWallet'
import React from 'react'
import { MdOutlineDashboard } from 'react-icons/md'
import { useAccount, useBalance } from 'wagmi'

function SideBarTop() {
  const [{ data: account }] = useAccount()
  const [{ data }] = useBalance({
    addressOrName: account?.address,
    token: CNV[ChainId.ETHEREUM].address,
    formatUnits: CNV[ChainId.ETHEREUM].decimals,
    skip: !account?.address,
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
          href="/dashboard"
          variant="primary.outline"
          size="medium"
          w="full"
          leftIcon={<MdOutlineDashboard size="20px" />}
        >
          Dashboard
        </ButtonLink>
        <Box shadow="down" w="full" p={1} rounded="2xl">
          <ConnectWallet />
          {data?.formatted && (
            <Flex justifyContent="space-between" p={2} mt={2}>
              <Text color="text.low" fontWeight="bold" fontSize="md" lineHeight="100%">
                Your CNV Balance
              </Text>
              <Text color="text.low" fontWeight="bold" fontSize="md" lineHeight="100%">
                {(+data?.formatted).toFixed(2)} CNV
              </Text>
            </Flex>
          )}
        </Box>
      </Stack>
    </Box>
  )
}

export default SideBarTop
