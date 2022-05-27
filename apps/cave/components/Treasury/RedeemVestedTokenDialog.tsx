import { CloseIcon } from '@concave/icons'
import { Button, Flex, HStack, Modal, NumericInput, Text, useDisclosure } from '@concave/ui'
import { TransactionSubmittedDialog } from 'components/TransactionSubmittedDialog'
import { WaitingConfirmationDialog } from 'components/WaitingConfirmationDialog'
import { RedeemBBT_CNV_Abi } from 'contracts/VestedTokens/RedeemBbtCNVAbi'
import { Contract } from 'ethers'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { concaveProvider as provider } from 'lib/providers'
import { useState } from 'react'
import { useAccount, useSigner } from 'wagmi'

interface RedeemVestedTokenDialog {
  isOpen: boolean
  onClick: () => void
  onClose: () => void
  tokenSymbol: string
  balance: string
  connect?: any
}

// 0x98501987a763ccE92539CB4650969ddA16b33454

export default function RedeemVestedTokenDialog(props: RedeemVestedTokenDialog) {
  const { isOpen: isConfirmOpen, onOpen: onOpenConfirm, onClose: onCloseConfirm } = useDisclosure()
  const [tx, setTx] = useState(undefined)

  const signer = useSigner()

  return (
    <>
      <Modal
        isCentered
        preserveScrollBarGap
        motionPreset="slideInBottom"
        onClose={props.onClose}
        title={''}
        isOpen={props.isOpen && parseFloat(props.balance) > 0}
        hideClose
      >
        <Flex height={'200px'} width="260px" direction={'column'}>
          <Flex position={'absolute'} width="85%" justify={'end'} alignSelf="start">
            <CloseIcon color="text.low" cursor={'pointer'} onClick={props.onClose} />
          </Flex>
          <Text mx={'auto'} fontWeight={'bold'} fontSize="2xl">
            Redeem {props.tokenSymbol}
          </Text>
          <Flex
            mx={'auto'}
            mt={'4'}
            width={'80%'}
            px="8"
            rounded={'2xl'}
            height="120px"
            shadow={'Down Medium'}
            direction="column"
          >
            <HStack my={4} mx="auto" justify="space-between">
              <Text fontWeight={'bold'} fontSize="lg" textColor={'text.low'}>
                Your balance:
              </Text>
              <Text>{+props.balance}</Text>
            </HStack>
            <Button
              onClick={props.onClick}
              _focus={{}}
              shadow="Up Small"
              fontSize={'2xl'}
              py="2"
              _hover={{ shadow: 'up' }}
            >
              Redeem
            </Button>
          </Flex>
        </Flex>
      </Modal>
      <Modal
        preserveScrollBarGap
        onClose={props.onClose}
        title={'Error'}
        isOpen={props.isOpen && parseFloat(props.balance) === 0}
        hideClose
        isCentered
        motionPreset="slideInBottom"
      >
        <Flex>
          <Flex height={'120px'} width="240px" direction={'column'}>
            <Flex position={'absolute'} width="85%" justify={'end'} alignSelf="start">
              <Text
                fontSize={'2xl'}
                fontWeight="bold"
                textAlign={'center'}
                textColor="text.low"
                mt={'5'}
              >
                You do not have enough balance.
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Modal>
    </>
  )
}
