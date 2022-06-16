import { QuestionIcon } from '@concave/icons'
import { HStack, Stack, Switch, Text, Tooltip } from '@concave/ui'
import { TransactionSettings, SlippageTolerance, Deadline } from 'components/TransactionSettings'
import { useReducer } from 'react'
import { toPercent } from 'utils/toPercent'

const ToggleExpertMode = ({ isChecked, onToggle }) => {
  return (
    <HStack justifyContent="space-between" width="100%">
      <HStack>
        <Text fontSize="sm">Expert Mode</Text>
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
  slippageTolerance: {
    value: 0.5,
    percent: toPercent(0.5),
  },
  deadline: 30,
  multihops: true,
  expertMode: false,
}

export type SwapSettings = typeof defaultSettings

export const useSwapSettings = () => useReducer((s, a) => ({ ...s, ...a }), defaultSettings)

// TODO: implement auto slippage
const calculateAutoSlippage = () => ({
  value: 0.96,
  percent: toPercent(0.96),
})

export const Settings = ({
  settings: { slippageTolerance, deadline, multihops, expertMode },
  setSetting,
}) => {
  return (
    <TransactionSettings>
      <SlippageTolerance
        value={slippageTolerance.value}
        onValueChange={(slippageTolerance) => setSetting({ slippageTolerance })}
        onClickAuto={() => setSetting({ slippageTolerance: calculateAutoSlippage() })}
      />
      <Deadline value={deadline} onValueChange={({ value }) => setSetting({ deadline: value })} />
      <Stack gap={1} w="full">
        <Text fontWeight="bold" fontSize="sm">
          Interface Settings
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
