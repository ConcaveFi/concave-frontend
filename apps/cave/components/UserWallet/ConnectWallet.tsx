import { Button, gradientBorder, Flex, useDisclosure, Text } from '@concave/ui'
import { useAccount, useEnsName } from 'wagmi'
import { useModals } from 'contexts/ModalsContext'
import YourWalletModal from './YourWallet'
import { SpinnerIcon } from '@concave/icons'
import { spinAnimation } from '../Treasury/Mobile/TreasuryManagementMobile'
import { useTransactionRegistry } from 'hooks/TransactionsRegistry'
import { formatAddress } from 'utils/formatAddress'

export const ConnectButton = () => {
  const { connectModal } = useModals()

  return (
    <Button
      sx={{ ...gradientBorder({ borderWidth: 2, borderRadius: '2xl' }) }}
      fontFamily="heading"
      variant="primary"
      size="medium"
      w="100%"
      onClick={connectModal.onOpen}
    >
      Connect wallet
    </Button>
  )
}

export const UserWallet = () => {
  const { address } = useAccount()
  const { data: ens } = useEnsName({ address })
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { hasPendingTransactions } = useTransactionRegistry()

  return (
    <>
      <Button
        onClick={onOpen}
        size="medium"
        shadow="up"
        fontFamily="heading"
        color="text.low"
        _focus={{ color: 'text.high', shadow: 'up' }}
        w="100%"
        rounded="2xl"
        fontWeight="bold"
        justifyContent="center"
      >
        <Text noOfLines={1} wordBreak="break-all" whiteSpace="normal" maxW="60%">
          {ens || formatAddress(address)}
        </Text>
        {hasPendingTransactions && (
          <Flex position="absolute" right={4}>
            <SpinnerIcon color="text.low" animation={spinAnimation(4)} boxSize="18px" />
          </Flex>
        )}
      </Button>

      <YourWalletModal onClose={onClose} isOpen={isOpen} />
    </>
  )
}
