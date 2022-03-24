import React from 'react'
import {
  Avatar,
  Button,
  Card,
  CloseButton,
  Flex,
  Heading,
  Text,
  Accordion,
  AccordionItem,
  AccordionPanel,
  Stack,
  AccordionButton,
  NumericInput,
  AccordionIcon,
} from '@concave/ui'
import { Pair } from '@uniswap/v2-sdk'
import { BigNumberish } from 'ethers'

const RewardsBanner = () => (
  <Card variant="secondary" p={4} gap={4}>
    <Flex justify="space-between">
      <Heading as="h2" fontSize="lg">
        Liquidity Provider Rewards
      </Heading>
      <CloseButton blendMode="multiply" _hover={{ blendMode: 'normal' }} />
    </Flex>
    <Text fontSize="lg">
      Liquidity providers earn a 0.25% fee on all trades proportional to their share of the pool.
      Fees are added to the pool, accrue in real time and can be claimed by withdrawing your
      liquidity.
    </Text>
  </Card>
)

const TokenIcon = ({ src, symbol, size = 'md' }) => (
  <Avatar src={src} name={symbol} size={size} bg="none" getInitials={(a) => a} />
)

const PositionInfoItem = ({ label, value }) => (
  <Flex justify="space-between">
    <Text>{label}</Text>
    <Text>{value}</Text>
  </Flex>
)

interface LPPosition {
  pair?: Pair
  ownedAmount: BigNumberish
}

const LPPositionItem = ({ pair, ownedAmount }: LPPosition) => {
  return (
    <AccordionItem p={2} shadow="Up Big" borderRadius="2xl" alignItems="center">
      <AccordionButton>
        <TokenIcon src="/assets/tokens/gcnv.svg" symbol="CNV" />
        <TokenIcon src="/assets/tokens/xmr.svg" symbol="XMR" />
        <Text ml="24px" fontWeight="semibold" fontSize="lg">
          XMR/gCNV
        </Text>
        <Button
          variant="secondary"
          borderRadius="full"
          px={4}
          fontSize="lg"
          rightIcon={<AccordionIcon h="28px" w="auto" />}
          iconSpacing={0}
          ml="auto"
        >
          Manage
        </Button>
      </AccordionButton>
      <AccordionPanel>
        <Stack
          fontWeight="bold"
          fontSize="lg"
          color="text.medium"
          borderRadius="2xl"
          shadow="down"
          p={4}
          spacing={4}
        >
          <PositionInfoItem label="Your total pool tokens:" value={ownedAmount.toString()} />
          <PositionInfoItem label={`Pooled ${'XMR'}:`} value={'0.0001331'} />
          <PositionInfoItem label={`Pooled ${'gCNV'}:`} value={'325.744'} />
          <PositionInfoItem label="Your pool share:" value={'2.79%'} />
        </Stack>
        <Flex gap={5} justify="center" mt={6}>
          <Button variant="primary" h={12} w={40} fontSize="lg">
            Add
          </Button>
          <Button variant="primary" h={12} w={40} fontSize="lg">
            Remove
          </Button>
        </Flex>
      </AccordionPanel>
    </AccordionItem>
  )
}

const RemoveLiquidity = () => {
  return (
    <Flex maxW="container.md" direction="column" justifyContent="center" h="full" gap={6}>
      <Heading fontSize="2xl">Remove Liquidity</Heading>
      <Card
        variant="primary"
        borderRadius="3xl"
        p={6}
        shadow="Up for Blocks"
        fontWeight="bold"
        fontSize="lg"
        gap={6}
      >
        <Flex
          shadow="Up Big"
          px={6}
          py={3}
          borderRadius="2xl"
          justify="space-between"
          align="center"
        >
          <Text>Amount to remove</Text>
          <NumericInput
            shadow="down"
            borderRadius="2xl"
            py={2}
            px={4}
            w="180px"
            textAlign="right"
            suffix=" %"
            placeholder="0.0 %"
          />
        </Flex>

        <Flex
          shadow="Up Big"
          px={6}
          py={3}
          borderRadius="2xl"
          justify="space-between"
          align="center"
        >
          <Text>Amount to remove</Text>
          <NumericInput
            shadow="down"
            borderRadius="2xl"
            py={2}
            px={4}
            w="180px"
            textAlign="right"
            suffix=" %"
            placeholder="0.0 %"
          />
        </Flex>
      </Card>
    </Flex>
  )
}

export default function MyPositions() {
  // return <RemoveLiquidity />
  return (
    <Flex maxW="container.md" direction="column" justifyContent="center" h="full" gap={6}>
      <Heading fontSize="2xl">My Liquidity Position</Heading>
      <RewardsBanner />
      <Card variant="primary" borderRadius="3xl" p={6} shadow="Up for Blocks">
        <Accordion as={Stack} allowToggle gap={2}>
          <LPPositionItem ownedAmount={'0.013'} />
          <LPPositionItem ownedAmount={'0.013'} />
          <LPPositionItem ownedAmount={'0.013'} />
        </Accordion>
      </Card>
    </Flex>
  )
}
