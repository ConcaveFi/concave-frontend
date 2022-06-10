import { QuestionIcon } from '@concave/icons'
import { HStack, Stack, Switch, Text } from '@concave/ui'
import { TransactionSettings, SlippageTolerance, Deadline } from 'components/TransactionSettings'
import { useTransactionSettings } from 'components/TransactionSettings/TransactionSettings'

const ToggleExpertMode = ({ isChecked, onToggle }) => {
  return (
    <HStack justifyContent="space-between" width="100%">
      <Text fontSize="sm">
        Expert Mode <QuestionIcon />
      </Text>
      <Switch size="sm" isChecked={isChecked} onChange={onToggle} />
    </HStack>
  )
}

const ToggleMultihops = ({ isChecked, onToggle }) => {
  return (
    <HStack justifyContent="space-between" width="100%">
      <Text fontSize="sm">
        Multihops
        <QuestionIcon />
      </Text>
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

export const useSwapSettings = () => useTransactionSettings('swap', defaultSettings)

// TODO: implement auto slippage
const calculateAutoSlippage = () => 0.96

export const Settings = ({
  settings: { slippageTolerance, deadline, multihops, expertMode },
  setSetting,
  isDefaultSettings = true,
}) => {
  return (
    <TransactionSettings isDefaultSettings={isDefaultSettings}>
      <SlippageTolerance
        value={slippageTolerance}
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
