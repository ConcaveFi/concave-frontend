import {
  Box,
  Card,
  Container,
  Flex,
  gradientBorder,
  Heading,
  Image,
  Stack,
  Text,
} from '@concave/ui'
import { SwapCard } from 'components/Swap/SwapCard'
import { useSwap } from 'components/Swap/useSwap'
import { useAuth } from 'contexts/AuthContext'
import React from 'react'

const InfoItem = ({ value, label, ...props }) => (
  <Flex
    direction="column"
    py={0.5}
    justify="space-between"
    fontWeight="bold"
    textAlign="center"
    {...props}
  >
    <Text fontSize="lg" fontFamily="heading">
      {value}
    </Text>
    <Text fontSize="sm" color="text.low">
      {label}
    </Text>
  </Flex>
)

const BondInfo = ({ asset, roi, vestingTerm, icon }) => {
  return (
    <Card bg="none" py={3} w="100%" direction="row" shadow="Glass Up Medium">
      <Flex justify="center" pl={4} pr={7}>
        <Image src={icon} alt="" w="55px" h="55px" mr={3} />
        <InfoItem value={asset.toUpperCase()} label="Asset" />
      </Flex>
      <Box w="1px" mx={-1} my={-4} bg="stroke.primary" />
      <InfoItem value={roi} label="ROI" flexGrow={1} />
      <Box w="1px" mx={-1} my={-4} bg="stroke.primary" />
      <InfoItem value={vestingTerm} label="Vesting Term" px={5} />
    </Card>
  )
}

const SelectedBondType = ({ bondType }) => {
  return (
    <Card
      variant="primary"
      colorScheme="brighter"
      shadow="Magic Big"
      bgGradient="linear(to-b, secondary.75, secondary.100)"
      direction="row"
      mt={-20}
      py={1}
      fontWeight="bold"
      fontSize="sm"
      borderTopRadius="0"
      justify="center"
      gap={1}
      w="250px"
    >
      <Text>Selected</Text>
      <Text mx={1}>|</Text>
      <Text color="text.low">Bond Type:</Text>
      <Text>{bondType}</Text>
    </Card>
  )
}

const NothingToRedeem = () => {
  return (
    <Card
      shadow="Up Big"
      mb={-20}
      px={8}
      py={1}
      fontWeight="bold"
      fontSize="sm"
      borderBottomRadius="0"
      w="250px"
    >
      <Text color="text.low" align="center">
        Nothing to redeem
      </Text>
    </Card>
  )
}

export default function Bond() {
  const { user, isConnected } = useAuth()
  const swap = useSwap(isConnected ? user?.address : '', {})
  return (
    <Container maxW="container.lg">
      <Flex direction="column" gap={20}>
        <Stack mt={20} align="center" textAlign="center">
          <Heading as="h1" mb={3} fontSize="5xl">
            Dynamic Bond Market
          </Heading>
          <Text maxW={280}>
            Get your gCNV that will grow internal CNV number your gCNV that will grow number or smth
            idk lol Get your gCNV that will grow internal CNV number or smth idk lol
          </Text>
        </Stack>

        <Flex gap={10}>
          <Box pos="relative" h="fit-content">
            <Box
              h="20px"
              w="72px"
              top="50%"
              transform="auto"
              translateY="-50%"
              left="calc(100% - 24px)"
              sx={{ ...gradientBorder({ borderWidth: 3, borderRadius: '0' }), pos: 'absolute' }}
            />
            <Card
              variant="secondary"
              w="430px"
              maxW="430px"
              borderWidth={3}
              px={5}
              py={20}
              shadow="Glow Inner"
              gap={10}
              align="center"
            >
              <SelectedBondType bondType="Classic" />
              <BondInfo
                asset="CNV"
                icon="/assets/tokens/gcnv.svg"
                roi="9.4%"
                vestingTerm="5 days"
              />
              <NothingToRedeem />
            </Card>
          </Box>
          <SwapCard
            swap={swap}
            buttonLabel="Buy with 5 days vesting"
            variant="primary"
            active="swap"
            w="380px"
          />
        </Flex>
      </Flex>
    </Container>
  )
}
