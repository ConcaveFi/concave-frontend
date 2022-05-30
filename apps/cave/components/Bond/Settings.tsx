import { TransactionSettings, SlippageTolerance, Deadline } from 'components/TransactionSettings'
import { useReducer } from 'react'
import { toPercent } from 'utils/toPercent'

const defaultSettings = {
  slippageTolerance: {
    value: 1,
    percent: toPercent(1),
  },
  deadline: 30,
}

export type BondSettings = typeof defaultSettings

export const useBondSettings = () => useReducer((s, a) => ({ ...s, ...a }), defaultSettings)

// TODO: implement auto slippage
const calculateAutoSlippage = () => ({
  value: 1.2,
  percent: toPercent(1.2),
})

export const Settings = ({ settings: { slippageTolerance, deadline }, setSetting }) => {
  return (
    <TransactionSettings>
      <SlippageTolerance
        value={slippageTolerance.value}
        onValueChange={(slippageTolerance) => setSetting({ slippageTolerance })}
        onClickAuto={() => setSetting({ slippageTolerance: calculateAutoSlippage() })}
      />
      <Deadline value={deadline} onValueChange={({ value }) => setSetting({ deadline: value })} />
    </TransactionSettings>
  )
}
