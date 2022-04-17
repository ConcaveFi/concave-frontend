import { CnvQuestionIcon, SwapSettingsIcon } from '@concave/icons'
import {
  Heading,
  Button,
  Card,
  HStack,
  InputGroup,
  InputRightAddon,
  Switch,
  Text,
  Stack,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  IconButton,
  NumericInput,
  useBoolean,
  Box,
} from '@concave/ui'
import { Percent } from 'gemswap-sdk'
import React, { useMemo, useState } from 'react'
import { useReducer } from 'react'

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
              decimalScale={4}
              maxLength={7}
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

const toPercent = (input: string) => new Percent(+input * 100, 10_000)

export type BondSettings = {
  deadline: string
  slippageTolerance: {
    value: string
    percent: Percent
  }
}

export const defaultSettings: BondSettings = {
  deadline: '30',
  slippageTolerance: {
    value: '1.0',
    percent: toPercent('1.0'),
  },
}

const MAX_SLIPPAGE = 50

const useSettings = () => {
  const [deadline, setDeadline] = useState(defaultSettings.deadline)
  const [slippageTolerance, setSlippageTolerance] = useReducer(
    (oldValue, value: string) => ({
      value: +value > MAX_SLIPPAGE ? oldValue.value : value,
      percent: toPercent(value),
    }),
    defaultSettings.slippageTolerance,
  )

  return useMemo(
    () => ({
      deadline,
      slippageTolerance,
      setDeadline,
      setSlippageTolerance,
    }),
    [deadline, slippageTolerance],
  )
}

export const Settings = ({ onClose }: { onClose: (settings: BondSettings) => void }) => {
  const { deadline, slippageTolerance, setDeadline, setSlippageTolerance } = useSettings()

  return (
    <Popover placement="top" onClose={() => onClose({ deadline, slippageTolerance })}>
      {/* Chakra type bug, related to just released react 18, should be fixed soon 
       // @ts-ignore  */}
      <PopoverTrigger>
        <IconButton
          px={2}
          _focus={{ transform: 'scale(1.12)', filter: 'drop-shadow(-1px 1px 2px #ffffff20)' }}
          _hover={{ transform: 'scale(1.06)', filter: 'drop-shadow(-1px 1px 2px #ffffff20)' }}
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
                value={slippageTolerance.value}
                onValueChange={({ value }) => setSlippageTolerance(value)}
                onClickAuto={() => setSlippageTolerance(defaultSettings.slippageTolerance.value)}
              />
              <Deadline value={deadline} onValueChange={({ value }) => setDeadline(value)} />
            </Stack>
          </PopoverBody>
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
