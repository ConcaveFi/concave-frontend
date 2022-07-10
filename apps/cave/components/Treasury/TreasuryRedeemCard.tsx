import { CNV } from '@concave/core'
import { Button, Card, Flex, Text, useDisclosure } from '@concave/ui'
import useAddTokenToWallet, { injectedTokenResponse } from 'hooks/useAddTokenToWallet'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { FC } from 'react'
import { useConnect } from 'wagmi'
import { ACNVRedemptionDialog } from './VestedTokensDialogs/ACNVRedemptionDialog'
import { BBBTCNVRedemptionDialog } from './VestedTokensDialogs/bbtCNV/BBTCNVRedemptionDialog'
import { PCNVRedemptionDialog } from './VestedTokensDialogs/PCNVRedemptionDialog'

export const TreasuryRedeemCard = () => {
  const chaindId = useCurrentSupportedNetworkId()
  const { addingToWallet }: injectedTokenResponse = useAddTokenToWallet({
    tokenAddress: CNV[chaindId].address,
    tokenChainId: CNV[chaindId].chainId,
  })
  const { data, connectors } = useConnect()
  return (
    <Card
      variant="secondary"
      w={{ sm: '340px', md: '510px', lg: '258px' }}
      h={{ sm: '329px', md: '200px', lg: '329px' }}
    >
      <Text fontSize={'2xl'} fontWeight="bold" mx={'auto'} mt={8}>
        Redeem CNV
      </Text>
      <Text color="text.low" textAlign={'center'} px={10} fontWeight="bold">
        Redeem your tokens for CNV below
      </Text>
      <Flex direction={{ sm: 'column', md: 'row', lg: 'column' }} w="full">
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
        fontSize={{ base: '22px', lg: 'md' }}
        variant="primary.outline"
        p={2}
      >
        Add CNV to {data?.account}
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
        w={{ sm: '180px', md: '150px', lg: '180px' }}
        h="38px"
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
