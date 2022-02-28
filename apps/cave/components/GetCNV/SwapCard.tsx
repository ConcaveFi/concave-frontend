import React from 'react'
import {
  Text,
  Button,
  HStack,
  Stack,
  Flex,
  ChakraComponent,
  StackDivider,
  Container,
} from '@chakra-ui/react'
import { Card } from '@concave/ui'

import { SwapIcon } from '@concave/icons'
import { ZapIcon } from '@concave/icons'
import { DiscountIcon } from '@concave/icons'
import { ExpandArrow } from '@concave/icons'
import { GasIcon } from '@concave/icons'
import { TransitionSettingsModalButton } from './TransactionSettings'
import { BaseInput, InputContainer, MaxAmount, Select, ValueEstimation } from './Input'
import { ButtonLink, ButtonLinkProps } from 'components/ButtonLink'
import { SwapState } from 'hooks/useSwap'

const BuyNavButton = ({
  Icon,
  label,
  subLabel,
  isActive,
  ...props
}: ButtonLinkProps & { Icon: ChakraComponent<'svg'>; label: string; subLabel: string }) => (
  <ButtonLink
    {...props}
    w="100%"
    height="100%"
    isActive={isActive}
    variant="navigation"
    scroll={false}
    pb={3} // accounts for the rounded corner of the inputs card, no bg clip (with mb={-3} on <BuyNav /> Container)
  >
    <Stack p={3} align="center">
      <Icon h="48px" w="48px" />
      <Text fontSize={24}>{label}</Text>
      <Text>{subLabel}</Text>
    </Stack>
  </ButtonLink>
)

const BuyNav = ({ active }) => (
  <HStack
    spacing={0}
    borderTopRadius="inherit"
    overflow="hidden"
    mb={-3}
    bgGradient="linear(to-tr, secondary.150, secondary.100)"
  >
    <BuyNavButton
      isActive={active === 'swap'}
      href="/swap"
      Icon={SwapIcon}
      label="Swap"
      subLabel="~$3,214"
    />
    <BuyNavButton
      isActive={active === 'discount'}
      href="/discount"
      Icon={DiscountIcon}
      label="Discount"
      subLabel="~$3,214"
    />
    <BuyNavButton
      isActive={active === 'zap'}
      href="/zap"
      Icon={ZapIcon}
      label="Zap"
      subLabel="~$3,214"
    />
  </HStack>
)

function FromInput({
  maxAmount,
  value,
  onChangeValue,
  tokenOptions,
  selectedToken,
  onSelectToken,
  balances,
}: {
  maxAmount: number
  value: string
  onChangeValue: (value: string) => void
  tokenOptions: string[]
  selectedToken: typeof tokenOptions[number]
  onSelectToken: (token: typeof selectedToken) => void
  balances: { [key: string]: number }
}) {
  return (
    <Flex direction="column" gap={1} px={5}>
      <InputContainer shadow="down">
        <Stack align="start">
          <BaseInput
            value={value}
            onValueChange={({ value }) => onChangeValue(value)}
            isAllowed={({ floatValue }) => floatValue <= maxAmount}
          />
          <Text fontWeight={'bold'} textColor={'text.low'}>
            $3,214
          </Text>
        </Stack>
        <Stack align="end">
          <Select tokens={tokenOptions} onSelect={onSelectToken} selected={selectedToken} />
          <MaxAmount
            label="Balance:"
            max={balances[selectedToken]}
            onClick={() => onChangeValue(maxAmount.toString())}
          />
        </Stack>
      </InputContainer>
    </Flex>
  )
}

function ToInput({
  maxAmount,
  value,
  onChangeValue,
  tokenOptions,
  selectedToken,
  onSelectToken,
  balances,
}: {
  maxAmount: number
  value: string
  onChangeValue: (value: string) => void
  tokenOptions: string[]
  selectedToken: typeof tokenOptions[number]
  onSelectToken: (token: typeof selectedToken) => void
  balances: { [key: string]: number }
}) {
  return (
    <Flex direction="column" gap={1} px={5}>
      <InputContainer shadow="down">
        <Stack align="start">
          <BaseInput
            value={value}
            onValueChange={({ value }) => onChangeValue(value)}
            isAllowed={({ floatValue }) => floatValue <= maxAmount}
          />
          <Text fontWeight={'bold'} textColor={'text.low'}>
            $3,380
          </Text>
        </Stack>
        <Stack align="end">
          <Select tokens={tokenOptions} onSelect={onSelectToken} selected={selectedToken} />
          <Text fontSize={'xs'} textColor={'text.low'}>
            Balance: {balances[selectedToken]}
          </Text>
        </Stack>
      </InputContainer>
    </Flex>
  )
}

export function SwapCard({
  buttonLabel,
  active,
  swap,
}: {
  buttonLabel: string
  active: string
  swap: SwapState
}) {
  return (
    <Card
      shadow="up"
      maxW="400"
      maxH="400"
      px={10}
      py={8}
      gap={2}
      bgGradient="linear(to-tr, secondary.150, secondary.100)"
      padding="8"
    >
      <FromInput
        maxAmount={100}
        balances={swap.balances}
        value={`${swap.inputTokenValue}`}
        onChangeValue={(from) => swap.setInputTokenValue(+from)}
        tokenOptions={swap.inputTokens}
        selectedToken={swap.selectedInputToken}
        onSelectToken={swap.setSelectedInputToken}
      />
      <Flex align="center" justify="center">
        <Button
          shadow={'outsideDown'}
          as={Button}
          padding={'4px 14px 4px 14px'}
          bgColor="rgba(156, 156, 156, 0.01);"
          minW="43"
          maxH="26"
          sx={{
            borderRadius: 'full',
            py: 2,
            px: 3,
            height: 'auto',
            fontWeight: 600,
          }}
        >
          <ExpandArrow />
        </Button>
      </Flex>
      <ToInput
        maxAmount={100}
        balances={swap.balances}
        value={`${swap.outputTokenValue}`}
        onChangeValue={(to) => swap.setOutputTokenValue(+to)}
        tokenOptions={swap.outputTokens}
        selectedToken={swap.selectedOutputToken}
        onSelectToken={swap.setSelectedOutputToken}
      />
      <HStack
        divider={<StackDivider boxShadow={'1px 0px 2px #101317'} />}
        margin="1"
        align="center"
        justify="center"
      >
        <HStack>
          <Text fontWeight={700} fontSize="xs">
            1 {swap.selectedOutputToken} = {swap.parsePrice} {swap.selectedInputToken}
          </Text>
          <Text paddingRight={2} fontWeight={700} fontSize="xs" textColor="text.low">
            (${swap.USDValues[swap.selectedOutputToken]})
          </Text>
          <GasIcon viewBox="0 0 16 16" />
          <Text fontWeight={700} fontSize="xs" textColor="text.low">
            ${swap.gasPrice}
          </Text>
        </HStack>
        <TransitionSettingsModalButton swap={swap} />
      </HStack>
      <Button
        shadow={
          '20px -20px 39px rgba(120, 182, 255, 0.25), 0px 5px 14px rgba(0, 0, 0, 0.47), inset 0px -10px 20px rgba(117, 164, 255, 0.5);'
        }
        fontSize="2xl"
        variant="primary"
        size="large"
        isFullWidth
      >
        {buttonLabel}
      </Button>
    </Card>
  )
}
