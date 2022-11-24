import { keyframes } from '@chakra-ui/system'
import { SpinIcon } from '@concave/icons'
import { Box, Card, Flex, Heading, Stack, Text, useDisclosure } from '@concave/ui'
import { BondBuyCard } from 'components/Bond/BondBuyCard'
import { BondInfo, UserBondPositionInfo } from 'components/Bond/BondInfo'
import { BondSoldsCard } from 'components/Bond/BondSoldsCard'
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
import { TransactionErrorDialog } from 'components/TransactionDialog/TransactionErrorDialog'
import { TransactionSubmittedDialog } from 'components/TransactionDialog/TransactionSubmittedDialog'

import { WaitingConfirmationDialog } from 'components/TransactionDialog/TransactionWaitingConfirmationDialog'
import { utils } from 'ethers'
import { useTransactionRegistry } from 'hooks/TransactionsRegistry'
import { useCNVPrice } from 'hooks/useCNVPrice'
import { useEffect, useState } from 'react'
const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
})

export function Bond() {
  const { userAddress, signer, networkId } = useBondState()
  const spinnerStyles = { animation: `${spin} 2s linear infinite`, size: 'sm' }
  const [termLength, setTermLength] = useState<number>(0)
  const [bondSpotPrice, setBondSpotPrice] = useState<string>('0')
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

  const cnvPrice = useCNVPrice()
  const {
    isOpen: isOpenSubmitted,
    onClose: onCloseSubmitted,
    onOpen: onOpenSubmitted,
  } = useDisclosure()
  const { isOpen: isOpenError, onClose: onCloseError, onOpen: onOpenError } = useDisclosure()

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
  }, [networkId])

  useEffect(() => {
    const interval = setInterval(() => {
      getBondSpotPrice(networkId, '')
        .then((bondSpotPrice) => {
          setBondSpotPrice(bondSpotPrice)
        })
        .catch(() => {})
    }, 10000)
    if (intervalID !== interval) {
      clearTimeout(intervalID)
      setIntervalID(interval)
    }
    return clearInterval(interval)
  }, [networkId])

  useEffect(() => {
    if (bondSigma && isLoadingBondSigma) {
      setIsLoadingBondSigma(false)
      setShowUserPosition(true)
    }
  }, [bondSigma])

  const { registerTransaction } = useTransactionRegistry()

  function onRedeemConfirm() {
    setButtonDisabled(true)
    const batchRedeemIDArray = bondSigma.batchRedeemArray
    setClickedRedeemButton(true)
    setOpenConfirmDialog(true)
    redeemBondBatch(networkId, batchRedeemIDArray, userAddress, signer)
      .then(async (tx) => {
        setRedeemTx(tx)
        setOpenConfirmDialog(false)
        onOpenSubmitted()
        registerTransaction(tx, { type: 'redeem', amount: 'CNV Bonds' })
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
  const roi = (1 - +bondSpotPrice / +cnvPrice.price?.toSignificant(8)) * 100

  return (
    <Flex
      direction={'column'}
      mx="auto"
      p={0}
      gap={{ base: 3, lg: 2, xl: 10 }}
      w={{ base: '430px', lg: '720px', xl: '900px' }}
    >
      <BondDescription />
      <Flex
        // gap={{ base: 3, md: 10 }}
        direction={{ lg: 'row', base: 'column' }}
        // align={{ lg: 'start', base: 'center' }}
        // justify={'space-between'}
        gap={{ base: 3, lg: 2, xl: 10 }}
        w="full"
      >
        <Card
          // minW={{ base: '340px', md: '430px' }}
          w="full"
          px={{ base: 0, md: 6 }}
          variant="secondary"
          shadow="Glow Inner"
          height="386px"
          align="center"
        >
          <SelectedBondType bondType="Classic" />
          <Flex
            flex={1}
            align="center"
            direction={'column'}
            justify="space-between"
            w="full"
            gap={4}
            pt={6}
          >
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
              <Flex
                position={'relative'}
                flexDirection="column"
                my="auto"
                alignItems={'center'}
                gap={5}
              >
                Checking positions...
                <SpinIcon __css={spinnerStyles} width={'10'} height={'10'} />
              </Flex>
            ) : (
              ''
            )}
            {!isLoadingBondSigma && (
              <>
                <BondInfo
                  asset="CNV"
                  icon="/assets/tokens/cnv.svg"
                  roi={roi}
                  vestingTerm={`${termLength} Days`}
                />
                <UserBondPositionInfo bondSigma={bondSigma} userAddress={userAddress} />
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
          </Flex>
        </Card>

        <BondBuyCard
          roi={roi}
          updateBondPositions={updateBondPositions}
          setRedeemButtonDisabled={setButtonDisabled}
        />
      </Flex>
      <BondSoldsCard />
      <WaitingConfirmationDialog isOpen={openConfirmDialog} title={'Confirm redeem'}>
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
    </Flex>
  )
}

Bond.Meta = {
  title: 'Concave | Bonding',
  description: `Concave's Smart Bonding offers capital efficient bonds for virtually any ERC20 token, pricing and issuance model, which is optimized by an off-chain algorithm.`,
}

export default withPageTransition(Bond)

const BondDescription = () => (
  <Stack mt={10} maxW="100%" align="center" textAlign="center">
    <Heading
      apply="background.text-brightBlue"
      fontWeight="semibold"
      variant={'H2'}
      fontSize="5xl"
      mb={3}
    >
      Dynamic Bond Market
    </Heading>
    <Flex
      direction={{ lg: 'row', md: 'column' }}
      apply="background.text-brightBlue"
      align={'center'}
      justify="center"
      maxW={550}
    >
      Bonds allow new CNV supply to be minted at a discount. All funds raised through bonds are
      added to the Concave treasury and invested to generate returns for quarterly dividends.
    </Flex>
  </Stack>
)
