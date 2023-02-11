import { CNV } from '@concave/core'
import { Button, Card, Text, useDisclosure, VStack } from '@concave/ui'
import { getCurrencyLogoURI } from 'components/CurrencyIcon'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { FC } from 'react'
import { useAccount } from 'wagmi'
import { ACNVRedemptionDialog } from '../../Transparency/VestedTokensDialogs/ACNVRedemptionDialog'
import { BBTCNVRedemptionDialog } from '../../Transparency/VestedTokensDialogs/BBTCNVRedemptionDialog'
import { PCNVRedemptionDialog } from '../../Transparency/VestedTokensDialogs/PCNVRedemptionDialog'

export const RedeemTokensCard = () => {
  const chaindId = useCurrentSupportedNetworkId()
  const cnv = CNV[chaindId]

  const { connector } = useAccount()
  return (
    <Card
      variant="secondary"
      w={'full'}
      p={{ base: 2, sm: 4, md: 6 }}
      maxW={'490px'}
      direction={{ base: 'column', xl: 'row' }}
      justifyContent={'center'}
      gap={{ base: 4, xl: 0 }}
    >
      <VStack w={'full'} gap={2}>
        <Text fontSize={'3xl'} fontWeight={700}>
          Redeem CNV
        </Text>
        <Text color="text.low" textAlign={'center'} fontWeight="bold">
          Redeem your tokens for CNV below
        </Text>

        <VestedTokenButton title="aCNV" Modal={ACNVRedemptionDialog} />
        <VestedTokenButton title="pCNV" Modal={PCNVRedemptionDialog} />
        <VestedTokenButton title="bbtCNV" Modal={BBTCNVRedemptionDialog} />
        <Button
          onClick={() => {
            connector.watchAsset({
              address: cnv.address,
              decimals: cnv.decimals,
              symbol: cnv.symbol,
              image: getCurrencyLogoURI(cnv),
            })
          }}
          textColor={'text.low'}
          fontWeight={'bold'}
          cursor="pointer"
          fontSize={{ base: '22px', lg: 'sm' }}
          px={2}
        >
          Add CNV to {connector?.name || 'wallet'}
        </Button>
      </VStack>
    </Card>
  )
}

export type ModalType = { onClose: VoidFunction; isOpen: boolean }

type VestedTokenButton = { title: string; Modal: FC<ModalType> }
const VestedTokenButton: React.FC<VestedTokenButton> = ({ title, Modal }) => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  return (
    <>
      <Button
        mx={'auto'}
        w="full"
        size="md"
        _hover={{ transform: 'scale(1.05)' }}
        _active={{}}
        _focus={{}}
        variant="primary.outline"
        onClick={onOpen}
      >
        <Text fontSize={'20px'} fontWeight="700" my={'auto'}>
          {title}
        </Text>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} />
    </>
  )
}
