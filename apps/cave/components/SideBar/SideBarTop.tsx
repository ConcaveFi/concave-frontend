import { CNV } from '@concave/core'
import { DashboardIcon } from '@concave/icons'
import { Box, Flex, Image, Stack, Text } from '@concave/ui'
import { ButtonLink } from 'components/ButtonLink'
import { ConnectButton } from 'components/UserWallet/ConnectButton'
import { ConnectedUserButton } from 'components/UserWallet/ConnectedUserButton'
import { useCurrencyBalance } from 'hooks/useCurrencyBalance'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { useAccount, useNetwork } from 'wagmi'

const UserCnvBalance = () => {
  const networkId = useCurrentSupportedNetworkId()
  const { data: cnvAmount, isSuccess } = useCurrencyBalance(CNV[networkId], { watch: true })

  return (
    isSuccess && (
      <Flex pt={2} pb={3} px={4} mt={2} color="text.low" fontWeight="bold" fontSize="sm">
        <Text w="100%">
          Your CNV
          <br />
          Balance
        </Text>
        <Text w="100%" textAlign="right">
          {cnvAmount.toSignificant(6, { groupSeparator: ',' })}
          <br />
          CNV
        </Text>
      </Flex>
    )
  )
}

const TestnetIndicator = () => {
  const { chain } = useNetwork()
  return (
    chain?.testnet && (
      <Box textAlign={'center'} pt={3}>
        <Text color={'goldenrod'} fontWeight={'semibold'}>
          Connected to {chain.name}
        </Text>
        <ButtonLink variant="secondary" size="medium" fontSize={'lg'} href="/faucet">
          Go to faucet
        </ButtonLink>
      </Box>
    )
  )
}

function SideBarTop({ closeSidebar }: { closeSidebar: VoidFunction }) {
  const { isConnected } = useAccount()

  return (
    <Box shadow="down" px={2} pb={3} rounded="2xl" w="100%">
      <Flex
        alignItems="center"
        justify="center"
        my="58px"
        filter="drop-shadow(0px 0px 27px #81b3ff4f)"
        gap={3}
      >
        <Image src="/assets/concave/logomark.svg" alt="concave logo" width="52px" height="28px" />
        <Image src="/assets/concave/logotype.svg" alt="concave logo" width="100px" height="15px" />
      </Flex>

      <Stack gap="1" align="flex-end" mt={7}>
        <ButtonLink
          href="/treasury" // and redirect to the treasury page
          variant="secondary"
          border="primary"
          size="medium"
          w="full"
          alignItems="center"
          leftIcon={<DashboardIcon h="20px" w="20px" />}
        >
          Treasury
        </ButtonLink>
        <Box shadow="down" w="full" p={1} rounded="2xl">
          {isConnected ? (
            <ConnectedUserButton />
          ) : (
            <div onClick={closeSidebar}>
              <ConnectButton />
            </div>
          )}
          <UserCnvBalance />
        </Box>
      </Stack>
      <TestnetIndicator />
    </Box>
  )
}

export default SideBarTop
