import { CNV } from '@concave/core'
import { Button, Card, Flex, Text, useDisclosure } from '@concave/ui'
import useAddTokenToWallet, { injectedTokenResponse } from 'hooks/useAddTokenToWallet'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { FC } from 'react'
import { useAccount } from 'wagmi'
import { ACNVRedemptionDialog } from './VestedTokensDialogs/ACNVRedemptionDialog'
import { BBBTCNVRedemptionDialog } from './VestedTokensDialogs/bbtCNV/BBTCNVRedemptionDialog'
import { PCNVRedemptionDialog } from './VestedTokensDialogs/PCNVRedemptionDialog'

export const TreasuryRedeemCard = () => {
  const chaindId = useCurrentSupportedNetworkId()
  const { addingToWallet }: injectedTokenResponse = useAddTokenToWallet({
    tokenAddress: CNV[chaindId].address,
    tokenChainId: CNV[chaindId].chainId,
  })

  const { connector } = useAccount()
  return (
    <Card
      variant="secondary"
      w={{ base: 'full', lg: '45%', xl: '40%' }}
      h={{ base: '315px', md: '200px', lg: '329px' }}
      px={10}
    >
      <Text fontSize={'2xl'} fontWeight="bold" mx={'auto'} mt={8}>
        Redeem CNV
      </Text>
      <Text color="text.low" textAlign={'center'} fontWeight="bold">
        Redeem your tokens for CNV below
      </Text>
      <Flex direction={{ base: 'column', md: 'row', lg: 'column' }} w="full">
        <VestedTokenButton title="aCNV" VestedTokenDialog={ACNVRedemptionDialog} />
        <VestedTokenButton title="pCNV" VestedTokenDialog={PCNVRedemptionDialog} />
        <VestedTokenButton title="bbtCNV" VestedTokenDialog={BBBTCNVRedemptionDialog} />
      </Flex>
      <Button
        onClick={addingToWallet}
        textColor={'text.low'}
        fontWeight={'bold'}
        cursor="pointer"
        mx={'auto'}
        my="auto"
        fontSize={{ base: '22px', lg: 'sm' }}
        variant="primary.outline"
        size={'md'}
        px={2}
        w="full"
      >
        Add CNV to {connector?.name || 'wallet'}
      </Button>
    </Card>
  )
}

export type VestedTokenDialogProps = { onClose: VoidFunction; isOpen: boolean }

type VestedTokenButton = { title: string; VestedTokenDialog: FC<VestedTokenDialogProps> }
const VestedTokenButton: React.FC<VestedTokenButton> = ({ title, VestedTokenDialog }) => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  return (
    <>
      <Button
        mt={3}
        mx={'auto'}
        w="full"
        size="md"
        // h="38px"
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
      <VestedTokenDialog isOpen={isOpen} onClose={onClose} />
    </>
  )
}
