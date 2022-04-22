import {
  Box,
  Button,
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
import {
  useBondGetTermLength,
  getBondSpotPrice,
  getCurrentBlockTimestamp,
  getUserBondPositions,
  useBondState,
} from 'components/Bond/BondState'
import { useEffect, useState } from 'react'
import { useAuth } from 'contexts/AuthContext'
import { useFetchApi } from 'hooks/cnvData'
import React from 'react'
import { utils } from 'ethers'

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

const UserBondPositionInfo = ({ bondInfo, currentBlockTimestamp }) => {
  const elapsed =
    currentBlockTimestamp > bondInfo.creation ? 1 : currentBlockTimestamp / bondInfo.creation
  return (
    <Card bg="none" py={3} w="100%" direction="row" shadow="Glass Up Medium">
      <Flex justify="center" pl={4} pr={7}>
        <InfoItem
          value={`${
            bondInfo?.creation
              ? new Date(bondInfo.creation * 1000 + 432000000).toString().slice(0, 21)
              : 'Loading'
          }`}
          label="Fully Vested"
        />
      </Flex>
      <Box w="1px" mx={-1} my={-4} bg="stroke.primary" />
      <InfoItem
        value={`${
          bondInfo?.owed
            ? elapsed
              ? (+utils.formatEther(bondInfo.owed)).toFixed(2)
              : +(+utils.formatEther(bondInfo.owed)).toFixed(2) * elapsed -
                +(+utils.formatEther(bondInfo.redeemed)).toFixed(2)
            : 'Loading'
        }`}
        label="Pending"
        flexGrow={1}
      />
      <Box w="1px" mx={-1} my={-4} bg="stroke.primary" />
      <InfoItem
        value={`${
          bondInfo?.owed
            ? (+utils.formatEther(bondInfo.owed) - +utils.formatEther(bondInfo.redeemed)).toFixed(2)
            : 'Loading'
        }`}
        label="Claimable"
        px={5}
      />
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

const Redeem = ({ onConfirm }: { onConfirm: () => void }) => {
  return (
    <Card
      // shadow="Up Big"
      mb={-20}
      fontWeight="bold"
      fontSize="lg"
      w="250px"
    >
      <Button variant="primary" size="lg" isFullWidth onClick={onConfirm}>
        {UserBondPositionInfo.length < 1 ? 'Redeem' : 'Batch Redeem'}
      </Button>
    </Card>
  )
}

export default function Bond() {
  const { userAddress, signer } = useBondState()
  const [termLength, setTermLength] = useState<number>(0)
  const [bondSpotPrice, setBondSpotPrice] = useState<string>('0')
  const [cnvMarketPrice, setCnvMarketPrice] = useState<number>(0)
  const [userBondPositions, setUserBondPositions] = useState([])
  const [userBondRedeemablePositionIDs, setUserBondRedeemablePositionIDs] = useState([])
  const [userBondPositionsLength, setUserBondPositionsLength] = useState<number>(4)
  const [currentBlockTs, setCurrentBlockTs] = useState<number>()

  const { data } = useFetchApi('/api/cnv')

  if (cnvMarketPrice === 0 && !!data) {
    setCnvMarketPrice(data.cnv)
  }

  useEffect(() => {
    if (userAddress && userBondPositions.length === 0)
      getUserBondPositions(3, 2, userAddress, currentBlockTs.toString())
        .then((userPositionInfo) => {
          setUserBondPositions(userPositionInfo.positionArray)
          setUserBondRedeemablePositionIDs(userPositionInfo.redeemablePositions)
        })
        .catch((e) => {
          console.log('get position info failed', e)
        })
    getCurrentBlockTimestamp().then((x) => {
      setCurrentBlockTs(x)
    })
  }, [signer])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useBondGetTermLength(3).then((termLength) => {
      setTermLength(termLength)
    })
    getBondSpotPrice(3, '').then((bondSpotPrice) => {
      setBondSpotPrice(bondSpotPrice)
      console.log(bondSpotPrice)
    })
  }, [])
  return (
    <Container maxW="container.lg">
      <Flex direction="column" gap={20}>
        <Stack mt={20} align="center" textAlign="center">
          <Heading as="h1" mb={3} fontSize="5xl">
            Dynamic Bond Market
          </Heading>
        </Stack>

        <Flex gap={10} direction="row">
          <Box
            pos="relative"
            h="fit-content"
            overflowY={'auto'}
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
                    ? ((cnvMarketPrice / +bondSpotPrice - 1) * 100).toFixed(2)
                    : 'Loading...'
                }%`}
                vestingTerm={`${termLength} Days`}
              />
            </Card>
            {userBondPositions.map((position, i) => {
              return (
                <React.Fragment key={i}>
                  <UserBondPositionInfo
                    bondInfo={position}
                    currentBlockTimestamp={currentBlockTs}
                  />
                </React.Fragment>
              )
            })}
          </Box>

          <BondBuyCard />
        </Flex>
      </Flex>
      {userBondPositions.length > 0 ? (
        <Redeem
          onConfirm={() => {
            // make call here for a mass redeem...
            // inherit id of known redeemable positions
            // load up those arguments into the batch redemption
            console.log('test')
            //
          }}
        ></Redeem>
      ) : (
        <NothingToRedeem />
      )}
      {/* <Placeholder text="More Bonds" /> */}
    </Container>
  )
}
