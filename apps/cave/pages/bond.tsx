import { Avatar, Box, Card, Container, Flex, Image, Stack, Text } from '@concave/ui'
import React from 'react'
import GcnvTitle from 'components/GcnvTitle'
import TokenSelector from 'components/TokenSelector'

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

const BondInfo = ({ asset, roi, vestingTerm, icon }) => {
  return (
    <Card bg="none" px={3} py={4} direction="row" shadow="Medium Glow Up">
      <Avatar src={icon} name="" mr={3} />
      <InfoItem value={asset.toUpperCase()} label="Asset" pl={3} />
      <Box w="1px" mx={-1} my={-4} bg="strokeReflection" />
      <InfoItem value={roi} label="ROI" />
      <Box w="1px" mx={-1} my={-4} bg="strokeReflection" />
      <InfoItem value={vestingTerm} label="Vesting Term" pr={0} />
    </Card>
  )
}

function Bond() {
  return (
    <Container maxW="container.lg">
      <Flex direction="column" gap={12}>
        <GcnvTitle
          title="Dynamic Bond Market"
          description="Get your gCNV that will grow internal CNV number  your gCNV that will grow number or smth idk lol Get your gCNV that will grow internal CNV number or smth idk lol"
        />

        <Card
          variant="secondary"
          w="430px"
          borderWidth={3}
          px={6}
          py={20}
          shadow="Inner Glow"
          gap={10}
        >
          <BondInfo asset="CNV" icon="" roi="9.4%" vestingTerm="5 days" />
          <BondInfo asset="CNV" icon="" roi="9.4%" vestingTerm="5 days" />
        </Card>
      </Flex>
    </Container>
  )
}

export default Bond
