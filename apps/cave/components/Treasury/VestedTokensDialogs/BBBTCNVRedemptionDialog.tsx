import { Button, Card, Flex, Modal, Text, NumericInput, useDisclosure } from '@concave/ui'
import { TransactionErrorDialog } from 'components/TransactionErrorDialog'
import { TransactionSubmittedDialog } from 'components/TransactionSubmittedDialog'
import { WaitingConfirmationDialog } from 'components/WaitingConfirmationDialog'
import { RedeemBBT_CNV_Abi } from 'contracts/VestedTokens/RedeemBbtCNVAbi'
import { Contract, ethers, Transaction } from 'ethers'
import { concaveProvider as provider } from 'lib/providers'
import { useState } from 'react'
import { useAccount, useSigner } from 'wagmi'
import useBBTCNVRedeemable from '../Hooks/useBBTCNVRedeemable'
import useVestedTokens from '../Hooks/useVestedTokens'
interface BBBTCNVRedemptionDialogProps {
  onClose: () => void
  isOpen: boolean
}

export default function BBBTCNVRedemptionDialog(props: BBBTCNVRedemptionDialogProps) {
  const { isOpen: isConfirmOpen, onOpen: onOpenConfirm, onClose: onCloseConfirm } = useDisclosure()
  const { isOpen: isSubOpen, onOpen: onOpenSub, onClose: onCloseSub } = useDisclosure()
  const { isOpen: isErrorOpen, onOpen: onOpenError, onClose: onCloseError } = useDisclosure()
  const { onClose, isOpen } = props
  const [{ data: signer }] = useSigner()
  const [{ data: account }] = useAccount()

  const [value, setValue] = useState<number>()
  const [tx, setTx] = useState<Transaction>()
  const [error, setError] = useState('')

  const { data: redeemableValue, isLoading } = useBBTCNVRedeemable()
  const { bbtCNVData } = useVestedTokens({ chainId: 4 })

  const balance = parseFloat(bbtCNVData?.formatted)
  const redeemableExceeded = value > +redeemableValue?.toString() && value <= balance
  const insufficientFounds = value > balance
  const invalidValue = !value
  const validValue = !insufficientFounds && !invalidValue && !redeemableExceeded

  // It's only working on rinkeby for now, it's necessary make it on mainnet too
  // provider(4) it's for rinkeby network.
  const bbtCNVContract = new Contract(
    '0x1e61c955e49e4Ba3020a316739A3472BA07F1964',
    RedeemBBT_CNV_Abi,
    provider(4),
  )
  return (
    <>
      <Modal
        title="Redeem bbtCNV"
        bluryOverlay
        preserveScrollBarGap
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        motionPreset="slideInBottom"
      >
        <Card width={'300px'} height="200px" m={-6}>
          {/* Input Container */}
          <Flex
            mt={4}
            width={'270px'}
            height="74px"
            shadow={'Down Medium'}
            rounded="2xl"
            mx={'auto'}
            direction="column"
            py={2}
            px={4}
            gap={2}
          >
            <Flex>
              <NumericInput
                value={value}
                onChange={(e) => setValue(parseFloat(e.target.value.replaceAll(',', '')))}
              />
              <Button
                _focus={{}}
                onClick={() => setValue(parseFloat(redeemableValue?.toString()))}
                variant={'primary.outline'}
                width="110px"
              >
                Max
              </Button>
            </Flex>
            <Flex
              width={'fit-content'}
              gap={1}
              textColor="text.low"
              cursor={'pointer'}
              fontSize={'13'}
              transition="all .2s"
              _hover={{ transform: 'scale(1.1)', textColor: 'white' }}
              userSelect="none"
              onClick={() => setValue(balance)}
            >
              <Text onClick={() => {}} fontWeight="bold">
                Balance: ${balance.toFixed(2)}
              </Text>
              <Text textColor={'text.accent'} fontWeight="bold">
                Max
              </Text>
            </Flex>
          </Flex>
          <Flex width={'270px'} px={4} mx={'auto'} mt={1} gap={1}>
            <Text textColor={'text.low'} fontSize={'15'} fontWeight="bold">
              Redeemable:
            </Text>
            <Text textColor={'text.accent'} fontSize={'15'} fontWeight="bold">
              ${!isLoading && ethers.utils.formatEther(redeemableValue)}
              {isLoading && 'Loading...'}
            </Text>
          </Flex>
          <Button
            onClick={() => {
              if (!validValue) return
              onOpenConfirm()
              bbtCNVContract
                .connect(signer)
                .redeem(value, account?.address, account.address, false, { gasLimit: 5000000 })
                .then((tx) => {
                  onCloseConfirm()
                  setTx(tx)
                  onOpenSub()
                })
                .catch((e) => {
                  setError('Transaction rejected')
                  onOpenError()
                  onCloseConfirm()
                })
            }}
            shadow={validValue ? 'up' : 'down'}
            fontSize={'20'}
            height={'55px'}
            width="270px"
            mx={'auto'}
            variant="primary.outline"
            my={4}
            textColor={!validValue && 'text.low'}
            _active={validValue && { transform: 'scale(0.9)' }}
            _hover={{}}
            _focus={{}}
          >
            {redeemableExceeded && 'Redeemable Exceeded'}
            {invalidValue && 'Invalid value'}
            {validValue && 'Redeem'}
            {insufficientFounds && 'Insufficient Founds'}
          </Button>
        </Card>
      </Modal>
      <TransactionSubmittedDialog isOpen={isSubOpen} tx={tx} closeParentComponent={onCloseSub} />
      <WaitingConfirmationDialog isOpen={isConfirmOpen} />
      <TransactionErrorDialog error={error} isOpen={isErrorOpen} />
    </>
  )
}
