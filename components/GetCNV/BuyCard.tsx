import React, { useState } from 'react'
import Image from 'next/image'
import { Text, Button, HStack, Stack, Flex } from '@chakra-ui/react'
import { ButtonLink, ButtonLinkProps } from 'components/ButtonLink'
import { Card } from 'components/Card'
import colors from 'theme/colors'
import { BaseInput, Select, InputContainer, MaxAmount, ValueEstimation } from './Input'

const BuyNavButton = ({
  iconPath,
  label,
  subLabel,
  isActive,
  ...props
}: ButtonLinkProps & { iconPath: string; label: string; subLabel: string }) => (
  <ButtonLink
    {...props}
    isActive={isActive}
    variant="navigation"
    textColor={isActive ? 'text.1' : 'text.3'}
  >
    <Stack p={3}>
      <Image src={iconPath} width={48} height={48} alt="" color="red" />
      <Text fontSize={24}>{label}</Text>
      <Text>{subLabel}</Text>
    </Stack>
  </ButtonLink>
)

const BuyNav = ({ active }) => (
  <HStack spacing={0}>
    <BuyNavButton
      isActive={active === 'swap'}
      href="/swap"
      iconPath="/icons/swap.svg"
      label="Swap"
      subLabel="~$3,214"
    />
    <BuyNavButton
      isActive={active === 'discount'}
      href="/discount"
      iconPath="/icons/discount.svg"
      label="Discount"
      subLabel="~$3,214"
    />
    <BuyNavButton
      isActive={active === 'zap'}
      href="/zap"
      iconPath="/icons/zap.svg"
      label="Zap"
      subLabel="~$3,214"
    />
  </HStack>
)

function ToInput() {
  return (
    <Flex direction="column" gap={1} px={5}>
      <Text textColor="grey.500" fontWeight={700}>
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
      <Text textColor="text.3" fontWeight={700}>
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

export function BuyCard({ buttonLabel }) {
  const [amount, setAmount] = useState('0')
  const [inputToken, setInputToken] = useState(inputTokens[0])

  return (
    <Card shadow="up" bgGradient={colors.gradients.green}>
      <BuyNav active="swap" />
      <Card px={10} py={8} gap={4}>
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
