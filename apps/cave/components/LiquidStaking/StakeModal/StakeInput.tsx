import { CNV, Currency, CurrencyAmount } from '@concave/gemswap-sdk'
import { Box, Button, Card, Flex, Text, useDisclosure } from '@concave/ui'
import { CurrencyInputField } from 'components/CurrencyAmountField'
import { TransactionErrorDialog } from 'components/TransactionErrorDialog'
import { TransactionSubmittedDialog } from 'components/TransactionSubmittedDialog'
import { WaitingConfirmationDialog } from 'components/WaitingConfirmationDialog'
import { ApproveButton, useApproval } from 'hooks/useAllowance'
import { useCurrencyBalance } from 'hooks/useCurrencyBalance'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { StakingV1ProxyAddress } from 'lib/StakingV1Proxy/Address'
import { StakingV1Contract } from 'lib/StakingV1Proxy/StakingV1Contract'
import React, { useState } from 'react'
import { toAmount } from 'utils/toAmount'
import { useAccount, useSigner } from 'wagmi'

function StakeInput(props: { poolId: number; period: string; onClose: () => void }) {
  const { data: account } = useAccount()
  const netWorkdId = useCurrentSupportedNetworkId()
  const { data: signer } = useSigner()
  const [stakeInput, setStakeInput] = useState<CurrencyAmount<Currency>>(
    toAmount(0, CNV[netWorkdId]),
  )
  const approveStatus = useApproval(
    stakeInput.wrapped,
    StakingV1ProxyAddress[stakeInput.currency.chainId],
  )
  const [approvedCNV] = approveStatus
  const cnvBalance = useCurrencyBalance(stakeInput?.currency, { watch: true })

  const [tx, setTx] = useState(undefined)
  const [txError, setTxError] = useState('')

  const [waitingForConfirm, setWaitingForConfirm] = useState(false)

  const {
    isOpen: isOpenSubmitted,
    onClose: onCloseSubmitted,
    onOpen: onOpenSubmitted,
  } = useDisclosure()
  const {
    isOpen: isOpenRejected,
    onClose: onCloseRejected,
    onOpen: onOpenRejected,
  } = useDisclosure()

  return (
    <>
      <Box>
        <Card shadow="down" w="350px" px={0} py={0}>
          <Flex justify="space-between" alignItems="center">
            <CurrencyInputField currencyAmountIn={stakeInput} onChangeAmount={setStakeInput} />
          </Flex>
        </Card>

        <Box mt={10} width="350px">
          {approvedCNV && (
            <ApproveButton
              fontWeight="bold"
              fontSize="md"
              variant="primary"
              bgGradient="linear(90deg, #72639B 0%, #44B9DE 100%)"
              w="100%"
              h="50px"
              size="large"
              mx="auto"
              useApproveInfo={approveStatus}
            />
          )}
          {!approvedCNV && (
            <Button
              mt={5}
              onClick={async () => {
                const contract = new StakingV1Contract(netWorkdId)
                setWaitingForConfirm(true)
                contract
                  .lock(signer, account?.address, stakeInput.numerator.toString(), props.poolId)
                  .then((x) => {
                    setTx(x)
                    setWaitingForConfirm(false)
                    onOpenSubmitted()
                    console.log(x)
                  })
                  .catch((e) => {
                    if (e.code === 4001) {
                      // Code 4001 it's for reject transaction.
                      setWaitingForConfirm(false)
                      setTxError('Transaction Rejected')
                      onOpenRejected()
                    } else {
                      setTxError(e.message)
                      onOpenRejected()
                    }
                    console.log(e)
                  })
              }}
              fontWeight="bold"
              fontSize="md"
              variant="primary"
              bgGradient="linear(90deg, #72639B 0%, #44B9DE 100%)"
              w="100%"
              h="50px"
              size="large"
              mx="auto"
              disabled={
                !cnvBalance.data ||
                +cnvBalance.data?.numerator.toString() === 0 ||
                +stakeInput.numerator.toString() === 0 ||
                stakeInput.greaterThan(cnvBalance.data?.numerator)
              }
            >
              {+stakeInput.numerator?.toString() > +cnvBalance.data?.numerator.toString() ||
              +cnvBalance.data?.numerator.toString() === 0
                ? 'Insufficient CNV'
                : 'Stake CNV'}
            </Button>
          )}

          {/* <Button
          mt={5}
          onClick={() => router.push('/dashboard')}
          fontWeight="bold"
          fontSize="md"
          variant="primary.outline"
          bgGradient="linear(90deg, #72639B 0%, #44B9DE 100%)"
          w="100%"
          h="40px"
          size="large"
          mx="auto"
          >
          Check position
        </Button> */}
        </Box>
      </Box>

      <WaitingConfirmationDialog isOpen={waitingForConfirm} title={'Confirm Stake'}>
        <Flex
          width={'200px'}
          height="80px"
          rounded={'2xl'}
          mt={4}
          shadow={'Down Medium'}
          align={'center'}
          direction={'column'}
        >
          <Text textColor={'text.low'} fontWeight="700" fontSize={18} mt={4}>
            Staking:
          </Text>
          <Text fontWeight={'700'} textColor="text.accent">
            {stakeInput.wrapped.toExact() + ' CNV'}
          </Text>
        </Flex>
      </WaitingConfirmationDialog>

      <TransactionSubmittedDialog
        isOpen={isOpenSubmitted}
        tx={tx}
        closeParentComponent={props.onClose}
      />
      <TransactionErrorDialog
        error={txError}
        isOpen={isOpenRejected}
        closeParentComponent={props.onClose}
      />
    </>
  )
}

export default StakeInput
