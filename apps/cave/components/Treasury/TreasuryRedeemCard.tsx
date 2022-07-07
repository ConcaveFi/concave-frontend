import { CNV } from '@concave/core'
import { Button, Flex, Text, useDisclosure } from '@concave/ui'
import useAddTokenToWallet, { injectedTokenResponse } from 'hooks/useAddTokenToWallet'
import { GlassPanel } from './TreasuryManagementCard'
import { useState } from 'react'
import { ComingSoonDialog } from 'components/ComingSoonDialog'
import BBBTCNVRedemptionDialog from './VestedTokensDialogs/bbtCNV/BBTCNVRedemptionDialog'
import ACNVRedemptionDialog from './VestedTokensDialogs/ACNVRedemptionDialog'
// aCNV address
// 0x2a6bb78490c2221e0d36d931192296be4b3a01f1 RINKEBY
// 0x6ff0106d34feee8a8acf2e7b9168480f86b82e2f eth

function TreasuryRedeemCard() {
  // TODO make token chain dinamic, refactor useAddTokenToWallet hook
  const { addingToWallet }: injectedTokenResponse = useAddTokenToWallet({
    tokenAddress: CNV[1].address,
    tokenChainId: CNV[1].chainId,
  })
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [description, setDescription] = useState("This feature it's not done yet.")
  const [title, setTitle] = useState('Coming soon')

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
    <>
      <GlassPanel
        width={{ base: '510px', xl: '260px' }}
        height={{ base: '240px', xl: '331px' }}
        direction="column"
      >
        <Flex direction={{ base: 'row', xl: 'column' }}>
          <Flex direction={'column'} maxW="300px" justify={'center'} px="10" mt={6}>
            <Text textAlign={{ base: 'start', xl: 'center' }} fontSize={'25px'} fontWeight="700">
              Redeem CNV
            </Text>
            <Text
              textAlign={{ base: 'start', xl: 'center' }}
              fontSize={{ base: '20px', xl: '16px' }}
              textColor="text.low"
              fontWeight={'700'}
            >
              Redeem your tokens for CNV below
            </Text>
          </Flex>
          <Flex mt={5} direction={{ base: 'column' }} gap={{ base: 3 }}>
            <RedeemButton onClick={onOpenRedeemACNV} title="aCNV" />
            <ACNVRedemptionDialog onClose={onCloseRedeemACNV} isOpen={onRedeemACNV} />

            <RedeemButton
              onClick={() => {
                onOpen()
                setTitle('pCNV Loading')
                setDescription("We're busy mining the pCNV token, come back later.")
              }}
              title="pCNV"
            />

            <RedeemButton onClick={onOpenRedeemBBTCNV} title="bbtCNV" />
            <BBBTCNVRedemptionDialog isOpen={onRedeemBBTCNV} onClose={onCloseRedeemBBTCNV} />
          </Flex>
        </Flex>
        <Text
          onClick={addingToWallet}
          textColor={'text.low'}
          fontWeight={700}
          cursor="pointer"
          mx={'auto'}
          my="auto"
          fontSize={{ base: '22px', xl: '18px' }}
        >
          Add CNV to your wallet
        </Text>
      </GlassPanel>
      <ComingSoonDialog title={title} desc={description} isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default TreasuryRedeemCard

const RedeemButton = ({ onClick, title }: { onClick: () => void; title: string }) => {
  return (
    <Button _hover={{ transform: 'scale(1.05)' }} onClick={onClick}>
      <GlassPanel width={{ base: '160px', xl: '182px' }} height={'40px'} justify="center">
        <Text fontSize={'20px'} fontWeight="700" my={'auto'}>
          {title}
        </Text>
      </GlassPanel>
    </Button>
  )
}
