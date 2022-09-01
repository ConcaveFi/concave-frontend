import { CNV } from '@concave/core'
import { Button, Card, Flex, Text, useDisclosure } from '@concave/ui'
import useAddTokenToWallet, { injectedTokenResponse } from 'hooks/useAddTokenToWallet'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { FC } from 'react'
import { useAccount } from 'wagmi'
import { ACNVRedemptionDialog } from './VestedTokensDialogs/ACNVRedemptionDialog'
import { BBTCNVRedemptionDialog } from './VestedTokensDialogs/BBTCNVRedemptionDialog'
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
      w={{ base: 'full' }}
      h={{ base: '315px', md: '200px', xl: '150px' }}
      px={{ base: 0, md: 10, xl: '6' }}
      py={6}
      direction={{ base: 'column', xl: 'row' }}
    >
      <Text my={'auto'} fontSize={'3xl'} fontWeight="bold">
        Redeem CNV
      </Text>
      <Flex w={{ base: 'full', xl: '75%' }} px={6} direction={'column'} mx="auto" my={'auto'}>
        <Text color="text.low" textAlign={'center'} fontWeight="bold">
          Redeem your tokens for CNV below
        </Text>

        <Flex direction={{ base: 'column', md: 'row', lg: 'row' }} w="full" gap={3} py={3}>
          <VestedTokenButton title="aCNV" VestedTokenDialog={ACNVRedemptionDialog} />
          <VestedTokenButton title="pCNV" VestedTokenDialog={PCNVRedemptionDialog} />
          <VestedTokenButton title="bbtCNV" VestedTokenDialog={BBTCNVRedemptionDialog} />
        </Flex>
        <Button
          onClick={addingToWallet}
          textColor={'text.low'}
          fontWeight={'bold'}
          cursor="pointer"
          // my="auto"
          fontSize={{ base: '22px', lg: 'sm' }}
          px={2}
        >
          Add CNV to {connector?.name || 'wallet'}
        </Button>
      </Flex>
    </Card>
  )
}

export type VestedTokenButtonProps = { onClose: VoidFunction; isOpen: boolean }

type VestedTokenButton = { title: string; VestedTokenDialog: FC<VestedTokenButtonProps> }
const VestedTokenButton: React.FC<VestedTokenButton> = ({ title, VestedTokenDialog }) => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  return (
    <>
      <Button
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
