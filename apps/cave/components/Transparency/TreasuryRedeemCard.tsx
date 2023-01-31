import { CNV } from '@concave/core'
import { Button, Card, Flex, Text, useDisclosure } from '@concave/ui'
import { getCurrencyLogoURI } from 'components/CurrencyIcon'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { FC } from 'react'
import { useAccount } from 'wagmi'
import { ACNVRedemptionDialog } from './VestedTokensDialogs/ACNVRedemptionDialog'
import { BBTCNVRedemptionDialog } from './VestedTokensDialogs/BBTCNVRedemptionDialog'
import { PCNVRedemptionDialog } from './VestedTokensDialogs/PCNVRedemptionDialog'

export const TreasuryRedeemCard = () => {
  const chaindId = useCurrentSupportedNetworkId()
  const cnv = CNV[chaindId]

  const { connector } = useAccount()
  return (
    <Card
      variant="secondary"
      w={'100%'}
      h={'auto'}
      p={6}
      direction={{ base: 'column', xl: 'row' }}
      align="center"
      justifyContent={'center'}
      gap={{ base: 4, xl: 0 }}
    >
      <Text w={{ base: '100%', lg: '33%' }} fontSize={'3xl'} fontWeight={700}>
        Redeem CNV
      </Text>
      <Flex
        justifyContent={'center'}
        w={{ base: '100%', lg: '66%' }}
        direction={'column'}
        gap={{ base: 2, lg: 0 }}
      >
        <Text color="text.low" textAlign={'center'} fontWeight="bold">
          Redeem your tokens for CNV below
        </Text>

        <Flex
          direction={{ base: 'column', md: 'row', lg: 'row' }}
          w="full"
          gap={{ base: 6, lg: 3 }}
          py={3}
        >
          <VestedTokenButton title="aCNV" VestedTokenDialog={ACNVRedemptionDialog} />
          <VestedTokenButton title="pCNV" VestedTokenDialog={PCNVRedemptionDialog} />
          <VestedTokenButton title="bbtCNV" VestedTokenDialog={BBTCNVRedemptionDialog} />
        </Flex>
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
