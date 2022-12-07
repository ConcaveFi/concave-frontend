import { CNV, Currency, DAI, NATIVE } from '@concave/core'
import { Button, Flex, Text } from '@concave/ui'
import useVestedTokens from 'components/Transparency/Hooks/useVestedTokens'
import { ConnectedUserButton } from 'components/UserWallet/ConnectedUserButton'
import { useCurrencyBalance } from 'hooks/useCurrencyBalance'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { useAccount } from 'wagmi'

function formatNumber2DP(value: number) {
  return value.toLocaleString(undefined, {
    maximumFractionDigits: 2,
  })
}

function getFormattedCurrencyBalance(address: Currency) {
  const tokenData = useCurrencyBalance(address, { watch: true })
  return formatNumber2DP(+tokenData.data.toSignificant(6, { groupSeparator: ',' }))
}

export function UserDashboardWallet() {
  const { isConnected } = useAccount()
  const networkId = useCurrentSupportedNetworkId()

  const cnvBalance = getFormattedCurrencyBalance(CNV[networkId])
  const ethBalance = getFormattedCurrencyBalance(NATIVE[networkId])
  const daiBalance = getFormattedCurrencyBalance(DAI[networkId])

  const { aCNV: aCNVData, bbtCNV: bbtCNVData, pCNV: pCNVData } = useVestedTokens()
  const aCNVBalance = formatNumber2DP(+aCNVData?.data?.formatted)
  const bbtCNVBalance = formatNumber2DP(+bbtCNVData?.data?.formatted)
  const pCNVBalance = formatNumber2DP(+pCNVData?.data?.formatted)

  return (
    <WalletSurface>
      {isConnected ? (
        <>
          <ConnectedUserButton w={'190px'} />
          <TokenButton>{cnvBalance} CNV</TokenButton>
          <TokenButton>{bbtCNVBalance} bbtCNV</TokenButton>
          <TokenButton>{pCNVBalance} pCNV</TokenButton>
          <TokenButton>{aCNVBalance} aCNV</TokenButton>
          <TokenButton isDisabled>{daiBalance} DAI</TokenButton>
          <TokenButton isDisabled>{ethBalance} ETH</TokenButton>
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

const TokenButton = ({
  children,
  isDisabled,
}: {
  children: JSX.Element | JSX.Element[] | any
  isDisabled?: boolean
}) => (
  <Button
    height="40px"
    shadow="up"
    fontFamily="heading"
    _active={{ shadow: 'down' }}
    w={'160px'}
    rounded="2xl"
    px={4}
    disabled={isDisabled}
  >
    <Text fontWeight={'normal'} overflow={'hidden'} textOverflow={'ellipsis'}>
      {children}
    </Text>
  </Button>
)
