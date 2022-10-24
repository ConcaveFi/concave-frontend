import { ChainId, CNV, Currency, DAI } from '@concave/core'
import { Flex } from '@concave/ui'
import { CandleStickCard } from 'components/AMM'
import {
  setRouteDefaultCurrencies,
  useQueryCurrencies,
} from 'components/AMM/hooks/useQueryCurrencies'
import { SwapActivity } from 'components/AMM/Swap/SwapActivity'
import { SwapCard } from 'components/AMM/Swap/SwapCard'
import { withPageTransition } from 'components/PageTransition'
import { LayoutGroup } from 'framer-motion'

export const swapSupportedChains = [ChainId.ETHEREUM, ChainId.RINKEBY] as const
export const swapDefaultCurrencies: {
  [chain in typeof swapSupportedChains[number]]: [Currency, Currency]
} = {
  [ChainId.ETHEREUM]: [DAI[1], CNV[1]],
  [ChainId.RINKEBY]: [DAI[4], CNV[4]],
}

setRouteDefaultCurrencies('/gemswap', swapDefaultCurrencies)

const shouldShowActivity = (currencies: [Currency, Currency]) =>
  currencies.includes(DAI[1]) && currencies.includes(CNV[1]) // is dai-cnv mainnet pair

export function SwapPage() {
  const { currencies } = useQueryCurrencies()

  return (
    <Flex direction="column" align="center" justify="center" w="100%" minH="100vh" gap={8}>
      <Flex wrap="wrap" gap={10} justify="center" w="full">
        <LayoutGroup>
          <CandleStickCard from={currencies[0]} to={currencies[1]} />
          <SwapCard />
        </LayoutGroup>
      </Flex>
      {shouldShowActivity(currencies) && <SwapActivity />}
    </Flex>
  )
}

SwapPage.Meta = {
  title: 'Concave | Gemswap (AMM)',
  description: `Concave's AMM allows LPs to deploy deep liquidity for different pairs and allows LPs to earn more with less capital. The AMM has cheaper gas fees and swap fees.`,
}

export default withPageTransition(SwapPage)
