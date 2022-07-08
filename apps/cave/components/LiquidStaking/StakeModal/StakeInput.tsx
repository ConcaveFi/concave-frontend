import { CNV, Currency, CurrencyAmount, STAKING_CONTRACT } from '@concave/core'
import { StakingV1Contract } from '@concave/marketplace'
import { Box, Card, Flex, Text, useDisclosure } from '@concave/ui'
import { TransactionResponse } from '@ethersproject/abstract-provider'
import { ApproveButton } from 'components/ApproveButton/ApproveButton'
import { CurrencyInputField } from 'components/CurrencyAmountField'
import { TransactionErrorDialog } from 'components/TransactionErrorDialog'
import { TransactionSubmittedDialog } from 'components/TransactionSubmittedDialog'
import { WaitingConfirmationDialog } from 'components/WaitingConfirmationDialog'
import { useTransactionRegistry } from 'hooks/TransactionsRegistry'
import { useCurrencyBalance } from 'hooks/useCurrencyBalance'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { concaveProvider } from 'lib/providers'
import { useState } from 'react'
import { toAmount } from 'utils/toAmount'
import { useAccount, useSigner } from 'wagmi'
import { PARAMETER_TO_POOL_PERIOD } from '../StakeCard'

function StakeInput(props: { poolId: number; period: string; onClose: () => void }) {
  const { address } = useAccount()
  const netWorkdId = useCurrentSupportedNetworkId()
  const { data: signer } = useSigner()
  const [stakeInput, setStakeInput] = useState<CurrencyAmount<Currency>>(
    toAmount(0, CNV[netWorkdId]),
  )
  const cnvBalance = useCurrencyBalance(stakeInput?.currency, { watch: true })
  const [tx, setTx] = useState(undefined)
  const [txError, setTxError] = useState('')
  const [waitingForConfirm, setWaitingForConfirm] = useState(false)

  const { registerTransaction } = useTransactionRegistry()

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

  const onError = (e: { code: number; message: string }) => {
    const errorMessage = e.code === 4001 ? 'Transaction Rejected' : e.message
    setTxError(errorMessage)
    setWaitingForConfirm(false)
    onOpenRejected()
  }

  const lock = () => {
    const contract = new StakingV1Contract(concaveProvider(netWorkdId))
    setWaitingForConfirm(true)
    contract
      .lock(signer, address, stakeInput.numerator.toString(), props.poolId)
      .then((x: TransactionResponse) => {
        registerTransaction(x, {
          type: 'stake',
          amount: stakeInput.toString(),
          pool: PARAMETER_TO_POOL_PERIOD[props.poolId],
        })
        setTx(x)
        setWaitingForConfirm(false)
        onOpenSubmitted()
      })
      .catch(onError)
  }

  return (
    <>
      <Box>
        <Card shadow="down" w="350px" px={0} py={0}>
          <Flex>
            <CurrencyInputField currencyAmountIn={stakeInput} onChangeAmount={setStakeInput} />
          </Flex>
        </Card>

        <Box mt={{ base: 4, sm: 10 }} width="350px">
          <ApproveButton
            approveArgs={{
              currency: stakeInput.currency,
              amount: stakeInput.numerator,
              spender: STAKING_CONTRACT[stakeInput.currency.chainId],
            }}
            mt={5}
            onClick={lock}
            fontWeight="bold"
            fontSize="md"
            variant="primary"
            bgGradient="linear(90deg, #72639B 0%, #44B9DE 100%)"
            w={{ base: '60%', sm: '80%', md: '100%' }}
            h="50px"
            size="large"
            mx="auto"
            disabled={
              // !cnvBalance.data ||
              // +cnvBalance.data?.numerator.toString() === 0 ||
              +stakeInput.numerator.toString() === 0
              // stakeInput.greaterThan(cnvBalance.data?.numerator)
            }
          >
            {/* {+stakeInput.numerator?.toString() > +cnvBalance.data?.numerator.toString() ||
            +cnvBalance.data?.numerator.toString() === 0
              ? 'Insufficient CNV'
              : 'Stake CNV'} */}
              Stake CNV
          </ApproveButton>

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
          height="107px"
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
          <Text textColor={'text.low'}>For {props.period}</Text>
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
