import React, { useState } from 'react'
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
import { ButtonLink, ButtonLinkProps } from 'components/ButtonLink'
import { Card } from 'components/Card'
import { BaseInput, Select, InputContainer, MaxAmount, ValueEstimation } from './Input'
import { SwapIcon } from 'components/icons/swap'
import { ZapIcon } from 'components/icons/zap'
import { DiscountIcon } from 'components/icons/discount'
import { Box } from '@chakra-ui/react'
import { ArrowForwardIcon, EmailIcon } from '@chakra-ui/icons'
import { ChevronDownIcon } from 'components/icons/chevronown'
import { ExpandArrow } from 'components/icons/expandarrow'
import { GasIcon } from 'components/icons/gas'
import { SettingsIcon } from 'components/icons/settings'

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

function ToInput() {
  return (
    <Flex direction="column" gap={1} px={5}>
      <InputContainer shadow="down">
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
            label="Balance"
            max={maxAmount}
            onClick={() => onChangeValue(maxAmount.toString())}
          />
        </Stack>
      </InputContainer>
    </Flex>
  )
}

export const inputTokens = ['eth', 'dai', 'frax']

export function SwapCard({ buttonLabel, active }) {
  const [amount, setAmount] = useState('0')
  const [inputToken, setInputToken] = useState(inputTokens[0])

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
        value={amount}
        onChangeValue={setAmount}
        tokenOptions={inputTokens}
        selectedToken={inputToken}
        onSelectToken={setInputToken}
      />
      <Flex align="center" justify="center">
        <Button
          style={{
            boxShadow:
              '0px 4px 4px rgba(0, 0, 0, 0.25), inset -1px 1px 2px rgba(128, 186, 255, 0.05)',
          }}
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
      <FromInput
        maxAmount={100}
        value={amount}
        onChangeValue={setAmount}
        tokenOptions={inputTokens}
        selectedToken={inputToken}
        onSelectToken={setInputToken}
      />

      <HStack
        divider={<StackDivider boxShadow={'1px 0px 2px #101317'} />}
        margin="4"
        align="center"
        justify="center"
      >
        <HStack>
          <Text fontWeight={700} fontSize="xs">
            1 gCNV= 23.1 XMR
          </Text>
          <Text fontWeight={700} fontSize="xs" textColor="text.low">
            ($234,4)
          </Text>
          <Text fontWeight={700} fontSize="xs" textColor="text.low">
            <GasIcon />
            $103.3
          </Text>
        </HStack>
        <SettingsIcon />
      </HStack>
      <Button fontSize="2xl" variant="primary" size="large" isFullWidth>
        {buttonLabel}
      </Button>
    </Card>
  )
}

export default SwapCard
