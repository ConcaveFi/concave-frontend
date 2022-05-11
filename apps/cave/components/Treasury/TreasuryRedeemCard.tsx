import { CNV } from 'constants/tokens'
import { Button, Card, Flex, HStack, Image, Text } from '@concave/ui'
import useAddTokenToWallet, { injectedTokenResponse } from 'hooks/useAddTokenToWallet'
import { useIsMounted } from 'hooks/useIsMounted'
import { getWalletType, renderProviderText } from 'lib/injected.wallets'
import { GlassPanel } from './TreasuryManagementCard'

function TreasuryRedeemCard() {
  const isMounted = useIsMounted()
  const { loading: loadingtoWallet, addingToWallet }: injectedTokenResponse = useAddTokenToWallet({
    tokenAddress: CNV.address,
    tokenChainId: CNV.chainId,
  })

  return (
    <GlassPanel
      width={'260px'}
      height={'331px'}
      backdropBlur={'2px'}
      rounded="2xl"
      direction={'column'}
    >
      <Flex justify={'center'} align="center" flex={1} maxHeight="60px" mt={2}>
        <Text fontSize={'25px'} fontWeight="700">
          {' '}
          Redeem CNV
        </Text>
      </Flex>
      <Flex mx={6} textAlign="center">
        <Text fontSize={'14px'} textColor="text.low" fontWeight={'700'}>
          If you was on the one who did thar before and want your CNV please press that button
        </Text>
      </Flex>
      <Flex mt={5} direction="column" gap={2}>
        <GlassPanel width={'182px'} height={'40px'} rounded="2xl" mx={'auto'} justify={'center'}>
          <Button>
          <Text fontSize={'18px'} fontWeight="700" my={'auto'}>
            aCNV - 500
          </Text>
          </Button>
        </GlassPanel>
        <GlassPanel width={'182px'} height={'40px'} rounded="2xl" mx={'auto'} justify={'center'}>
          <Button>
          <Text fontSize={'18px'} fontWeight="700" my={'auto'}>
            pCNV - 3200
          </Text>
          </Button>
        </GlassPanel>
        <GlassPanel width={'182px'} height={'40px'} rounded="2xl" mx={'auto'} justify={'center'}>
          <Button>
          <Text fontSize={'18px'} fontWeight="700" my={'auto'}>
            BBTCNV - 100
          </Text>
          </Button>
        </GlassPanel>
      </Flex>

      <Text textColor={'text.low'} fontWeight={700} cursor="pointer" mx={'auto'} my="auto">
        Add CNV to your Metamask
      </Text>
    </GlassPanel>
  )
}

export default TreasuryRedeemCard
{
  /* <Flex direction={'column'} width="250px" mx={'auto'} mt={6} textAlign="center">
        <Text fontWeight={500} mb={4} fontSize="24px">
          Redeem CNV
        </Text>
        <Text fontWeight={700} textColor={'text.low'} fontSize="14px">
          If you was the one who did that before and want your CNV please press that button
        </Text>
      </Flex>
      <Card width={'182px'} height="40px" justify={'center'} align="center" mx={'auto'} my={'auto'}>
        <Button>
          <Text textColor={'text.low'} fontSize="18px" fontWeight={'700'}>
            aCNV - balance
          </Text>
        </Button>
      </Card>
      <Card width={'182px'} height="40px" justify={'center'} align="center" mx={'auto'} my={'auto'}>
        <Button>
          <Text textColor={'text.low'} fontSize="18px" fontWeight={'700'}>
            pCNV - balance
          </Text>
        </Button>
      </Card>
      <Card width={'182px'} height="40px" justify={'center'} align="center" mx={'auto'} my={'auto'}>
        <Button>
          <Text textColor={'text.low'} fontSize="18px" fontWeight={'700'}>
            bbtCNV - balance
          </Text>
        </Button>
      </Card>

      <Button disabled={loadingtoWallet} onClick={addingToWallet}>
        <HStack spacing="2px" textAlign="left" w="150px" gap={2}>
          {isMounted && (
            <Image
              style={{ filter: 'saturate(0%)' }}
              src={renderProviderText(getWalletType()).img as string}
              alt="w"
              ml={-3}
              h="1rem"
              w="1rem"
            />
          )}
          <Text fontSize="base" fontWeight="bold">
            Add CNV to wallet
          </Text>
        </HStack>
      </Button> */
}
