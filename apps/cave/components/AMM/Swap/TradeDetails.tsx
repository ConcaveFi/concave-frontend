import { Currency, CurrencyAmount } from '@concave/core'
import { Trade, TradeType } from '@concave/gemswap-sdk'
import { ExpandArrowIcon } from '@concave/icons'
import { Button, Collapse, HStack, Stack } from '@concave/ui'
import { GasPrice, RelativePrice, Settings } from 'components/AMM'
import { ExpectedOutput, MinExpectedOutput } from 'components/AMM/Swap/ExpectedOutput'
import { TradeRoute } from 'components/AMM/Swap/TradeRoute'
import { useReducer } from 'react'
import { useSwapSettings } from './Settings'

const TradeDetailsExpanded = ({ trade }: { trade: Trade<Currency, Currency, TradeType> }) => {
  const settings = useSwapSettings((s) => ({ slippageTolerance: s.settings.slippageTolerance }))
  return (
    trade?.route && (
      <Stack mb={4} p={4} w="full" shadow="Down Big" rounded="2xl">
        <ExpectedOutput outputAmount={trade.outputAmount} priceImpact={trade.priceImpact} />
        <MinExpectedOutput trade={trade} slippageTolerance={settings.slippageTolerance} />
        <TradeRoute route={trade.route} />
      </Stack>
    )
  )
}

export function TradeDetails({
  trade,
  inputAmount,
  outputAmount,
}: {
  trade: Trade<Currency, Currency, TradeType>
  inputAmount: CurrencyAmount<Currency>
  outputAmount: CurrencyAmount<Currency>
}) {
  /*
    toggle trade details, only toggleable when there is a valid trade 
    auto hide when there is no details to show (inputs are emptied)
  */
  const hasDetails = !!trade?.route && trade.outputAmount.greaterThan(0)
  const [isDetailsOpen, toggleDetails] = useReducer((s) => hasDetails && !s, false)

  return (
    <>
      <HStack justify="center" align="center" py={2} px={3} my="auto" rounded="xl" h="46px">
        <RelativePrice
          currency0={inputAmount?.currency}
          currency1={outputAmount?.currency}
          mr="auto"
        />

        <GasPrice />

        <Collapse in={hasDetails} style={{ overflow: 'visible' }} unmountOnExit={false}>
          <Button onClick={toggleDetails} variant="select" px={3} py={2}>
            <ExpandArrowIcon transition="all 0.3" transform={isDetailsOpen && 'rotate(180deg)'} />
          </Button>
        </Collapse>

        <Settings />
      </HStack>

      <Collapse style={{ overflow: 'visible' }} in={hasDetails && isDetailsOpen}>
        {isDetailsOpen && <TradeDetailsExpanded trade={trade} />}
      </Collapse>
    </>
  )
}
