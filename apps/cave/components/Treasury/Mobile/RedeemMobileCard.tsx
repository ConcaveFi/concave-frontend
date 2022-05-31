import { Flex, Text, useDisclosure } from '@concave/ui'
import { CNV } from 'constants/tokens'
import useAddTokenToWallet, { injectedTokenResponse } from 'hooks/useAddTokenToWallet'
import { useState } from 'react'
import { useConnect } from 'wagmi'
import { GlassPanel } from '../TreasuryManagementCard'
import { ComingSoonDialog } from 'components/ComingSoonDialog'
import ACVNRedemptionDialog from '../VestedTokensDialogs/ACVNRedemptionDialog'
import { bbtCNV_ADDRESS } from '../Hooks/useVestedTokens'
import BBBTCNVRedemptionDialog from '../VestedTokensDialogs/BBBTCNVRedemptionDialog'

export default function RedeemMobileCard() {
  const { loading: loadingtoWallet, addingToWallet }: injectedTokenResponse = useAddTokenToWallet({
    tokenAddress: CNV.address,
    tokenChainId: CNV.chainId,
  })

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [description, setDescription] = useState("This feature it's not done yet.")
  const [title, setTitle] = useState('Coming soon')

  const [{ data }] = useConnect()
  const {
    isOpen: onRedeemBBTCNV,
    onOpen: onOpenRedeemBBTCNV,
    onClose: onCloseRedeemBBTCNV,
  } = useDisclosure()
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
        <ACVNRedemptionDialog isOpen={onRedeemACNV} onClose={onCloseRedeemACNV} />

        <RedeemButton
          onClick={() => {
            onOpen()
            setTitle('pCNV Loading')
            setDescription("We're busy mining the pCNV token, come back later.")
          }}
          title="pCNV"
        />

        <RedeemButton onClick={onOpenRedeemBBTCNV} title="bbtCNV" />
        <BBBTCNVRedemptionDialog isOpen={onRedeemBBTCNV} onClose={onCloseRedeemACNV} />
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
