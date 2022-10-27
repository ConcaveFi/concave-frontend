import { QuestionIcon } from '@concave/icons'
import { HStack, Stack, Switch, Text, Tooltip } from '@concave/ui'
import { Deadline, SlippageTolerance, TransactionSettings } from 'components/TransactionSettings'
import { createTransactionSettingsStore } from 'components/TransactionSettings/TransactionSettings'

const ToggleExpertMode = ({ isChecked, onToggle }) => {
  return (
    <HStack justifyContent="space-between" width="100%">
      <HStack>
        <Text fontSize="sm">Expert mode</Text>
        <Tooltip
          label="Expert mode allows high slippage trades and custom recipients without the confirmation screen. Use at your own risk."
          shouldWrapChildren
        >
          <QuestionIcon />
        </Tooltip>
      </HStack>
      <Switch size="sm" isChecked={isChecked} onChange={onToggle} />
    </HStack>
  )
}

const ToggleMultihops = ({ isChecked, onToggle }) => {
  return (
    <HStack justifyContent="space-between" width="100%">
      <HStack>
        <Text fontSize="sm">Multihops</Text>
        <Tooltip
          label="Disabling multihops restricts swaps to direct pairs only - no routing."
          shouldWrapChildren
        >
          <QuestionIcon />
        </Tooltip>
      </HStack>

      <Switch size="sm" isChecked={isChecked} onChange={onToggle} />
    </HStack>
  )
}

const defaultSettings = {
  slippageTolerance: 0.5,
  deadline: 30,
  multihops: true,
  expertMode: false,
}

export type SwapSettings = typeof defaultSettings

export const useSwapSettings = createTransactionSettingsStore('swap', defaultSettings)

// TODO: implement auto slippage
const calculateAutoSlippage = () => 0.96

export const Settings = () => {
  const {
    settings: { slippageTolerance, deadline, multihops, expertMode },
    defaultSettings,
    onClose,
    setSetting,
    isDefaultSettings,
  } = useSwapSettings()

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
      <Stack gap={1} w="full">
        <Text fontWeight="bold" fontSize="sm">
          Interface settings
        </Text>
        <ToggleExpertMode
          isChecked={expertMode}
          onToggle={() => setSetting({ expertMode: !expertMode })}
        />
        <ToggleMultihops
          isChecked={multihops}
          onToggle={() => setSetting({ multihops: !multihops })}
        />
      </Stack>
    </TransactionSettings>
  )
}
