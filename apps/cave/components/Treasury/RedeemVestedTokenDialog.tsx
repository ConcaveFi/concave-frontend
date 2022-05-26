import { CloseIcon } from '@concave/icons'
import {
  Button,
  Flex,
  HStack,
  Input,
  Modal,
  NumericInput,
  Text,
  useDisclosure,
  VStack,
} from '@concave/ui'
import { Balance } from 'components/CurrencyAmountField/Balance'
import Placeholder from 'components/Placeholder'
import { TransactionSubmittedDialog } from 'components/TransactionSubmittedDialog'
import { WaitingConfirmationDialog } from 'components/WaitingConfirmationDialog'
import { CNV } from 'constants/tokens'
import { RedeemBBT_CNV_Abi } from 'contracts/VestedTokens/RedeemBbtCNVAbi'
import { Contract } from 'ethers'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { concaveProvider as provider } from 'lib/providers'
import { useState } from 'react'
import { useAccount, useSigner } from 'wagmi'

interface RedeemVestedTokenDialog {
  isOpen: boolean
}

// 0x98501987a763ccE92539CB4650969ddA16b33454
export default function RedeemVestedTokenDialog(props: RedeemVestedTokenDialog) {
  const networkId = useCurrentSupportedNetworkId()
  const [{ data: signer }] = useSigner()

  const [isOpen, setIsOpen] = useState(props.isOpen)
  const contract = new Contract(
    '0x1697118735044519aF9454700Bc005eEAB9D102b',
    RedeemBBT_CNV_Abi,
    provider(networkId),
  )

  const [value, setValue] = useState('')

  const [{ data: account }] = useAccount()

  const { isOpen: isConfirmOpen, onOpen: onOpenConfirm, onClose: onCloseConfirm } = useDisclosure()
  const {
    isOpen: isSubmittedOpen,
    onOpen: onOpenSubmitted,
    onClose: onCloseSubmitted,
  } = useDisclosure()

  const [tx, setTx] = useState(undefined)
  return (
    <Modal onClose={() => setIsOpen(false)} title={''} isOpen={isOpen} hideClose>
      <Flex height={'350px'} width="350px" direction={'column'}>
        <Flex position={'absolute'} width="85%" justify={'end'}>
          <CloseIcon color="text.low" cursor={'pointer'} onClick={() => setIsOpen(false)} />
        </Flex>
        <Text fontSize={'2xl'} fontWeight="bold" mb={4} mx={'auto'}>
          Redeem aCNV
        </Text>

        <Flex
          direction={'column'}
          align={'start'}
          width={'70%'}
          mx="auto"
          boxShadow={'down'}
          py="2"
          rounded={'2xl'}
          px="8"
        >
          <NumericInput
            px={'0'}
            width={'70%'}
            value={value}
            fontSize="xl"
            onChange={(e) => setValue(e.target.value)}
            placeholder="0.0"
          />
          <Flex>
            <Text fontWeight="bold" fontSize="sm" textColor={'text.low'}>
              Balance:
            </Text>
            <Text fontWeight={'bold'} pl={1}>
              0
            </Text>
          </Flex>
        </Flex>
        <Button
          variant={'primary'}
          width="60%"
          mx={'auto'}
          py={1}
          fontSize="20px"
          onClick={() => {
            onOpenConfirm()
            contract
              .connect(signer)
              .redeem(1, account?.address, account?.address, true, { gasLimit: 5000000 })
              .then((tx) => {
                setTx(tx)
                onOpenSubmitted()
              })
          }}
        >
          Redeem
        </Button>
        <TransactionSubmittedDialog isOpen={isSubmittedOpen} tx={tx} />
        <WaitingConfirmationDialog isOpen={isConfirmOpen} />
      </Flex>
    </Modal>
  )
}
