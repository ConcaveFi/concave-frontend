import { SpinnerIcon } from '@concave/icons'
import { Button, Flex, gradientBorder, Image, keyframes, Text, useDisclosure } from '@concave/ui'
import { useModals } from 'contexts/ModalsContext'
import { useTransactionRegistry } from 'hooks/TransactionsRegistry'
import { formatAddress } from 'utils/formatAddress'
import { useAccount, useEnsName, useNetwork } from 'wagmi'
import YourWalletModal from './YourWallet'

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

const spinAnimation = (time = 3) =>
  `${keyframes({
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  })} ${time}s linear infinite`

export const UserWallet = () => {
  const { address } = useAccount()
  const { chain } = useNetwork()
  const { data: ens } = useEnsName({ address })
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { hasPendingTransactions } = useTransactionRegistry()

  return (
    <>
      <Button
        onClick={onOpen}
        height="40px"
        shadow="up"
        fontFamily="heading"
        _focus={{ color: 'text.high', shadow: 'up' }}
        w="100%"
        rounded="2xl"
      >
        <Image
          filter={chain.testnet ? 'grayscale(1)' : ''}
          src="/assets/tokens/eth.svg"
          alt="ethereum icon"
          w="22px"
          h="22px"
          mr={2}
        />
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
