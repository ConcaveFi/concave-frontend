import {
  ACNV_ADDRESS,
  BBTCNV_ADDRESS,
  CNV,
  Currency,
  DAI,
  NATIVE,
  PCNV,
  Token,
} from '@concave/core'
import { Button, Flex, Text, Tooltip } from '@concave/ui'
import useVestedTokens from 'components/Transparency/Hooks/useVestedTokens'
import { ConnectedUserButton } from 'components/UserWallet/ConnectedUserButton'
import useAddTokenToWallet, { injectedTokenResponse } from 'hooks/useAddTokenToWallet'
import { useCurrencyBalance } from 'hooks/useCurrencyBalance'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { useUnstoppableDomain } from 'hooks/useUnstoppableDomain'
import { useAccount, useEnsName } from 'wagmi'

function formatNumber2DP(value: number) {
  return value.toLocaleString(undefined, {
    maximumFractionDigits: 2,
  })
}

function getFormattedCurrencyBalance(token: Currency) {
  const tokenData = useCurrencyBalance(token, { watch: true })
  return formatNumber2DP(+tokenData.data.toSignificant(6, { groupSeparator: ',' }))
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

export function UserDashboardWallet() {
  const { address, isConnected } = useAccount()
  const { data: ens } = useEnsName({ address })
  const { data: uns } = useUnstoppableDomain({ address })

  const networkId = useCurrentSupportedNetworkId()

  const aCNVToken = new Token(networkId, ACNV_ADDRESS[networkId], 18, 'aCNV', 'Concave aCNV')
  const bbtCNVToken = new Token(
    networkId,
    BBTCNV_ADDRESS[networkId],
    18,
    'bbtCNV',
    'Concave bbtCNV',
  )

  const cnvToken = CNV[networkId]
  const nativeToken = NATIVE[networkId] as any as Token
  const daiToken = DAI[networkId]
  const pCNVToken = PCNV[networkId]

  const cnvBalance = getFormattedCurrencyBalance(cnvToken)
  const ethBalance = getFormattedCurrencyBalance(nativeToken)
  const daiBalance = getFormattedCurrencyBalance(daiToken)

  const { aCNV: aCNVData, bbtCNV: bbtCNVData, pCNV: pCNVData } = useVestedTokens()
  const aCNVBalance = formatNumber2DP(+aCNVData?.data?.formatted)
  const bbtCNVBalance = formatNumber2DP(+bbtCNVData?.data?.formatted)
  const pCNVBalance = formatNumber2DP(+pCNVData?.data?.formatted)

  return (
    <WalletSurface>
      {isConnected ? (
        <>
          <Tooltip label={ens || uns || address} icon={<ConnectedUserButton w={'190px'} />} />
          <TokenButton token={cnvToken} tokenAmount={cnvBalance} />
          <TokenButton token={pCNVToken} tokenAmount={pCNVBalance} />
          <TokenButton token={aCNVToken} tokenAmount={aCNVBalance} />
          <TokenButton token={bbtCNVToken} tokenAmount={bbtCNVBalance} />
          <TokenButton token={daiToken} tokenAmount={daiBalance} />
          <TokenButton token={nativeToken} tokenAmount={ethBalance} isDisabled />
        </>
      ) : (
        <Text>Please connect wallet</Text>
      )}
    </WalletSurface>
  )
}

const TokenButton = ({
  token,
  tokenAmount,
  isDisabled,
}: {
  token: Token
  tokenAmount: number | string
  isDisabled?: boolean
}) => {
  if (isDisabled) {
    return <WalletButton token={token} tokenAmount={tokenAmount} isDisabled={isDisabled} />
  }

  return (
    <Tooltip
      label={`Click to add ${token.symbol} to your wallet`}
      w={'150px'}
      icon={<WalletButton token={token} tokenAmount={tokenAmount} isDisabled={isDisabled} />}
    />
  )
}

const WalletButton = ({ token, tokenAmount, isDisabled }) => {
  const { addingToWallet }: injectedTokenResponse = useAddTokenToWallet({
    tokenAddress: token.address,
    tokenChainId: token.chainId,
  })
  return (
    <Button
      height="40px"
      shadow="up"
      fontFamily="heading"
      _active={{ shadow: 'down' }}
      w={'auto'}
      rounded="2xl"
      px={4}
      disabled={isDisabled}
      onClick={addingToWallet}
    >
      <Text fontWeight={'normal'} overflow={'hidden'} textOverflow={'ellipsis'}>
        {tokenAmount} {token.symbol}
      </Text>
    </Button>
  )
}
