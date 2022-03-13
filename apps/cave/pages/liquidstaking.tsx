import { Avatar, Box, Card, Container, Flex, Image, Stack, Text } from '@concave/ui'
import React from 'react'
import GcnvTitle from 'components/GcnvTitle'
import { text } from 'stream/consumers'

const InfoItem = ({ value, label, ...props }) => (
  <Stack spacing={0} fontWeight="bold" textAlign="center" px={8} {...props}>
    <Text fontSize="lg" fontFamily="heading">
      {value}
    </Text>
    <Text fontSize="sm" color="text.low">
      {label}
    </Text>
  </Stack>
)

const LiquidStakingInfo = ({ asset, roi, vestingTerm, icon }) => {
  return (
    <Card
      bgGradient={''}
      px={0}
      borderRadius={40}
      width={160}
      height={326}
      py={4}
      direction="column"
      shadow="Medium Glow Up"
    >
      <InfoItem value={''} label="Stake Period" pl={7} />
      <InfoItem value={asset.toUpperCase()} label="" pl={7} />
    </Card>
  )
}

function LiquidStaking() {
  return (
    <Container maxW="container.lg" borderRadius={0} border="">
      <GcnvTitle
        title="Liquid Staking"
        description="Lock CNV in a staking term and recieve a tradeable NFT representing the position. Stakers receive a share of profits from all Concave products and services: bonding revenue, investment returns and protocol fees."
      />
      <Flex direction="row" gap={12}>
        <Card
          w="220px"
          h="490px"
          borderWidth={0}
          borderRadius={16}
          px={6}
          py={10}
          shadow="up"
          bgGradient="linear(to-tr, secondary.150, secondary.100)"
          gap={12}
        >
          <LiquidStakingInfo asset="12 Month" icon="" roi="400%" vestingTerm="360 days" />
        </Card>
      </Flex>
    </Container>
  )
}

export default LiquidStaking
