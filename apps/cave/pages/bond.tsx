import { Box, Card, Collapse, Container, Flex, Heading, Stack, useMediaQuery } from '@concave/ui'
import {
  getBondTermLength,
  getBondSpotPrice,
  getCurrentBlockTimestamp,
  getUserBondPositions,
  useBondState,
  redeemBondBatch,
} from 'components/Bond/BondState'
import { BondBuyCard } from 'components/Bond/BondBuyCard'
import { SelectedBondType } from 'components/Bond/SelectedBondType'
import { Redeem } from 'components/Bond/Redeem'
import { BondInfo, UserBondPositionInfo } from 'components/Bond/BondInfo'
import { useEffect, useState } from 'react'
import React from 'react'
import { keyframes } from '@chakra-ui/system'
const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
})
import { SpinIcon } from '@concave/icons'
import BondBuyCardContainer from 'components/Bond/BondBuyCardContainer'
import BondToastCard from 'components/Bond/BondToastCard'

export default function Bond() {
  const { userAddress, signer, networkId } = useBondState()
  const spinnerStyles = { animation: `${spin} 2s linear infinite`, size: 'sm' }
  const [termLength, setTermLength] = useState<number>(0)
  const [bondSpotPrice, setBondSpotPrice] = useState<string>('0')
  const [cnvMarketPrice, setCnvMarketPrice] = useState<Object>()
  const [currentBlockTs, setCurrentBlockTs] = useState<number>(0)
  const [bondSigma, setBondSigma] = useState<any>()
  const [isLargerThan1200] = useMediaQuery('(min-width: 1280px)')
  const [intervalID, setIntervalID] = useState<any>()
  const [direction, setDirection] = useState<'row' | 'column'>('row')
  // const [align, setAlign] = useState<'start' | 'center'>('center')
  const align = 'center'
  const [showUserPosition, setShowUserPosition] = useState(false)

  useEffect(() => {
    getCurrentBlockTimestamp().then((x) => {
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
      .then((object) => {
        if (object) {
          setCnvMarketPrice(object?.data?.last)
        }
      })
      .catch((e) => {
        throw e
      })
  }, [networkId])

  useEffect(() => {
    setDirection(isLargerThan1200 ? 'row' : 'column')
    // setAlign(isLargerThan1200 ? 'start' : 'center')
  }, [isLargerThan1200])

  useEffect(() => {
    if (bondSigma) {
      setShowUserPosition(true)
    }
  }, [bondSigma])
  return (
    <Container maxW="container.lg">
      <Flex direction="column" gap={20}>
        <Stack mt={20} maxW="100%" align="center" textAlign="center">
          <Heading as="h1" mb={3} fontSize="5xl">
            Dynamic Bond Market
          </Heading>
          <Flex align={'center'} justify="center" direction={direction} maxW={550}>
            Bonds allow new CNV supply to be minted at a discount. All funds raised through bonds
            are added to the Concave treasury and invested to generate returns for quarterly
            dividends.
          </Flex>
        </Stack>

        <Flex gap={10} direction={direction} align={align} justifyContent={'center'}>
          <Box pos="relative" h="fit-content">
            <Card
              variant="secondary"
              borderWidth={1}
              px={6}
              py={20}
              shadow="Glow Inner"
              gap={10}
              align="center"
              w="430px"
              height="386px"
            >
              <SelectedBondType bondType="Classic" />
              <BondInfo
                asset="CNV"
                icon="/assets/tokens/cnv.svg"
                roi={`${
                  cnvMarketPrice > 0
                    ? (1 - (+cnvMarketPrice / +bondSpotPrice) * 100).toFixed(2)
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
          </Box>
          <BondBuyCardContainer />
        </Flex>
      </Flex>
      <BondToastCard link="" title="" type="info" />
    </Container>
  )
}
