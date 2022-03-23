import React from 'react'
import { Avatar, Button, Card, CloseButton, Flex, Heading, Text } from '@concave/ui'
import { ChevronDownIcon } from '@concave/icons'

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

export default function AddLiquidity() {
  return (
    <Flex maxW="container.md" direction="column" justifyContent="center" h="full" gap={6}>
      <Heading fontSize="2xl">My Liquidity Position</Heading>
      <RewardsBanner />
      <Card variant="primary" borderRadius="3xl" p={6} shadow="Up for Blocks">
        <Flex p={4} shadow="Up Big" borderRadius="2xl" align="center">
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
            rightIcon={<ChevronDownIcon h="28px" w="auto" />}
            ml="auto"
          >
            Manage
          </Button>
        </Flex>
      </Card>
    </Flex>
  )
}
