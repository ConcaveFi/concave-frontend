import { Modal, ModalContent, ModalOverlay, ModalBody, Avatar, keyframes } from '@chakra-ui/react'
import { CheckIcon, CloseIcon, SpinIcon, SpinnerIcon } from '@concave/icons'
import { Button, Card, Flex, Text, useDisclosure, Image } from '@concave/ui'
import { useAccount, useConnect, useNetwork, useWaitForTransaction } from 'wagmi'
import { ConnectWalletModal, ellipseAddress } from './ConnectWallet'
import ChangeNetWorkdModal from './ChangeNetworkModal'
import { RecentTransaction, useRecentTransactions } from 'hooks/useRecentTransactions'
import { commify } from 'ethers/lib/utils'

interface YourWalletModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function YourWalletModal(props: YourWalletModalProps) {
  const [{ data: account }, disconnect] = useAccount()
  const { isOpen, onClose, onOpen } = useDisclosure()
  const {
    isOpen: isChangeNetworkOpen,
    onClose: onCloseChangeNetwork,
    onOpen: onOpenChangeNetwork,
  } = useDisclosure()
  const [{ data: networkData }, switchNetwork] = useNetwork()
  const [{ data: connectorData, loading: loadingWallet }] = useConnect()

  const { data: recentTransactions, clearRecentTransactions } = useRecentTransactions()

  return (
    <Modal
      motionPreset="slideInBottom"
      preserveScrollBarGap
      isOpen={props.isOpen}
      onClose={props.onClose}
      isCentered
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
      <ModalContent>
        <ModalBody>
          <Card
            variant="primary"
            direction={'column'}
            width={'400px'}
            minHeight="500px"
            textShadow={'0px 0px 27px rgba(129, 179, 255, 0.31)'}
          >
            <Flex
              rounded={'2xl'}
              width={'380px'}
              height="320px"
              mx={'auto'}
              mt={2}
              direction="column"
              shadow={'up'}
            >
              {/* Your Wallet Container */}
              <Flex height="52%" justify="space-between">
                <Flex ml={8} direction={'column'} align={'start'} justify="center">
                  <Text fontWeight={'bold'} textColor={'text.low'} fontSize="20px">
                    Your Wallet
                  </Text>
                  <Text fontWeight={'bold'} fontSize={'3xl'}>
                    {ellipseAddress(account?.address)}
                  </Text>
                </Flex>
                <Flex align={'start'} height={'full'} mt={3} mr={3}>
                  <CloseIcon color={'text.low'} cursor="pointer" onClick={props.onClose} />
                </Flex>
              </Flex>
              {/* ------------------------- */}
              {/* Connected areas Container */}
              <Flex direction={'column'} gap={4} mx="auto">
                <Flex
                  width={'340px'}
                  rounded="3xl"
                  height={'60px'}
                  shadow="down"
                  align={'center'}
                  justify="space-between"
                >
                  <Text ml={4} fontSize="13px" fontWeight="700" textColor={'text.low'}>
                    Connected with {connectorData?.connector?.name}
                  </Text>
                  <Button
                    mr={2}
                    rounded={'3xl'}
                    onClick={onOpen}
                    _focus={{}}
                    width={'102px'}
                    height="40px"
                    boxShadow="Up Big"
                  >
                    <Text my={'auto'} mx="auto" fontWeight={'bold'} fontSize="lg">
                      Change
                    </Text>
                  </Button>
                </Flex>
                <Flex
                  width={'340px'}
                  justify="space-between"
                  rounded="3xl"
                  height={'60px'}
                  shadow="down"
                  align={'center'}
                >
                  <Text fontSize="13px" ml={4} fontWeight="700" textColor={'text.low'}>
                    Change Network
                  </Text>
                  <Button
                    onClick={onOpenChangeNetwork}
                    rounded={'3xl'}
                    _focus={{}}
                    height="40px"
                    boxShadow="Up Big"
                    mr={2}
                  >
                    <Flex justify={'end'} flex={1} gap={2}>
                      <Avatar
                        shadow={'0px 0px 20px 0px #111'}
                        ml={3}
                        width="25px"
                        height={'25px'}
                        mt={'2px'}
                        src={
                          networkData?.chain.id == 1
                            ? 'https://images-ext-2.discordapp.net/external/6xv9IUyAOWmlbQE8LfBQNr5pBjHIADMgOmbHWKMbutg/https/raw.githubusercontent.com/ConcaveFi/assets/master/blockchains/ethereum/info/logo.png'
                            : 'https://raw.githubusercontent.com/ConcaveFi/assets/master/blockchains/arbitrum/info/logo.png'
                        }
                      />
                      <Text my={'auto'} mr={4} fontWeight={'bold'} fontSize="lg">
                        {networkData?.chain?.name}
                      </Text>
                    </Flex>
                  </Button>
                  <ChangeNetWorkdModal
                    isOpen={isChangeNetworkOpen}
                    onClose={onCloseChangeNetwork}
                  />
                </Flex>
              </Flex>
              {/* ------------------------- */}
            </Flex>
            <ConnectWalletModal isOpen={isOpen} onClose={onClose} />
            {/* Transactions Container */}
            <Flex flex={1} direction={'column'} mx={8} my={6}>
              <Flex justify={'space-between'}>
                <Text fontWeight={'700'} fontSize="md" textColor={'text.low'}>
                  Recent Transactions:
                </Text>
                <Text
                  cursor={'pointer'}
                  onClick={clearRecentTransactions}
                  fontWeight={'700'}
                  fontSize="md"
                  textColor={'text.low'}
                >
                  Clear all
                </Text>
              </Flex>
              <Flex direction={'column'} mt={3} gap={1}>
                {recentTransactions.map((value, index) => (
                  <TransactionInfo key={index} recentTransaction={value} />
                ))}
              </Flex>
            </Flex>
            <Button
              _focus={{}}
              mx={'auto'}
              width={'180px'}
              height="40px"
              rounded="16px 16px 0px 0px"
              variant={'primary'}
              onClick={disconnect}
            >
              <Text fontSize={'xl'} fontWeight="bold">
                Disconnect
              </Text>
            </Button>
          </Card>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
const TransactionInfo = ({ recentTransaction }: { recentTransaction: RecentTransaction }) => {
  const { type, amount, transaction, purchase, stakePool } = recentTransaction
  const [{ data: txData, loading, error }] = useWaitForTransaction({ hash: transaction.hash })

  console.log(loading)

  const info =
    type === 'Stake'
      ? `${commify(amount.toFixed(2))} CNV in ${stakePool} Position`
      : type === 'Bond'
      ? `${commify(amount.toFixed(2))} DAI bonded for ${commify(purchase.toFixed(2))} CNV`
      : `${commify(amount.toFixed(2))} Swaped`

  return (
    <Flex justify={'space-between'}>
      <Flex fontWeight={'bold'} gap={1} align="center">
        <Text>{recentTransaction.type}</Text>
        <Text fontSize={'14px'} textColor={'text.low'}>
          {info + ' ->'}
        </Text>
      </Flex>
      {/* Status 0 = Fail  */}
      {/* Status 1 = Success  */}
      {txData?.status == 0 && (
        <CloseIcon width={'12px'} height="12px" color={'red.300'} justifySelf="end" />
      )}
      {loading && (
        <SpinnerIcon
          animation={`${spin} 3s linear infinite`}
          color={'text.low'}
          justifySelf="end"
        />
      )}
      {txData?.status == 1 && <CheckIcon color={'green.300'} justifySelf="end" />}
    </Flex>
  )
}

const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
})
