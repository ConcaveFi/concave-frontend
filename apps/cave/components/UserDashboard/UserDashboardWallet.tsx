import { CNV, DAI, NATIVE } from '@concave/core'
import { Button, Flex, Text } from '@concave/ui'
import useVestedTokens from 'components/Transparency/Hooks/useVestedTokens'
import { ConnectedUserButton } from 'components/UserWallet/ConnectedUserButton'
import { useCurrencyBalance } from 'hooks/useCurrencyBalance'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { useAccount } from 'wagmi'

export function UserDashboardWallet() {
  const { isConnected } = useAccount()
  const networkId = useCurrentSupportedNetworkId()

  const cnvData = useCurrencyBalance(CNV[networkId], { watch: true })
  const cnvBalance = cnvData.data.toSignificant(6, { groupSeparator: ',' })

  const ethData = useCurrencyBalance(NATIVE[networkId], { watch: true })
  const ethBalance = ethData.data.toSignificant(6, { groupSeparator: ',' })

  const daiData = useCurrencyBalance(DAI[networkId], { watch: true })
  const daiBalance = daiData.data.toSignificant(6, { groupSeparator: ',' })

  const { aCNV: aCNVData, bbtCNV: bbtCNVData, pCNV: pCNVData } = useVestedTokens()
  const aCNVBalance = +aCNVData?.data?.formatted
  const bbtCNVBalance = +bbtCNVData?.data?.formatted
  const pCNVBalance = +pCNVData?.data?.formatted

  return (
    <WalletSurface>
      {isConnected ? (
        <>
          <ConnectedUserButton w={'190px'} />
          <TokenButton>{cnvBalance} CNV</TokenButton>
          <TokenButton>{aCNVBalance} aCNV</TokenButton>
          <TokenButton>{bbtCNVBalance} bbtCNV</TokenButton>
          <TokenButton>{pCNVBalance} pCNV</TokenButton>
          <TokenButton>{daiBalance} DAI</TokenButton>
          <TokenButton>{ethBalance} ETH</TokenButton>
        </>
      ) : (
        <Text>Please connect wallet</Text>
      )}
    </WalletSurface>
  )
}

const WalletSurface = ({ children }: { children: JSX.Element | JSX.Element[] }) => (
  <Flex
    shadow={'down'}
    w={'95%'}
    h={'72px'}
    borderRadius={'50px'}
    flexDir={'row'}
    justifyContent={'space-evenly'}
    alignItems={'center'}
    gap={6}
    p={6}
    mt={3.5}
    mb={8}
  >
    {children}
  </Flex>
)

const TokenButton = ({ children }) => (
  <Button
    height="40px"
    shadow="up"
    fontFamily="heading"
    _active={{ shadow: 'down' }}
    w={'120px'}
    rounded="2xl"
  >
    {children}
  </Button>
)
