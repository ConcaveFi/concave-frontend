import { ChainId, CNV, Currency, DAI } from '@concave/core'
import { Box, Flex, HStack } from '@concave/ui'
import { setRouteDefaultCurrencies } from 'components/AMM/hooks/useQueryCurrencies'
import { Loading } from 'components/Loading'
import { withPageTransition } from 'components/PageTransition'
import { useStakePositions } from 'components/StakingPositions/DashboardBody/DashBoardState'
import { UserPositionCardMemo } from 'components/StakingPositions/LockPosition/Card/UserPositionCard'
import { DataTable } from 'components/UserDashboard/DataTable'
import { RedemCNVCard } from 'components/UserDashboard/redeem/CNVRedemptionCard'
import { LiquidStakingSnapshot } from 'components/UserDashboard/Summary/Staking/LiquidStakingSnapshot'
import { StakeSettingsProvider } from 'contexts/PositionsFilterProvider'
import { LayoutGroup } from 'framer-motion'

export const swapSupportedChains = [ChainId.ETHEREUM, ChainId.GÖRLI, ChainId.LOCALHOST] as const
export const swapDefaultCurrencies: {
  [chain in (typeof swapSupportedChains)[number]]: [Currency, Currency]
} = {
  [ChainId.LOCALHOST]: [DAI[ChainId.LOCALHOST], CNV[ChainId.LOCALHOST]],
  [ChainId.ETHEREUM]: [DAI[ChainId.ETHEREUM], CNV[ChainId.ETHEREUM]],
  [ChainId.GÖRLI]: [DAI[ChainId.GÖRLI], CNV[ChainId.GÖRLI]],
}

setRouteDefaultCurrencies('/redeem', swapDefaultCurrencies)

export function SwapPage() {
  const stakePosition = useStakePositions()

  const { userNonFungibleTokensInfo, isLoading } = stakePosition
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      w="100%"
      mx="auto"
      maxW="980px"
      minH="100vh"
      gap={8}
    >
      <Flex wrap="wrap" gap={10} justify="center" w="full">
        <LayoutGroup>
          <Box>
            <RedemCNVCard />
          </Box>
          {isLoading && <Loading />}
          {userNonFungibleTokensInfo.map((nonFungibleTokenInfo, i) => (
            <UserPositionCardMemo
              key={+nonFungibleTokenInfo.tokenId.toString() + i}
              stakingPosition={nonFungibleTokenInfo}
            />
          ))}
        </LayoutGroup>
      </Flex>
    </Flex>
  )
}

SwapPage.Meta = {
  title: 'Concave | Gemswap (AMM)',
  description: `Concave's AMM allows LPs to deploy deep liquidity for different pairs and allows LPs to earn more with less capital. The AMM has cheaper gas fees and swap fees.`,
}

export default withPageTransition(SwapPage)
