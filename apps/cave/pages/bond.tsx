import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useMediaQuery,
} from '@concave/ui'
import { BondBuyCard } from 'components/Bond/BondBuyCard'
import {
  useBondGetTermLength,
  getBondSpotPrice,
  getCurrentBlockTimestamp,
  getUserBondPositions,
  useBondState,
  redeemBondBatch
} from 'components/Bond/BondState'
import { useEffect, useState } from 'react'
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
    <Text fontSize="sm" fontFamily="heading">
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

const UserBondPositionInfo = (bondSigma) => {
  const parse = bondSigma?.bondSigma
  const oldestBond = parse?.parseOldest
  const totalOwed = parse?.totalOwed
  const totalPending = parse?.totalPending.toFixed(2)

  return (
    <Card bg="none" py={3} w="100%" direction="row" shadow="Glass Up Medium">
      <Flex justify="center" pl={4} pr={7}>
        <InfoItem value={totalOwed > 0 ? oldestBond : 'N/A'} label={oldestBond ? 'Fully Vested' : ''} />
      </Flex>
      <Box w="1px" mx={-1} my={-4} bg="stroke.primary" />
      <InfoItem
        value={totalOwed}
        label={totalOwed ? 'Purchased' : 'No Bonds to Claim'}
        flexGrow={1}
      />
      <Box w="1px" mx={-1} my={-4} bg="stroke.primary" />
      <InfoItem value={totalPending} label={totalPending ? 'Redeemed' : ''} px={5} />
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

const Redeem = ({ onConfirm, bondSigma }: { onConfirm: () => void; bondSigma }) => {
  const display = !!bondSigma ? 1 : 0
  const parse = bondSigma?.bondSigma
  const batchRedeemIDArray = parse?.batchRedeemArray
  return (
    <Card mb={-20} fontWeight="bold" fontSize="lg" w="250px">
      {display ? (
        <Button variant="primary" size="lg" isFullWidth onClick={onConfirm}>
          Redeem
        </Button>
      ) : (
        ''
      )}
    </Card>
  )
}

export default function Bond() {
  const { userAddress, signer } = useBondState()
  const [termLength, setTermLength] = useState<number>(0)
  const [bondSpotPrice, setBondSpotPrice] = useState<string>('0')
  const [cnvMarketPrice, setCnvMarketPrice] = useState<Object>()
  const [currentBlockTs, setCurrentBlockTs] = useState<number>(0)
  const [bondSigma, setBondSigma] = useState<any>()
  

  useEffect(() => {
    getCurrentBlockTimestamp().then((x) => {
      setCurrentBlockTs(x)
    })
    if (userAddress)
      getUserBondPositions(3, userAddress, currentBlockTs)
        .then((x) => {
          setBondSigma(x)
        })
        .catch((e) => {
          console.log('get position info failed', e)
        })
  }, [signer])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useBondGetTermLength(3).then((termLength) => {
      setTermLength(termLength)
    })
    getBondSpotPrice(3, '').then((bondSpotPrice) => {
      setBondSpotPrice(bondSpotPrice)
    })
    fetch('/api/cnv')
      .then((j) => j.json())
      .then((data) => {
        if (data?.data) {
          setCnvMarketPrice(data.data.last)
        }
      })
      .catch((e) => {
        throw e
      })
  }, [])

  const [isLargerThan1200] = useMediaQuery('(min-width: 1200px)')

  return (
    <Container maxW="container.lg">
      <Flex direction="column" gap={20}>
        <Stack mt={20} align="center" textAlign="center">
          <Heading as="h1" mb={3} fontSize="5xl">
            Dynamic Bond Market
          </Heading>
        </Stack>

        <Flex
          gap={10}
          direction={isLargerThan1200 ? 'row' : 'column'}
          align={isLargerThan1200 ? 'start' : 'center'}
        >
          <Box
            pos="relative"
            h="fit-content"
            maxHeight={'500px'}
            css={{
              '&::-webkit-scrollbar': {
                width: '1px',
              },
              '&::-webkit-scrollbar-track': {
                width: '1px',
              },
              '&::-webkit-scrollbar-thumb': {
                borderRadius: '10px',
                background: 'white',
              },
            }}
          >
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
                icon="/assets/tokens/cnv.svg"
                roi={`${
                  cnvMarketPrice > 0
                    ? ((+cnvMarketPrice / +bondSpotPrice - 1) * 100).toFixed(2)
                    : 'Loading...'
                }%`}
                vestingTerm={`${termLength} Days`}
              />
              <UserBondPositionInfo bondSigma={bondSigma} />
              <Redeem
                bondSigma={bondSigma}
                onConfirm={() => {
                  const batchRedeemIDArray = bondSigma.batchRedeemArray
                  redeemBondBatch(3, batchRedeemIDArray, userAddress, signer)
                }}
              ></Redeem>
            </Card>
          </Box>
          <BondBuyCard />
        </Flex>
      </Flex>
    </Container>
  )
}
