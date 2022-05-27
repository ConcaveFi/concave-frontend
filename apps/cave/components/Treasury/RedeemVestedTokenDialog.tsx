import { CloseIcon } from '@concave/icons'
import { Button, Flex, Modal, NumericInput, Text, useDisclosure } from '@concave/ui'
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
  onClose: () => void
  tokenSymbol: string
  contractAddress: string
  balance: string
}

// 0x98501987a763ccE92539CB4650969ddA16b33454

export default function RedeemVestedTokenDialog(props: RedeemVestedTokenDialog) {
  const networkId = useCurrentSupportedNetworkId()
  const [{ data: signer }] = useSigner()
  const contract = new Contract(props.contractAddress, RedeemBBT_CNV_Abi, provider(networkId))
  const [value, setValue] = useState('')
  const [{ data: account }] = useAccount()
  const { isOpen: isConfirmOpen, onOpen: onOpenConfirm, onClose: onCloseConfirm } = useDisclosure()

  const {
    isOpen: isSubmittedOpen,
    onOpen: onOpenSubmitted,
    onClose: onCloseSubmitted,
  } = useDisclosure()

  const tokenBalane = parseFloat(props.balance)
  const formatedValue = parseFloat(value)
  const insufficientFounds = tokenBalane < formatedValue
  const validValue = formatedValue > 0

  const buttonActive = validValue && !insufficientFounds

  const [tx, setTx] = useState(undefined)
  return (
    <Modal onClose={props.onClose} title={''} isOpen={props.isOpen} hideClose>
      <Flex height={'250px'} width="350px" direction={'column'}>
        <Flex position={'absolute'} width="85%" justify={'end'} alignSelf="start">
          <CloseIcon color="text.low" cursor={'pointer'} onClick={props.onClose} />
        </Flex>
        <Text fontSize={'2xl'} fontWeight="bold" my={4} mx={'auto'}>
          {`Redeem ${props.tokenSymbol}`}
        </Text>

        <Flex
          gap={2}
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
          <Flex fontSize="sm">
            <Text
              cursor={'pointer'}
              onClick={() => setValue(props.balance)}
              fontWeight="bold"
              textColor={'text.low'}
            >
              Balance:
            </Text>
            <Text fontWeight={'bold'} pl={1}>
              {props.balance}
            </Text>
          </Flex>
        </Flex>
        <Button
          transition={'all .3s'}
          _focus={{}}
          _active={buttonActive && { transform: 'scale(o.9)' }}
          variant="secondary"
          cursor={!buttonActive && 'default'}
          mt={8}
          shadow="Up Small"
          _hover={buttonActive && { shadow: 'up' }}
          width="70%"
          mx={'auto'}
          py={2}
          rounded="2xl"
          fontSize="2xl"
          textColor={!buttonActive && 'text.low'}
          onClick={() => {
            if (!buttonActive) return
            onOpenConfirm()
            contract
              .connect(signer)
              .redeem(value, account?.address, account?.address, true, { gasLimit: 5000000 })
              .then((tx) => {
                setTx(tx)
                onCloseConfirm()
                onOpenSubmitted()
              })
          }}
        >
          {!validValue && 'Invalid value.'}
          {insufficientFounds && 'Insufficient Founds'}
          {buttonActive && !insufficientFounds && 'Redeem'}
        </Button>
        <TransactionSubmittedDialog
          closeParentComponent={onCloseSubmitted}
          isOpen={isSubmittedOpen}
          tx={tx}
        />
        <WaitingConfirmationDialog isOpen={isConfirmOpen} />
      </Flex>
    </Modal>
  )
}
