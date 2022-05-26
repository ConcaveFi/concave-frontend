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
import { withPageTransition } from 'components/PageTransition'
import { TransactionErrorDialog } from 'components/TransactionErrorDialog'
import { TransactionSubmittedDialog } from 'components/TransactionSubmittedDialog'
import { WaitingConfirmationDialog } from 'components/WaitingConfirmationDialog'
import { utils } from 'ethers'
import { useGet_Accrualbondv1_Last10_SoldQuery } from 'graphql/generated/graphql'
import React, { useEffect, useState } from 'react'
import getCNVMarketPrice from 'utils/getCNVMarketPrice'
import getROI from 'utils/getROI'
// import { truncateNumber } from 'utils/truncateNumber'
//
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
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
  const [txError, setTxError] = useState('')
  const {
    isOpen: isOpenSubmitted,
    onClose: onCloseSubmitted,
    onOpen: onOpenSubmitted,
  } = useDisclosure()
  const { isOpen: isOpenError, onClose: onCloseError, onOpen: onOpenError } = useDisclosure()
  const { data: last10SoldsData, isLoading, error } = useGet_Accrualbondv1_Last10_SoldQuery()

  function updateBondPositions() {
    getUserBondPositions(networkId, userAddress, currentBlockTs)
      .then((bondSigma) => {
        setBondSigma(bondSigma)
        setButtonDisabled(false)
      })
      .catch((e) => {
        console.log('user bond fail', e)
      })
  }

  useEffect(() => {
    setIsLoadingBondSigma(true)
    getCurrentBlockTimestamp(networkId).then((x) => {
      setCurrentBlockTs(x)
    })
    updateBondPositions()
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
    getCNVMarketPrice().then((price) => {
      setCNVMarketPrice(price)
      console.log(price)
    }).catch(() => {})
  }, [networkId])

  useEffect(() => {
    const interval = setInterval(() => {
      getBondSpotPrice(networkId, '').then((bondSpotPrice) => {
        setBondSpotPrice(bondSpotPrice)
      }).catch(() => {})
      getCNVMarketPrice().then((price) => {
        setCNVMarketPrice(price)
        console.log(price)
      }).catch(() =>{})
    }, 10000)
    if (intervalID !== interval) {
      clearTimeout(intervalID)
      setIntervalID(interval)
    }
  }, [cnvMarketPrice, networkId])

  useEffect(() => {
    if (bondSigma && isLoadingBondSigma) {
      setIsLoadingBondSigma(false)
      setShowUserPosition(true)
    }
  }, [bondSigma])

  function onRedeemConfirm() {
    setButtonDisabled(true)
    const batchRedeemIDArray = bondSigma.batchRedeemArray
    setClickedRedeemButton(true)
    setOpenConfirmDialog(true)
    redeemBondBatch(networkId, batchRedeemIDArray, userAddress, signer)
      .then(async (tx) => {
        console.log(tx)
        setRedeemTx(tx)
        setOpenConfirmDialog(false)
        onOpenSubmitted()
        await tx.wait(1)
        updateBondPositions()
        setClickedRedeemButton(false)
        setButtonDisabled(false)
      })
      .catch((err) => {
        setTxError(err.message)
        setClickedRedeemButton(false)
        onOpenError()
        setButtonDisabled(false)
      })
  }

  return (
    <Container maxW="container.lg" p={'4px'}>
      <Flex direction="column" gap={10}>
        <BondDescription />
        <Flex
          gap={{ base: 3, md: 10 }}
          direction={{ lg: 'row', base: 'column' }}
          align={{ lg: 'start', base: 'center' }}
          justify={'center'}
        >
          <Box pos="relative" h="fit-content" w={{ base: '340px', md: '430px' }}>
            <Card variant="secondary" w={{ base: '340px', md: '430px' }}>
              <Card
                variant="secondary"
                borderWidth={1}
                // px={{ base: 0, md: 6 }}
                w={{ base: '340px', md: '430px' }}
                py={20}
                shadow="Glow Inner"
                gap={10}
                align="center"
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
                          onRedeemConfirm()
                        }}
                        isRedeeming={clickedRedeemButton}
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
          </Box>
          <BondBuyCard
            updateBondPositions={updateBondPositions}
            setRedeemButtonDisabled={setButtonDisabled}
          />
        </Flex>
      </Flex>
      <WaitingConfirmationDialog isOpen={openConfirmDialog} title={'Confirm Redeem'}>
        <Text fontSize="lg" color="text.accent">
          {bondSigma && bondSigma['parseRedeemable']
            ? `Redeeming ` +
              (+utils.formatEther(BigInt(parseInt(bondSigma.parseRedeemable)))).toFixed(2) +
              ` CNV`
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

export default withPageTransition(Bond)

const BondDescription = () => (
  <Stack mt={10} maxW="100%" align="center" textAlign="center">
    <Heading as="h1" mb={3} fontSize="5xl">
      Dynamic Bond Market
    </Heading>
    <Flex align={'center'} justify="center" direction={{ lg: 'row', md: 'column' }} maxW={550}>
      Bonds allow new CNV supply to be minted at a discount. All funds raised through bonds are
      added to the Concave treasury and invested to generate returns for quarterly dividends.
    </Flex>
  </Stack>
)
