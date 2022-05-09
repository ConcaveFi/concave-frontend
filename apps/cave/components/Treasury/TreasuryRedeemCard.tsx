import { CNV } from 'constants/tokens'
import { Button, Card, Flex, HStack, Image, Text } from '@concave/ui'
import useAddTokenToWallet, { injectedTokenResponse } from 'hooks/useAddTokenToWallet'
import { useIsMounted } from 'hooks/useIsMounted'
import { getWalletType, renderProviderText } from 'lib/injected.wallets'

function TreasuryRedeemCard() {
  const isMounted = useIsMounted()
  const { loading: loadingtoWallet, addingToWallet }: injectedTokenResponse = useAddTokenToWallet({
    tokenAddress: CNV.address,
    tokenChainId: CNV.chainId,
  })

  return (
    <Card width={'260px'} height={'331px'} variant="secondary" backdropBlur={'2px'} filter={'auto'}>
      <Flex direction={'column'} width="250px" mx={'auto'} mt={6} textAlign="center">
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
      </Button>
    </Card>
  )
}

export default TreasuryRedeemCard
