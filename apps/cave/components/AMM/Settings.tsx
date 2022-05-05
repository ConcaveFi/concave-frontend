import { Percent } from '@concave/gemswap-sdk'
import { CnvQuestionIcon, SwapSettingsIcon } from '@concave/icons'
import {
  Box,
  Button,
  Card,
  Heading,
  HStack,
  IconButton,
  InputGroup,
  InputRightAddon,
  NumericInput,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Stack,
  Switch,
  Text,
  useBoolean,
} from '@concave/ui'
import React, { useEffect, useMemo, useReducer, useState } from 'react'

const SlippageTolerance = ({ value, onValueChange, onClickAuto }) => {
  return (
    <Stack align="flex-start">
      <Text fontSize="sm">
        Slippage tolerance <QuestionIcon />
      </Text>
      <HStack>
        <Card shadow="Down Big" borderRadius="xl">
          <InputGroup px={3} variant="unstyled" size="sm" h="full">
            <NumericInput
              value={value}
              placeholder="0.50"
              variant="unstyled"
              decimalScale={2}
              maxLength={4}
              size="medium"
              onValueChange={onValueChange}
            />
            <InputRightAddon color="text.low" fontWeight="semibold">
              %
            </InputRightAddon>
          </InputGroup>
        </Card>

        <Button
          onClick={onClickAuto}
          variant="primary.outline"
          backgroundColor="whiteAlpha.200"
          p={3}
          fontSize="sm"
        >
          Auto
        </Button>
      </HStack>

      {value < 0.05 && value > 0 && (
        <Text fontSize="sm" color="text.low">
          The transaction may fail
        </Text>
      )}
      {value > 2 && (
        <Text fontSize="sm" color="text.low">
          The transaction may be frontrun
        </Text>
      )}
    </Stack>
  )
}

const Deadline = ({ value, onValueChange }) => {
  return (
    <Stack align="start">
      <Text fontSize="sm">
        Transaction deadline <QuestionIcon />
      </Text>
      <Card shadow="Down Big" borderRadius="xl">
        <InputGroup px={3} variant="unstyled" size="sm">
          <NumericInput
            value={value}
            isNumericString
            placeholder="30"
            decimalScale={4}
            maxLength={7}
            size="medium"
            variant="unstyled"
            onValueChange={onValueChange}
          />
          <InputRightAddon fontFamily="body" color="text.low" fontWeight="semibold">
            minutes
          </InputRightAddon>
        </InputGroup>
      </Card>
    </Stack>
  )
}

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

const toPercent = (input: string) => new Percent(Math.floor(+input * 100), 10_000)

export type SwapSettings = {
  deadline: string
  slippageTolerance: {
    value: string
    percent: Percent
  }
  expertMode: boolean
  multihops: boolean
}

export const defaultSettings: SwapSettings = {
  deadline: '30',
  slippageTolerance: {
    value: '0.5',
    percent: toPercent('0.5'),
  },
  expertMode: false,
  multihops: true,
}

const MAX_SLIPPAGE = 50

const useSettings = () => {
  const [deadline, setDeadline] = useState(defaultSettings.deadline)
  const [slippageTolerance, setSlippageTolerance] = useReducer(
    (oldValue, value: string) =>
      +value < MAX_SLIPPAGE && +value > 0
        ? { value, percent: +value && toPercent(value) }
        : oldValue,
    defaultSettings.slippageTolerance,
  )
  const [multihops, { toggle: toggleMultihops }] = useBoolean(defaultSettings.multihops)
  const [expertMode, { toggle: toggleExpertMode }] = useBoolean(defaultSettings.expertMode)

  return useMemo(
    () => ({
      deadline,
      slippageTolerance,
      multihops,
      expertMode,
      setDeadline,
      setSlippageTolerance,
      toggleMultihops,
      toggleExpertMode,
    }),
    [deadline, slippageTolerance, multihops, expertMode, toggleMultihops, toggleExpertMode],
  )
}

export const Settings = ({ onChange }: { onChange: (settings: SwapSettings) => void }) => {
  const {
    deadline,
    slippageTolerance,
    multihops,
    expertMode,
    setDeadline,
    setSlippageTolerance,
    toggleMultihops,
    toggleExpertMode,
  } = useSettings()
  useEffect(() => {
    onChange({ deadline, slippageTolerance, multihops, expertMode })
  }, [onChange, deadline, slippageTolerance, multihops, expertMode])

  return (
    <Popover placement="top-end" offset={[20, 5]}>
      {/* Chakra type bug, related to just released react 18, should be fixed soon 
       // @ts-ignore  */}
      <PopoverTrigger>
        <IconButton
          onClick={(e) => e.stopPropagation()}
          px={2}
          _focus={{ transform: 'scale(1.12)', filter: 'drop-shadow(-1px 1px 2px #ffffff20)' }}
          _hover={{ transform: 'scale(1.06)', filter: 'drop-shadow(-1px 1px 2px #ffffff20)' }}
          icon={<SwapSettingsIcon viewBox="0 0 20 25" cursor={'pointer'} />}
          aria-label="swap settings"
        />
      </PopoverTrigger>
      <Portal>
        <PopoverContent
          border="none"
          w="256px"
          bg="transparent"
          borderRadius="2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <Card variant="secondary" p={4} gap={2} fontFamily="heading" fontWeight="semibold">
            <Heading textAlign="center" size="sm">
              Transactions Settings
            </Heading>
            <Box h="1px" w="full" bg="stroke.primary" my={2} />
            <Stack gap={3} align="flex-start">
              <SlippageTolerance
                value={slippageTolerance.value}
                onValueChange={({ value }) => setSlippageTolerance(value)}
                onClickAuto={() => setSlippageTolerance(defaultSettings.slippageTolerance.value)}
              />
              <Deadline value={deadline} onValueChange={({ value }) => setDeadline(value)} />
              <Stack gap={1} w="full">
                <Text fontWeight="bold" fontSize="sm">
                  Interface Settings
                </Text>
                <ToggleExpertMode isChecked={expertMode} onToggle={toggleExpertMode} />
                <ToggleMultihops isChecked={multihops} onToggle={toggleMultihops} />
              </Stack>
            </Stack>
          </Card>
        </PopoverContent>
      </Portal>
    </Popover>
  )
}

export const QuestionIcon = () => (
  <CnvQuestionIcon
    filter="drop-shadow(-1px 1px 2px #ffffff40)"
    height={'18px'}
    width={'18px'}
    viewBox="0 0 16 16"
    ml={1}
  />
)
