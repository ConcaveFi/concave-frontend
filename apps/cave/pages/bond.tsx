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
import { BondBuyCard } from 'components/Bond/BondBuyCard'
import Placeholder from 'components/Placeholder'
import { useBondGetTermLength, getBondSpotPrice } from 'components/Bond/BondState'
import { useEffect, useState } from 'react'
import { useAuth } from 'contexts/AuthContext'
import { useFetchApi } from 'hooks/cnvData'
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
      colorscheme="brighter"
      shadow="Magic Big"
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
  const [termLength, setTermLength] = useState<number>(0)
  const [bondSpotPrice, setBondSpotPrice] = useState<string>('0')
  const [cnvMarketPrice, setCnvMarketPrice] = useState<number>(0)
  const { data } = useFetchApi('/api/cnv')

  if (cnvMarketPrice === 0 && !!data) {
    setCnvMarketPrice(data.cnv)
  }
  useBondGetTermLength(3).then((termLength) => {
    setTermLength(termLength)
  })
  useEffect(() => {
    getBondSpotPrice(3, '').then((bondSpotPrice) => {
      setBondSpotPrice(bondSpotPrice)
    })
  }, [cnvMarketPrice])

  return (
    <Container maxW="container.lg">
      <Flex direction="column" gap={20}>
        <Stack mt={20} align="center" textAlign="center">
          <Heading as="h1" mb={3} fontSize="5xl">
            Dynamic Bond Market
          </Heading>
        </Stack>

        <Flex gap={10} direction="row">
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
                roi={`${
                  cnvMarketPrice > 0
                    ? ((cnvMarketPrice / +bondSpotPrice - 1) * 100).toFixed(2)
                    : 'Loading...'
                }%`}
                vestingTerm={`${termLength} Days`}
              />
              <NothingToRedeem />
            </Card>
          </Box>

          <BondBuyCard />
        </Flex>
      </Flex>
      <Placeholder text="More Bonds" />
    </Container>
  )
}
