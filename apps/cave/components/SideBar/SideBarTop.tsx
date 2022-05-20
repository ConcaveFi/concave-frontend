import { CNV } from '@concave/gemswap-sdk'
import { Box, Flex, Image, Stack, Text } from '@concave/ui'
import { ButtonLink } from 'components/ButtonLink'
import { ConnectWallet } from 'components/ConnectWallet'
import { useCurrencyBalance } from 'hooks/useCurrencyBalance'
import { useIsMounted } from 'hooks/useIsMounted'
import React from 'react'
import { MdOutlineDashboard } from 'react-icons/md'
import { useNetwork } from 'wagmi'

function SideBarTop() {
  const { activeChain } = useNetwork()
  const { data: cnvBalace } = useCurrencyBalance(CNV[activeChain?.id], { watch: true })
  const isMounted = useIsMounted()
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
          href="/treasury"
          variant="primary.outline"
          size="medium"
          w="full"
          leftIcon={<MdOutlineDashboard size="20px" />}
        >
          Treasury
        </ButtonLink>
        <Box shadow="down" w="full" p={1} rounded="2xl">
          <ConnectWallet />
          {cnvBalace && isMounted && (
            <Flex justifyContent="space-between" p={2} mt={2}>
              <Text color="text.low" fontWeight="bold" fontSize="md" lineHeight="100%">
                Your CNV Balance
              </Text>
              <Text color="text.low" fontWeight="bold" fontSize="md" lineHeight="100%">
                {cnvBalace.toFixed(2)} CNV
              </Text>
            </Flex>
          )}
        </Box>
      </Stack>
    </Box>
  )
}

export default SideBarTop
