import { keyframes } from '@chakra-ui/system'
import { SpinIcon } from '@concave/icons'
import { Box, Card, Flex, Heading, Stack, Text, useDisclosure } from '@concave/ui'
import { BondBuyCard } from 'components/Bond/BondBuyCard'
import { BondInfo, UserBondPositionInfo } from 'components/Bond/BondInfo'
import { BondSoldsCard } from 'components/Bond/BondSoldsCard'
import {
  getCurrentBlockTimestamp,
  getUserBondPositions,
  redeemBondBatch,
  ReturnBondPositions,
  useBondState,
} from 'components/Bond/BondState'
import { Redeem } from 'components/Bond/Redeem'
import { SelectedBondType } from 'components/Bond/SelectedBondType'
import { withPageTransition } from 'components/PageTransition'
import { TransactionErrorDialog } from 'components/TransactionDialog/TransactionErrorDialog'
import { TransactionSubmittedDialog } from 'components/TransactionDialog/TransactionSubmittedDialog'

import { WaitingConfirmationDialog } from 'components/TransactionDialog/TransactionWaitingConfirmationDialog'
import { utils } from 'ethers'
import { useTransaction } from 'hooks/TransactionsRegistry/useTransaction'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'

const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
})

const useCurrentBlockTs = (networkId:number) => {
  const enabled = networkId != undefined;
  return useQuery(['useCurrentBlockTs', networkId], () => 
  getCurrentBlockTimestamp(networkId)
  , { enabled }
)}

export function Bond() {
  const { userAddress, signer, networkId } = useBondState()
  const spinnerStyles = { animation: `${spin} 2s linear infinite`, size: 'sm' }
  const [bondSigma, setBondSigma] = useState<ReturnBondPositions>()
  const [showUserPosition, setShowUserPosition] = useState(true)
  const currentBlockTs = useCurrentBlockTs(networkId)
  const isLoadingBondSigma = currentBlockTs.isFetching && !!currentBlockTs.data

  const updateBondPositions = async () => {
    const bondSigma = await getUserBondPositions(networkId, userAddress, currentBlockTs.data)
    setBondSigma(bondSigma)
    setShowUserPosition(true)
  }

  const redeemBond = useTransaction(()=> {
    const batchRedeemIDArray = bondSigma.batchRedeemArray
    return redeemBondBatch(networkId, batchRedeemIDArray, userAddress, signer)
  },{
    meta: { type: 'redeem', amount: 'CNV Bonds' },
    onSuccess: () => {
      updateBondPositions()
    }
  })
  const buttonDisabled =  redeemBond.isWaitingForConfirmation || redeemBond.isWaitingTransactionReceipt
  const isRedeeming =  redeemBond.isWaitingForConfirmation || redeemBond.isWaitingTransactionReceipt

  useEffect(() => {
    if (!userAddress) return
    if (!currentBlockTs.data) return
    updateBondPositions()
  }, [userAddress, currentBlockTs.data])
  
  return (
    <Flex
      direction={'column'}
      mx="auto"
      p={0}
      gap={{ base: 3, lg: 2, xl: 10 }}
      w={{ base: '430px', lg: '720px', xl: '900px' }}
    >
      <BondDescription />
      <Flex direction={{ lg: 'row', base: 'column' }} gap={{ base: 3, lg: 2, xl: 10 }} w="full">
        <Card px={{ base: 0, md: 6 }} variant="secondary" height="386px" align="center" w="full">
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
                />
                <UserBondPositionInfo bondSigma={bondSigma} userAddress={userAddress} />
                {showUserPosition && (
                  <Redeem
                    bondSigma={bondSigma}
                    buttonDisabled={buttonDisabled}
                    onConfirm={redeemBond.sendTx}
                    isRedeeming={isRedeeming}
                    customHeight
                  />
                )}
              </>
            )}
          </Flex>
        </Card>

        <BondBuyCard
          updateBondPositions={updateBondPositions}
        />
      </Flex>
      <BondSoldsCard />
      <WaitingConfirmationDialog isOpen={redeemBond.isWaitingForConfirmation} title={'Confirm redeem'}>
        <Text fontSize="lg" color="text.accent">
          {bondSigma && bondSigma['parseRedeemable']
            ? `Redeeming ` +
              (+utils.formatEther(BigInt(Math.floor(bondSigma.parseRedeemable)))).toFixed(2) +
              ` CNV`
            : ''}
        </Text>
      </WaitingConfirmationDialog>
      <TransactionSubmittedDialog tx={redeemBond.tx} isOpen={redeemBond.isWaitingTransactionReceipt} />
      <TransactionErrorDialog error={redeemBond?.error?.reason} isOpen={!!redeemBond?.error?.reason} />
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
