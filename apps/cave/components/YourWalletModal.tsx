import { CheckIcon, CloseIcon } from '@concave/icons'
import { Button, Card, Checkbox, Flex, Text, useDisclosure, VStack } from '@concave/ui'
import { Modal, ModalContent, ModalOverlay, ModalBody } from '@chakra-ui/react'
import { getWalletType } from 'lib/injected.wallets'
import { useState } from 'react'
import { useAccount, useConnect, useDisconnect, useNetwork } from 'wagmi'
import { ConnectWalletModal, ellipseAddress } from './ConnectWallet'

interface YourWalletModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function YourWalletModal(props: YourWalletModalProps) {
  const { data: account } = useAccount()
  const { disconnect } = useDisconnect()

  const { isOpen, onClose, onOpen } = useDisclosure()
  const { activeChain, switchNetwork } = useNetwork()
  const { data: connectorData, isConnecting: loadingWallet } = useConnect()

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
                    rounded={'3xl'}
                    _focus={{}}
                    width={'142px'}
                    height="40px"
                    boxShadow="Up Big"
                    mr={2}
                  >
                    <Text my={'auto'} mx="auto" fontWeight={'bold'} fontSize="lg">
                      {activeChain?.name}
                    </Text>
                  </Button>
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
                <Text fontWeight={'700'} fontSize="md" textColor={'text.low'}>
                  Clear all
                </Text>
              </Flex>
              <Flex direction={'column'} mt={3} gap={1}>
                <TransactionInfo type={'Swap'} info="2000 DAI for 36.58 CNV" />
                <TransactionInfo type={'Stake'} info="2000 in 360 days Position" />
                <TransactionInfo type={'Swap'} info="2000 DAI for 36.58 CNV" />
                <TransactionInfo type={'Stake'} info="100 in 45 days Position" />
              </Flex>
            </Flex>
            <Button
              _focus={{}}
              mx={'auto'}
              width={'180px'}
              height="40px"
              rounded="16px 16px 0px 0px"
              variant={'primary'}
              onClick={() => disconnect()}
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

const TransactionInfo = ({ type, info }) => {
  return (
    <Flex justify={'space-between'}>
      <Flex fontWeight={'bold'} gap={1}>
        <Text>{type}</Text>
        <Text textColor={'text.low'}>{info + ' ->'}</Text>
      </Flex>
      <CheckIcon color={'text.low'} justifySelf="end" />
    </Flex>
  )
}
