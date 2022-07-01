import { CNV } from '@concave/core'
import { Box, Flex, Image, Stack, Text } from '@concave/ui'
import { DashboardIcon } from '@concave/icons'
import { ButtonLink } from 'components/ButtonLink'
import { ConnectButton, UserWallet } from 'components/UserWallet/ConnectWallet'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { useAccount, useBalance } from 'wagmi'
import { onCloseSidebar } from './SideBar'

const UserCnvBalance = () => {
  const { address } = useAccount()
  const networkId = useCurrentSupportedNetworkId()
  const { data } = useBalance({
    addressOrName: address,
    token: CNV[networkId].address,
    formatUnits: CNV[networkId].decimals,
    enabled: !!address,
  })

  return (
    data?.formatted && (
      <Flex justifyContent="space-between" p={2} mt={2}>
        <Text color="text.low" fontWeight="bold" fontSize="md" lineHeight="100%">
          Your CNV Balance
        </Text>
        <Text color="text.low" fontWeight="bold" fontSize="md" lineHeight="100%">
          {(+data?.formatted).toFixed(2)} CNV
        </Text>
      </Flex>
    )
  )
}

function SideBarTop() {
  const { isConnected } = useAccount()

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
          onClick={onCloseSidebar} // the click will close the sidebar
          href="/treasury" // and redirect to the treasury page
          variant="primary.outline"
          size="medium"
          w="full"
          alignItems="center"
          leftIcon={<DashboardIcon h="20px" w="20px" />}
        >
          Treasury
        </ButtonLink>
        <Box shadow="down" w="full" p={1} rounded="2xl">
          {isConnected ? (
            <UserWallet />
          ) : (
            // non intrusive way of closing the sidebar, the click will bubble up from the connect button
            <Box onClick={onCloseSidebar}>
              <ConnectButton />
            </Box>
          )}
          <UserCnvBalance />
        </Box>
      </Stack>
    </Box>
  )
}

export default SideBarTop
