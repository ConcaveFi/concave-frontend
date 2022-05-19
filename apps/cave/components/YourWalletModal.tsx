import { CheckIcon } from '@concave/icons'
import { Button, Checkbox, Flex, Modal, Text, useDisclosure, VStack } from '@concave/ui'
import { getWalletType } from 'lib/injected.wallets'
import { useState } from 'react'
import { useAccount } from 'wagmi'
import { ellipseAddress } from './ConnectWallet'

interface YourWalletModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function YourWalletModal(props: YourWalletModalProps) {
  const [{ data: account }, disconnect] = useAccount()

  return (
    <Modal title={'Your Wallet'} isOpen={props.isOpen} onClose={props.onClose}>
      <Flex
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
          <Flex ml={8} direction={'column'} height="52%" align={'start'} justify="center">
            <Text fontWeight={'bold'} textColor={'text.low'} fontSize="20px">
              Your Wallet
            </Text>

            <Text fontWeight={'bold'} fontSize={'3xl'}>
              {ellipseAddress(account?.address)}
            </Text>
          </Flex>
          {/* ------------------------- */}

          {/* Connected areas Container */}
          <Flex direction={'column'} gap={4} mx="auto">
            <Flex width={'340px'} rounded="3xl" height={'60px'} shadow="down" align={'center'}>
              <Text ml={4} fontWeight="700" textColor={'text.low'}>
                Connected with {getWalletType()}{' '}
              </Text>
              <Flex></Flex>
            </Flex>
            <Flex width={'340px'} rounded="3xl" height={'60px'} shadow="down" align={'center'}>
              <Text ml={4} fontWeight="700" textColor={'text.low'}>
                Change Network
              </Text>
            </Flex>
          </Flex>
          {/* ------------------------- */}
        </Flex>
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
          rounded="full"
          variant={'primary'}
        >
          <Text fontSize={'xl'} fontWeight="bold">
            Disconnect
          </Text>
        </Button>
      </Flex>
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
