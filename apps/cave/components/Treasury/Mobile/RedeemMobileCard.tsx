import { Flex, Text, useDisclosure } from '@concave/ui'
import { TransactionErrorDialog } from 'components/TransactionErrorDialog'
import { TransactionSubmittedDialog } from 'components/TransactionSubmittedDialog'
import { WaitingConfirmationDialog } from 'components/WaitingConfirmationDialog'
import { CNV } from 'constants/tokens'
import useAddTokenToWallet, { injectedTokenResponse } from 'hooks/useAddTokenToWallet'
import { useState } from 'react'
import { useConnect } from 'wagmi'
import { GlassPanel } from '../TreasuryManagementCard'
import { ComingSoonDialog } from 'components/ComingSoonDialog'
import ACVNRedemptionDialog from '../VestedTokensDialogs/ACVNRedemptionDialog'

export default function RedeemMobileCard() {
  const { loading: loadingtoWallet, addingToWallet }: injectedTokenResponse = useAddTokenToWallet({
    tokenAddress: CNV.address,
    tokenChainId: CNV.chainId,
  })

  const { isOpen: isConfirmOpen, onOpen: onOpenConfirm, onClose: onCloseConfirm } = useDisclosure()
  const { isOpen: isSubOpen, onOpen: onOpenSub, onClose: onCloseSub } = useDisclosure()
  const { isOpen: isErrorOpen, onOpen: onOpenError, onClose: onCloseError } = useDisclosure()
  const [tx, setTx] = useState()
  const [error, setError] = useState('')

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [description, setDescription] = useState("This feature it's not done yet.")
  const [title, setTitle] = useState('Coming soon')

  const [{ data }] = useConnect()

  const {
    isOpen: onRedeemACNV,
    onOpen: onOpenRedeemACNV,
    onClose: onCloseRedeemACNV,
  } = useDisclosure()

  return (
    <GlassPanel
      textShadow="0px 0px 27px rgba(129, 179, 255, 0.31)"
      width={'340px'}
      height="350px"
      direction={'column'}
      align={'center'}
    >
      <Text fontSize={'2xl'} mx="auto" my={'5'} fontWeight="bold">
        Redeem CNV
      </Text>
      <Text textColor={'text.low'} fontWeight="bold">
        Redeem your tokens for CNV below
      </Text>
      <Flex direction="column" gap={3} my={6}>
        <RedeemButton onClick={onOpenRedeemACNV} title="aCNV" />
        <ACVNRedemptionDialog
          isOpen={onRedeemACNV}
          onClose={onCloseRedeemACNV}
          onRedeem={onOpenConfirm}
        />

        <RedeemButton
          onClick={() => {
            onOpen()
            setTitle('pCNV Loading')
            setDescription("We're busy mining the pCNV token, come back later.")
          }}
          title="pCNV"
        />

        <RedeemButton
          onClick={() => {
            onOpen()
            setTitle('bbtCNV Loading')
            setDescription('bbtCNV is on its way up and out of the mines, are you ready anon?')
          }}
          title="bbtCNV"
        />
      </Flex>
      <Text
        fontWeight={'bold'}
        textColor="text.low"
        fontSize={'lg'}
        onClick={addingToWallet}
        cursor="pointer"
      >
        Add CNV to your {data?.connector?.name}
      </Text>
      <WaitingConfirmationDialog isOpen={isConfirmOpen} />
      <TransactionSubmittedDialog isOpen={isSubOpen} closeParentComponent={onCloseSub} tx={tx} />
      <TransactionErrorDialog
        error={error}
        isOpen={isErrorOpen}
        closeParentComponent={onCloseError}
      />
      <ComingSoonDialog title={title} desc={description} isOpen={isOpen} onClose={onClose} />
    </GlassPanel>
  )
}

interface RedeemButtonProps {
  onClick: () => void
  title: string
}
const RedeemButton = (props: RedeemButtonProps) => {
  return (
    <GlassPanel
      onClick={props.onClick}
      width="300px"
      height={'40px'}
      rounded={'full'}
      _active={{ transform: 'scale(0.95)' }}
      transition="all 0.3s"
      justify={'center'}
      align="center"
      cursor={'pointer'}
      userSelect="none"
    >
      <Text fontWeight={'bold'} fontSize="xl">
        {props.title}
      </Text>
    </GlassPanel>
  )
}
