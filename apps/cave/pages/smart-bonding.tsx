import { keyframes } from '@chakra-ui/system'
import { SpinIcon } from '@concave/icons'
import { Box, Card, Collapse, Container, Flex, Heading, Stack, Text } from '@concave/ui'
import { BondBuyCard } from 'components/Bond/BondBuyCard'
import { BondInfo, UserBondPositionInfo } from 'components/Bond/BondInfo'
import BondSoldsCard from 'components/Bond/BondSoldsCard'
import {
  getBondSpotPrice,
  getBondTermLength,
  getCurrentBlockTimestamp,
  getUserBondPositions,
  redeemBondBatch,
  useBondState,
} from 'components/Bond/BondState'
import { Redeem } from 'components/Bond/Redeem'
import { SelectedBondType } from 'components/Bond/SelectedBondType'
import { withPageTransition } from 'components/PageTransition'
import { useGet_Accrualbondv1_Last10_SoldQuery } from 'graphql/generated/graphql'
import React, { useEffect, useState } from 'react'
const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
})

export function Bond() {
  const { userAddress, signer, networkId } = useBondState()
  const spinnerStyles = { animation: `${spin} 2s linear infinite`, size: 'sm' }
  const [termLength, setTermLength] = useState<number>(0)
  const [bondSpotPrice, setBondSpotPrice] = useState<string>('0')
  const [cnvMarketPrice, setCnvMarketPrice] = useState<Object>()
  const [currentBlockTs, setCurrentBlockTs] = useState<number>(0)
  const [bondSigma, setBondSigma] = useState<any>()
  const [intervalID, setIntervalID] = useState<any>()
  const [showUserPosition, setShowUserPosition] = useState(false)
  const { data: last10SoldsData, isLoading, error } = useGet_Accrualbondv1_Last10_SoldQuery()

  useEffect(() => {
    getCurrentBlockTimestamp(networkId).then((x) => {
      setCurrentBlockTs(x)
    })
    const interval = setInterval(() => {
      return new Promise((resolve) => {
        getUserBondPositions(networkId, userAddress, currentBlockTs)
          .then((x) => {
            setBondSigma(x)
          })
          .catch((e) => {
            console.log('user bond fail', e)
          })
        resolve(null)
      })
    }, 6000)
    if (intervalID !== interval) {
      clearTimeout(intervalID)
      setIntervalID(interval)
    }
  }, [userAddress, currentBlockTs])

  useEffect(() => {
    getBondTermLength(networkId)
      .then((termLength) => {
        setTermLength(termLength)
      })
      .catch((e) => {
        console.log(e)
      })
    getBondSpotPrice(networkId, '')
      .then((bondSpotPrice) => {
        setBondSpotPrice(bondSpotPrice)
      })
      .catch((e) => {
        console.log(e)
      })
    fetch('/api/cnv')
      .then((j) => j.json())
      .then((data) => JSON.parse(data))
      .then((data) => {
        if (data?.data) {
          setCnvMarketPrice(data.data.last)
        }
      })
      .catch((e) => {
        throw e
      })
  }, [networkId])

  useEffect(() => {
    if (bondSigma) {
      setShowUserPosition(true)
    }
  }, [bondSigma])

  return (
    <Flex p={'0px'} width={'full'}>
      <Flex width={'full'} direction="column" gap={{ base: 3, md: 10 }} align="center">
        <Stack mt={10} maxW="100%" align="center" textAlign="center">
          <Heading as="h1" mb={3} fontSize={{ base: '3xl', md: '5xl' }}>
            Dynamic Bond Market
          </Heading>
          <Flex
            maxW={{ base: '350px', md: '600px' }}
            align={'center'}
            justify="center"
            direction={{ lg: 'row', md: 'column' }}
          >
            <Text fontSize={{ base: 'sm', md: 'lg' }}>
              Bonds allow new CNV supply to be minted at a discount. All funds raised through bonds
              are added to the Concave treasury and invested to generate returns for quarterly
              dividends.
            </Text>
          </Flex>
        </Stack>

        <Flex
          gap={{ base: 3, md: 10 }}
          direction={{ lg: 'row', base: 'column' }}
          align={{ lg: 'start', md: 'center' }}
          justifyContent={'center'}
          w={{ base: '350px', md: 'full' }}
        >
          <Box pos="relative" h="fit-content" maxW={{ base: '360px', md: '430px' }}>
            <Card variant="secondary" w={{ base: '350px', md: '430px' }}>
              <Card
                variant="secondary"
                borderWidth={1}
                px={{ base: 0, md: 6 }}
                py={20}
                shadow="Glow Inner"
                gap={10}
                align="center"
                w={{ base: '350px', md: '430px' }}
                height="386px"
              >
                <SelectedBondType bondType="Classic" />
                <BondInfo
                  asset="CNV"
                  icon="/assets/tokens/cnv.svg"
                  roi={`${
                    cnvMarketPrice > 0
                      ? ((1 - +bondSpotPrice / +cnvMarketPrice) * 100).toFixed(2)
                      : '-'
                  }%`}
                  vestingTerm={`${termLength} Days`}
                />
                {!userAddress && !bondSigma ? (
                  <>Wallet not connected</>
                ) : !bondSigma ? (
                  <>
                    Checking positions...
                    <SpinIcon __css={spinnerStyles} width={'10'} height={'10'} />
                  </>
                ) : (
                  ''
                )}
                <Box w="100%">
                  <Collapse in={showUserPosition}>
                    <UserBondPositionInfo bondSigma={bondSigma} userAddress={userAddress} />
                  </Collapse>
                </Box>
                <Redeem
                  bondSigma={bondSigma}
                  onConfirm={() => {
                    const batchRedeemIDArray = bondSigma.batchRedeemArray
                    redeemBondBatch(networkId, batchRedeemIDArray, userAddress, signer)
                  }}
                  largeFont
                  setBottom
                  customHeight
                ></Redeem>
              </Card>
              <BondSoldsCard loading={isLoading} error={error} data={last10SoldsData} />
            </Card>
          </Box>
          <BondBuyCard />
        </Flex>
      </Flex>
    </Flex>
  )
}

Bond.Meta = {
  title: 'Concave | Bonding',
  description: `Concave's Smart Bonding offers capital efficient bonds for virtually any ERC20 token, pricing and issuance model, which is optimized by an off-chain algorithm.`,
}

export default withPageTransition(Bond)
