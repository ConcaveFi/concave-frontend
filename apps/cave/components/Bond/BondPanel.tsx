import { SpinIcon } from '@concave/icons'
import { Box, Card, Flex, keyframes, Text } from '@concave/ui'
import { TransactionSubmittedDialog } from 'components/TransactionDialog/TransactionSubmittedDialog'
import { WaitingConfirmationDialog } from 'components/TransactionDialog/TransactionWaitingConfirmationDialog'
import { useErrorModal } from 'contexts/ErrorModal'
import { utils } from 'ethers'
import { useTransaction } from 'hooks/useTransaction'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { useSigner } from 'wagmi'
import { BondInfo, UserBondPositionInfo } from './BondInfo'
import { redeemBondBatch } from './BondState'
import { Redeem } from './Redeem'
import { SelectedBondType } from './SelectedBondType'
import { Loading } from 'components/Loading'

interface BondPanelProps {
  userAddress: string
  isLoadingBondSigma?: boolean
  bondSigma: any
  showUserPosition: boolean
  updateBondPositions?: VoidFunction
}
export function BondPanel(props: BondPanelProps) {
  const networkId = useCurrentSupportedNetworkId()
  const errorModal = useErrorModal()
  const { data: signer } = useSigner()
  const redeemBond = useTransaction(
    () => {
      const batchRedeemIDArray = props?.bondSigma.batchRedeemArray
      return redeemBondBatch(networkId, batchRedeemIDArray, props?.userAddress, signer)
    },
    {
      meta: { type: 'redeem', amount: 'CNV Bonds' },
      onSuccess: props.updateBondPositions,
      onError: errorModal.onOpen,
    },
  )
  const buttonDisabled =
    redeemBond.isWaitingForConfirmation || redeemBond.isWaitingTransactionReceipt
  const isRedeeming = redeemBond.isWaitingForConfirmation || redeemBond.isWaitingTransactionReceipt

  return (
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
        {!props?.userAddress && props?.isLoadingBondSigma ? (
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
        ) : props.isLoadingBondSigma ? (
          <Loading message="Checking positions..." />
        ) : (
          ''
        )}
        {!props.isLoadingBondSigma && (
          <>
            <BondInfo asset="CNV" icon="/assets/tokens/cnv.svg" />
            <UserBondPositionInfo bondSigma={props?.bondSigma} userAddress={props?.userAddress} />
            {props?.showUserPosition && (
              <Redeem
                bondSigma={props?.bondSigma}
                buttonDisabled={buttonDisabled}
                onConfirm={redeemBond.sendTx}
                isRedeeming={isRedeeming}
                customHeight
              />
            )}
          </>
        )}
      </Flex>

      {/* DIALOGS */}
      <TransactionSubmittedDialog
        txHash={redeemBond.tx?.hash}
        isOpen={redeemBond.isWaitingTransactionReceipt}
      />
      <WaitingConfirmationDialog
        isOpen={redeemBond.isWaitingForConfirmation}
        title={'Confirm redeem'}
      >
        <Text fontSize="lg" color="text.accent">
          {props?.bondSigma && props?.bondSigma['parsRedeemable']
            ? `Redeeming ` +
              (+utils.formatEther(BigInt(Math.floor(props?.bondSigma.parsRedeemable)))).toFixed(2) +
              ` CNV`
            : ''}
        </Text>
      </WaitingConfirmationDialog>
    </Card>
  )
}
