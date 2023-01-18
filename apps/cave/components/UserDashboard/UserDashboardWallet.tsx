import { ACNV_ADDRESS, BBTCNV_ADDRESS, CNV, DAI, NATIVE, PCNV, Token } from '@concave/core'
import { Avatar, Button, Flex, gradientBorder, Text, Tooltip } from '@concave/ui'
import useVestedTokens from 'components/Transparency/Hooks/useVestedTokens'
import { ConnectedUserButton } from 'components/UserWallet/ConnectedUserButton'
import useAddTokenToWallet, { injectedTokenResponse } from 'hooks/useAddTokenToWallet'
import { useCurrencyBalance } from 'hooks/useCurrencyBalance'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { useUnstoppableDomain } from 'hooks/useUnstoppableDomain'
import { useRouter } from 'next/router'
import { useAccount, useEnsName } from 'wagmi'
import { SnapshotOptions } from './SnapshotOptions'

function formatNumber2DP(value: number) {
  return value.toLocaleString(undefined, {
    maximumFractionDigits: 2,
  })
}

const WalletSurface = ({ children }: { children: JSX.Element | JSX.Element[] }) => (
  <Flex
    shadow={'down'}
    w={'100%'}
    minH={{ base: '122px', lg: '72px' }}
    wrap="wrap"
    borderRadius={{ base: '26px', lg: '50px' }}
    flexDir={'row'}
    justifyContent={'space-evenly'}
    alignItems={'center'}
    gap={{ base: 0, lg: 3 }}
    // p={6}
    // mt={3.5}
    // mb={8}
  >
    {children}
  </Flex>
)

export function UserDashboardWallet({ onSelectHistory }: { onSelectHistory: VoidFunction }) {
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

  const cnvCurrencyBalance = useCurrencyBalance(cnvToken, { watch: true }).data.toExact()
  const nativeCurrencyBalance = useCurrencyBalance(nativeToken, { watch: true }).data.toExact()
  const daiCurrencyBalance = useCurrencyBalance(daiToken, { watch: true }).data.toExact()

  const cnvBalance = formatNumber2DP(+cnvCurrencyBalance)
  const nativeBalance = formatNumber2DP(+nativeCurrencyBalance)
  const daiBalance = formatNumber2DP(+daiCurrencyBalance)

  const { aCNV: aCNVData, bbtCNV: bbtCNVData, pCNV: pCNVData } = useVestedTokens()
  const aCNVBalance = formatNumber2DP(+aCNVData?.data?.formatted)
  const bbtCNVBalance = formatNumber2DP(+bbtCNVData?.data?.formatted)
  const pCNVBalance = formatNumber2DP(+pCNVData?.data?.formatted)

  const router = useRouter()
  const currentView = router.query.view as SnapshotOptions
  const historyPressed = currentView === SnapshotOptions.History

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
          <TokenButton token={nativeToken} tokenAmount={nativeBalance} isDisabled />
          <Button
            display={{ base: 'none', lg: 'flex' }}
            shadow={historyPressed ? 'Blue Light' : 'up'}
            onClick={onSelectHistory}
            color="text.low"
            px="10"
            rounded={'16px'}
            py="2"
            _hover={{ textDecor: 'underline' }}
            sx={historyPressed && { ...gradientBorder() }}
          >
            History
          </Button>
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

  const hasImage = blackList.includes(token?.symbol)
  return (
    <Button
      height="40px"
      fontFamily="heading"
      w={'auto'}
      rounded="2xl"
      px={4}
      gap={2}
      disabled={isDisabled}
      onClick={addingToWallet}
      color="text.accent"
    >
      <Avatar
        hidden={hasImage}
        src={`/assets/tokens/${token?.symbol?.toLowerCase()}.svg`}
        size="xs"
      />
      <Text fontWeight={'bold'} overflow={'hidden'} textOverflow={'ellipsis'}>
        {tokenAmount} {token.symbol}
      </Text>
    </Button>
  )
}
const blackList = ['aCNV', 'bbtCNV']
