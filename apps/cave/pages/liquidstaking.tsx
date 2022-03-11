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
    <Card bg="none" px={3} py={4} direction="row" shadow="Medium Glow Up">
      <Avatar src={icon} name="CnvQuestionIcon" mr={3} />
      <InfoItem value={asset.toUpperCase()} label="Asset" pl={3} />
      <Box w="1px" mx={-1} my={-4} bg="strokeReflection" />
      <InfoItem value={roi} label="ROI" />
      <Box w="1px" mx={-1} my={-4} bg="strokeReflection" />
      <InfoItem value={vestingTerm} label="Vesting Term" pr={0} />
    </Card>
  )
}

function LiquidStaking() {
  return (
    <Container maxW="container.lg">
      <Flex direction="row" gap={12}>
        <GcnvTitle
          title="Liquid Staking"
          description="Lock CNV in a staking term and recieve a tradeable NFT representing the position. Stakers receive a share of profits from all Concave products and services: bonding revenue, investment returns and protocol fees."
        />
        <Card
          w="220px"
          h="490px"
          borderWidth={1}
          borderRadius={16}
          px={6}
          py={20}
          shadow="up"
          bgGradient="linear(to-tr, secondary.150, secondary.100)"
          gap={10}
        >
          <LiquidStakingInfo asset="12 Month" icon="" roi="400%" vestingTerm="360 days" />
        </Card>
        <Card
          w="220px"
          h="490px"
          borderWidth={1}
          borderRadius={16}
          px={6}
          py={20}
          shadow="up"
          bgGradient="linear(to-tr, secondary.150, secondary.100)"
          gap={10}
        >
          <LiquidStakingInfo asset="6 Month" icon="" roi="300%" vestingTerm="180 days" />
        </Card>
        <Card
          w="220px"
          h="490px"
          borderWidth={1}
          borderRadius={16}
          px={6}
          py={20}
          shadow="up"
          bgGradient="linear(to-tr, secondary.150, secondary.100)"
          gap={10}
        >
          <LiquidStakingInfo asset="3 Month" icon="" roi="200%" vestingTerm="90 days" />
        </Card>
        <Card
          w="220px"
          h="490px"
          borderWidth={1}
          borderRadius={16}
          px={6}
          py={20}
          shadow="up"
          bgGradient="linear(to-tr, secondary.150, secondary.100)"
          gap={10}
        >
          <LiquidStakingInfo asset="1 Month" icon="" roi="20%" vestingTerm="30 days" />
        </Card>
      </Flex>
    </Container>
  )
}

export default LiquidStaking
