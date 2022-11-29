import { Button, VStack } from '@concave/ui'
import { purchaseBond } from 'components/Bond/BondState'
import { withPageTransition } from 'components/PageTransition'
import { useErrorModal } from 'contexts/ErrorModal'
import { useTransaction } from 'hooks/TransactionsRegistry/useTransaction'
import { useAccount, useSigner } from 'wagmi'

const Faucet = () => {
  const account = useAccount()
  const { data: signer } = useSigner()
  const defaultSettings = {
    slippageTolerance: 1,
    deadline: 30,
  }
  const errorModal = useErrorModal()

  const bondTransaction = useTransaction(
    () => {
      return purchaseBond(
        1,
        '99999999999999999999999',
        account.address,
        signer,
        defaultSettings,
        '12312132',
      )
    },
    {
      onError: errorModal.onOpen,
    },
  )

  return (
    <VStack pt={20}>
      <Button variant={'primary'} p={4} onClick={bondTransaction.sendTx}>
        CreateError
      </Button>
    </VStack>
  )
}

export default withPageTransition(Faucet)
