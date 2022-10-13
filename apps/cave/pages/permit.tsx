import { CNV, Currency, CurrencyAmount, MARKETPLACE_CONTRACT } from '@concave/core'
import { Box, Button, Card, Flex, Heading, Text } from '@concave/ui'
import { CurrencyInputField } from 'components/CurrencyAmountField'
import { SelectFaucetCurrency } from 'components/CurrencySelector/SelectFaucetCurrency'
import { withPageTransition } from 'components/PageTransition'
import { Contract } from 'ethers'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { usePermit } from 'hooks/usePermit'
import { concaveProvider } from 'lib/providers'
import { useState } from 'react'
import { useAccount, useSigner } from 'wagmi'

const Permit = () => {
  const chainId = useCurrentSupportedNetworkId()
  const { address } = useAccount()
  const { data: signer } = useSigner()
  const [inputAmount, setInputAmout] = useState<CurrencyAmount<Currency>>(
    CurrencyAmount.fromRawAmount(CNV[chainId], '0'),
  )
  const permit = usePermit(inputAmount.wrapped, MARKETPLACE_CONTRACT[chainId], Date.now())
  const testPermit = async () => {
    const provider = concaveProvider(chainId)
    const contract = new Contract(
      inputAmount.currency.wrapped.address,
      [
        'function permit(address holder, address spender, uint256 nonce, uint256 expiry, bool allowed, uint8 v, bytes32 r, bytes32 s) external',
        //  'function permit(address owner, address spender, uint value, uint deadline, uint8 v, bytes32 r, bytes32 s) external',
      ],
      provider,
    ).connect(signer)
    console.log(`contract`, inputAmount.currency.wrapped.address)
    console.table([
      address,
      MARKETPLACE_CONTRACT[chainId],
      permit.signedPermit.nonce,
      permit.signedPermit.expiry,
      permit.signedPermit.v,
      permit.signedPermit.r,
      permit.signedPermit.s,
    ])
    contract.permit(
      address,
      MARKETPLACE_CONTRACT[chainId],
      permit.signedPermit.nonce.toString(),
      permit.signedPermit.expiry,
      permit.signedPermit.allowed,
      permit.signedPermit.v,
      permit.signedPermit.r,
      permit.signedPermit.s,
    )
  }

  return (
    <Box maxH={'100vh'} w={'100%'} overflowY={'hidden'} apply="scrollbar.secondary">
      <Flex
        align={'center'}
        w={'100%'}
        borderRadius={0}
        gap={4}
        textAlign="center"
        direction="column"
      >
        <>
          <Heading as="h1" mt={16} mb={3} fontSize="5xl">
            Permit
          </Heading>
          <Flex mt={0} align="center" gap={10} width="full" justify="center" alignItems={'center'}>
            <Text maxW={520} textAlign={'center'}>
              Select and permit
            </Text>
          </Flex>

          <Flex
            direction="column"
            float={'left'}
            position="relative"
            justify={'center'}
            align="center"
            width="full"
            gap={5}
            p={{ base: 0, sm: 4 }}
          >
            <Card p={6} gap={6} variant="primary" h="fit-content" shadow="Block Up" w="100%">
              <CurrencyInputField
                currencyAmountIn={inputAmount}
                onChangeAmount={setInputAmout}
                CurrencySelector={SelectFaucetCurrency}
              />

              <Button
                variant="primary"
                size="large"
                w="full"
                onClick={() => {
                  permit.signPermit()
                }}
              >
                Sign
              </Button>
              <Text>{'Signature: ' + JSON.stringify(permit.signedPermit || {})}</Text>

              <Button
                variant="primary"
                size="large"
                w="full"
                onClick={() => {
                  testPermit()
                }}
              >
                Permit
              </Button>
            </Card>
          </Flex>
        </>
      </Flex>
    </Box>
  )
}

export default withPageTransition(Permit)
