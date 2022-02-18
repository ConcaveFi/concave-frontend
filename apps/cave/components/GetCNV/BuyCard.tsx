import React, { useState } from 'react'
import { Text, Button, HStack, Stack, Flex, ChakraComponent, Card } from '@concave/ui'
import { ButtonLink, ButtonLinkProps } from 'components/ButtonLink'
import { BaseInput, Select, InputContainer, MaxAmount, ValueEstimation } from './Input'
import { SwapIcon, ZapIcon, DiscountIcon } from '@concave/icons'

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

function ToInput() {
  return (
    <Flex direction="column" gap={1} px={5}>
      <Text textColor="text.low" fontWeight={700}>
        To (estimated)
      </Text>
      <InputContainer shadow="up">
        <BaseInput />
        <ValueEstimation tokenName="gCNV" estimationAmount={{ usd: 2601 }} />
      </InputContainer>
    </Flex>
  )
}

function FromInput({
  maxAmount,
  value,
  onChangeValue,
  tokenOptions,
  selectedToken,
  onSelectToken,
}: {
  maxAmount: number
  value: string
  onChangeValue: (value: string) => void
  tokenOptions: string[]
  selectedToken: typeof tokenOptions[number]
  onSelectToken: (token: typeof selectedToken) => void
}) {
  return (
    <Flex direction="column" gap={1} px={5}>
      <Text textColor="text.low" fontWeight={700}>
        From
      </Text>
      <InputContainer shadow="down">
        <BaseInput
          value={value}
          onValueChange={({ value }) => onChangeValue(value)}
          isAllowed={({ floatValue }) => floatValue <= maxAmount}
        />
        <Stack align="end">
          <Select tokens={tokenOptions} onSelect={onSelectToken} selected={selectedToken} />
          <MaxAmount
            label="Your balance"
            max={maxAmount}
            onClick={() => onChangeValue(maxAmount.toString())}
          />
        </Stack>
      </InputContainer>
    </Flex>
  )
}

export const inputTokens = ['eth', 'dai', 'frax']

export function BuyCard({ buttonLabel, active }) {
  const [amount, setAmount] = useState('0')
  const [inputToken, setInputToken] = useState(inputTokens[0])

  return (
    <Card shadow="up" maxW="450">
      <BuyNav active={active} />
      <Card px={10} py={8} gap={4} bgGradient="linear(to-tr, secondary.150, secondary.100)">
        <FromInput
          maxAmount={100}
          value={amount}
          onChangeValue={setAmount}
          tokenOptions={inputTokens}
          selectedToken={inputToken}
          onSelectToken={setInputToken}
        />
        <ToInput />
        <Button variant="primary" size="large" fontSize={24} isFullWidth>
          {buttonLabel}
        </Button>
      </Card>
    </Card>
  )
}

export default BuyCard
