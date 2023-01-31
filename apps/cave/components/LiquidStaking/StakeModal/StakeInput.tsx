import { CNV, Currency, CurrencyAmount } from '@concave/core'
import { stakingPools, StakingV1Contract } from '@concave/marketplace'
import { Box, Button, Card, Flex, Text } from '@concave/ui'
import { useCurrencyApprove } from 'components/CurrencyAmountButton/CurrencyAmountButton'
import { CurrencyInputField } from 'components/CurrencyAmountField'
import { TransactionSubmittedDialog } from 'components/TransactionDialog/TransactionSubmittedDialog'
import { WaitingConfirmationDialog } from 'components/TransactionDialog/TransactionWaitingConfirmationDialog'
import { useErrorModal } from 'contexts/ErrorModal'
import { useTransaction } from 'hooks/TransactionsRegistry/useTransaction'
import { useCurrencyBalance } from 'hooks/useCurrencyBalance'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { concaveProvider } from 'lib/providers'
import { useState } from 'react'
import { toAmount } from 'utils/toAmount'
import { useAccount, useSigner } from 'wagmi'

export function StakeInput({ onClose, poolId }: { poolId: number; onClose: () => void }) {
  const { address } = useAccount()
  const errorModal = useErrorModal()
  const chainId = useCurrentSupportedNetworkId()
  const { data: signer } = useSigner()
  const [stakeInput, setStakeInput] = useState<CurrencyAmount<Currency>>(toAmount(0, CNV[chainId]))
  const contract = new StakingV1Contract(concaveProvider(chainId))
  const currencyState = useCurrencyApprove(stakeInput.wrapped, contract.address, {
    enablePermit: true,
  })
  const cnvBalance = useCurrencyBalance(stakeInput?.currency, { watch: true })
  const lockTransaction = useTransaction(
    async () => {
      const amount = stakeInput.numerator.toString()
      return contract.lock(signer, address, amount, poolId, currencyState.permit.signedPermit)
    },
    {
      onError: errorModal.onOpen,
      meta: {
        type: 'stake',
        amount: stakeInput.toString(),
        pool: stakingPools[poolId].days,
      },
    },
  )
  const stakeButton = {
    disabled: stakeInput?.greaterThan(cnvBalance.data?.numerator) || stakeInput.equalTo(0),
    children: 'Stake CNV',
  }

  return (
    <>
      <Box>
        <Card shadow="down" mx={'auto'} w={{ base: '300px', md: '350px' }} px={0} py={0}>
          <CurrencyInputField currencyAmountIn={stakeInput} onChangeAmount={setStakeInput} />
        </Card>

        <Box mt={{ base: 4, sm: 10 }} width="350px">
          <Button
            mt={5}
            onClick={lockTransaction.sendTx}
            fontWeight="bold"
            fontSize="md"
            variant="primary"
            bgGradient="linear(90deg, #72639B 0%, #44B9DE 100%)"
            w={{ base: '300px', md: '100%' }}
            h="50px"
            size="large"
            mx="auto"
            {...(currencyState.approved ? stakeButton : currencyState.buttonProps)}
          />
        </Box>
      </Box>

      <WaitingConfirmationDialog
        isOpen={lockTransaction.isWaitingForConfirmation}
        title={'Confirm stake'}
      >
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
          <Text textColor={'text.low'}>For {stakingPools[poolId].days + ' days'}</Text>
        </Flex>
      </WaitingConfirmationDialog>

      <TransactionSubmittedDialog
        isOpen={lockTransaction.isWaitingTransactionReceipt}
        txHash={lockTransaction.tx?.hash}
        closeParentComponent={onClose}
      />
    </>
  )
}
