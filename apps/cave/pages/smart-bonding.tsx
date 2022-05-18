import { keyframes } from '@chakra-ui/system'
import { SpinIcon } from '@concave/icons'
import {
  Box,
  Card,
  Collapse,
  Container,
  Flex,
  Heading,
  Stack,
  useDisclosure,
  Text,
} from '@concave/ui'
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
import { TransactionErrorDialog } from 'components/TransactionErrorDialog'
import { TransactionSubmittedDialog } from 'components/TransactionSubmittedDialog'
import { WaitingConfirmationDialog } from 'components/WaitingConfirmationDialog'
import { useGet_Accrualbondv1_Last10_SoldQuery } from 'graphql/generated/graphql'
import React, { useEffect, useState } from 'react'
import getCNVMarketPrice from 'utils/getCNVMarketPrice'
import getROI from 'utils/getROI'
import { truncateNumber } from 'utils/truncateNumber'
const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
})

export function Bond() {
  const { userAddress, signer, networkId } = useBondState()
  const spinnerStyles = { animation: `${spin} 2s linear infinite`, size: 'sm' }
  const [termLength, setTermLength] = useState<number>(0)
  const [bondSpotPrice, setBondSpotPrice] = useState<string>('0')
  const [cnvMarketPrice, setCNVMarketPrice] = useState<Object>()
  const [currentBlockTs, setCurrentBlockTs] = useState<number>(0)
  const [bondSigma, setBondSigma] = useState<any>()
  const [intervalID, setIntervalID] = useState<any>()
  const [showUserPosition, setShowUserPosition] = useState(false)
  const [isLoadingBondSigma, setIsLoadingBondSigma] = useState(true)
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [redeemTx, setRedeemTx] = useState<any>()
  const [clickedRedeemButton, setClickedRedeemButton] = useState(false)
  const [txError, setTxError] = useState('')
  const {
    isOpen: isOpenSubmitted,
    onClose: onCloseSubmitted,
    onOpen: onOpenSubmitted,
  } = useDisclosure()
  const { isOpen: isOpenError, onClose: onCloseError, onOpen: onOpenError } = useDisclosure()
  const { data: last10SoldsData, isLoading, error } = useGet_Accrualbondv1_Last10_SoldQuery()

  useEffect(() => {
    setIsLoadingBondSigma(true)
    getCurrentBlockTimestamp(networkId).then((x) => {
      setCurrentBlockTs(x)
    })
    const interval = setInterval(() => {
      return new Promise((resolve) => {
        getUserBondPositions(networkId, userAddress, currentBlockTs)
          .then((bondSigma) => {
            if (bondSigma.address === userAddress) {
              setBondSigma(bondSigma)
            }
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
          setCNVMarketPrice(data.data.last)
        }
      })
      .catch((e) => {
        throw e
      })
  }, [networkId])

  useEffect(() => {
    setIsLoadingBondSigma(true)
    setBondSigma(null)
  }, [userAddress])

  useEffect(() => {
    if (bondSigma && isLoadingBondSigma) {
      console.log('bondSigma', bondSigma)
      setIsLoadingBondSigma(false)
      setShowUserPosition(true)
    }
  }, [bondSigma])

  return (
    <Container maxW="container.lg">
      <Flex direction="column" gap={10}>
        <Stack mt={10} maxW="100%" align="center" textAlign="center">
          <Heading as="h1" mb={3} fontSize="5xl">
            Dynamic Bond Market
          </Heading>
          <Flex
            align={'center'}
            justify="center"
            direction={{ lg: 'row', md: 'column' }}
            maxW={550}
          >
            Bonds allow new CNV supply to be minted at a discount. All funds raised through bonds
            are added to the Concave treasury and invested to generate returns for quarterly
            dividends.
          </Flex>
        </Stack>

        <Flex
          gap={10}
          direction={{ lg: 'row', md: 'column' }}
          align={{ lg: 'start', md: 'center' }}
          justifyContent={'center'}
        >
          <Box pos="relative" h="fit-content">
            <Card variant="secondary">
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
                {!userAddress && isLoadingBondSigma ? (
                  <Box
                    position={'relative'}
                    top={'32.5%'}
                    display={'flex'}
                    flexDirection="column"
                    alignItems={'center'}
                    gap={10}
                  >
                    Wallet not connected
                  </Box>
                ) : isLoadingBondSigma ? (
                  <Box
                    position={'relative'}
                    top={'32.5%'}
                    display={'flex'}
                    flexDirection="column"
                    alignItems={'center'}
                    gap={10}
                  >
                    Checking positions...
                    <SpinIcon __css={spinnerStyles} width={'10'} height={'10'} />
                  </Box>
                ) : (
                  ''
                )}
                {!isLoadingBondSigma && (
                  <>
                    <Box w="100%">
                      <Collapse in={showUserPosition}>
                        <BondInfo
                          asset="CNV"
                          icon="/assets/tokens/cnv.svg"
                          roi={getROI(cnvMarketPrice, bondSpotPrice)}
                          vestingTerm={`${termLength} Days`}
                        />
                      </Collapse>
                    </Box>

                    <Box w="100%">
                      <Collapse in={showUserPosition}>
                        <UserBondPositionInfo bondSigma={bondSigma} userAddress={userAddress} />
                      </Collapse>
                    </Box>

                    {showUserPosition && (
                      <Redeem
                        bondSigma={bondSigma}
                        buttonDisabled={buttonDisabled}
                        onConfirm={() => {
                          setButtonDisabled(true)
                          const batchRedeemIDArray = bondSigma.batchRedeemArray
                          setClickedRedeemButton(true)
                          redeemBondBatch(networkId, batchRedeemIDArray, userAddress, signer)
                            .then(async (tx) => {
                              console.log(tx)
                              setRedeemTx(tx)
                              setClickedRedeemButton(false)
                              onOpenSubmitted()
                              await tx.wait(1)
                              setButtonDisabled(false)
                            })
                            .catch((err) => {
                              setTxError(err.message)
                              setClickedRedeemButton(false)
                              onOpenError()
                              setButtonDisabled(false)
                            })
                        }}
                        largeFont
                        setBottom
                        customHeight
                      />
                    )}
                  </>
                )}
              </Card>
              <BondSoldsCard loading={isLoading} error={error} data={last10SoldsData} />
            </Card>
            {/* <ViewSoldsButton onClick={() => setIsOpen(!isOpen)} active={isOpen} /> */}
          </Box>
          <BondBuyCard />
        </Flex>
      </Flex>
      <WaitingConfirmationDialog isOpen={clickedRedeemButton} title={'Confirm Redeem'}>
        <Text fontSize="lg" color="text.accent">
          {bondSigma && bondSigma['parseRedeemable']
            ? `Redeeming ` + truncateNumber(bondSigma.parseRedeemable) + ` CNV`
            : ''}
        </Text>
      </WaitingConfirmationDialog>
      <TransactionSubmittedDialog tx={redeemTx} isOpen={isOpenSubmitted} />
      <TransactionErrorDialog error={txError} isOpen={isOpenError} />
    </Container>
  )
}

Bond.Meta = {
  title: 'Concave | Bonding',
  description: `Concave's Smart Bonding offers capital efficient bonds for virtually any ERC20 token, pricing and issuance model, which is optimized by an off-chain algorithm.`,
}

export default Bond
