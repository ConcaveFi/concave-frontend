import { TransactionSettings, SlippageTolerance, Deadline } from 'components/TransactionSettings'
import { useTransactionSettings } from 'components/TransactionSettings/TransactionSettings'

const defaultSettings = {
  slippageTolerance: 1,
  deadline: 30,
}

export type BondSettings = typeof defaultSettings

export const useBondSettings = () => useTransactionSettings('bond', defaultSettings)

// TODO: implement auto slippage
const calculateAutoSlippage = () => 1.2

export const Settings = ({
  settings: { slippageTolerance, deadline },
  setSetting,
  isDefaultSettings = true,
  onClose,
}) => {
  return (
    <TransactionSettings isDefaultSettings={isDefaultSettings} onClose={onClose}>
      <SlippageTolerance
        value={slippageTolerance}
        onValueChange={(slippageTolerance) => setSetting({ slippageTolerance })}
        onClickAuto={() => setSetting({ slippageTolerance: calculateAutoSlippage() })}
      />
      <Deadline value={deadline} onValueChange={(deadline) => setSetting({ deadline })} />
    </TransactionSettings>
  )
}
