import { Deadline, SlippageTolerance, TransactionSettings } from 'components/TransactionSettings'
import { createTransactionSettingsStore } from 'components/TransactionSettings/TransactionSettings'

const defaultSettings = {
  slippageTolerance: 1,
  deadline: 30,
}

export type BondSettings = typeof defaultSettings

export const useBondSettings = createTransactionSettingsStore('bond', defaultSettings)

// TODO: implement auto slippage
const calculateAutoSlippage = () => 1.2

export const Settings = () => {
  const {
    settings: { slippageTolerance, deadline },
    defaultSettings,
    onClose,
    setSetting,
    isDefaultSettings,
  } = useBondSettings()

  return (
    <TransactionSettings isDefaultSettings={isDefaultSettings} onClose={onClose}>
      <SlippageTolerance
        value={slippageTolerance}
        placeholder={defaultSettings.slippageTolerance}
        onValueChange={(slippageTolerance) => setSetting({ slippageTolerance })}
        onClickAuto={() => setSetting({ slippageTolerance: calculateAutoSlippage() })}
      />
      <Deadline
        value={deadline}
        placeholder={defaultSettings.deadline}
        onValueChange={(deadline) => setSetting({ deadline })}
      />
    </TransactionSettings>
  )
}
