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
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Stack,
  Switch,
  Text,
  useBoolean,
} from '@concave/ui'
import React, { useMemo, useState } from 'react'

const SlippageTolerance = ({ value, onValueChange, onClickAuto }) => {
  return (
    <Stack align="flex-start">
      <Text fontSize="sm">
        Slippage tolerance <QuestionIcon />
      </Text>
      <HStack>
        <Card shadow="Down Big" borderRadius="xl">
          <InputGroup px={3} variant="unstyled" size="sm">
            <NumericInput
              value={value}
              isNumericString
              placeholder="0.50"
              size="medium"
              variant="unstyled"
              max={50}
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

export const defaultSettings = {
  deadline: 30,
  slippageTolerance: 0.5,
  expertMode: false,
  mulhops: true,
}

const useSettings = () => {
  const [deadline, setDeadline] = useState(defaultSettings.deadline)
  const [slippageTolerance, setSlippageTolerance] = useState(defaultSettings.slippageTolerance)
  const [multihops, { toggle: toggleMultihops }] = useBoolean(defaultSettings.mulhops)
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

export const Settings = ({ onClose }) => {
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

  return (
    <Popover
      placement="top"
      onClose={() => onClose({ deadline, slippageTolerance, multihops, expertMode })}
    >
      <PopoverTrigger>
        <IconButton
          px={2}
          icon={<SwapSettingsIcon viewBox="0 0 20 25" cursor={'pointer'} />}
          aria-label="swap settings"
        />
      </PopoverTrigger>
      <Portal>
        <PopoverContent w="256px" backdropFilter="blur(15px)" bg="transparent" borderRadius="2xl">
          <PopoverBody
            as={Card}
            variant="secondary"
            p={4}
            gap={2}
            fontFamily="heading"
            fontWeight="semibold"
          >
            <Heading textAlign="center" size="sm">
              Transactions Settings
            </Heading>
            <Box h="1px" w="full" bg="stroke.primary" my={2} />
            <Stack gap={3} align="flex-start">
              <SlippageTolerance
                value={slippageTolerance}
                onValueChange={({ value }) => setSlippageTolerance(value)}
                onClickAuto={() => setSlippageTolerance(defaultSettings.slippageTolerance)}
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
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  )
}

export const QuestionIcon = () => (
  <CnvQuestionIcon
    filter="drop-shadow(-1px 1px 2px rgba(255, 255, 255, 0.25))"
    height={'18px'}
    width={'18px'}
    viewBox="0 0 16 16"
    ml={1}
  />
)
