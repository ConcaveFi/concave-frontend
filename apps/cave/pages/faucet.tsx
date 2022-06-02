import { CNV, Currency, CurrencyAmount } from '@concave/core'
import { Box, Button, Card, Flex, Heading, Text } from '@concave/ui'
import { CurrencyInputField } from 'components/CurrencyAmountField'
import { SelectAMMCurrency } from 'components/CurrencySelector/SelectAMMCurrency'
import { withPageTransition } from 'components/PageTransition'
import { Contract } from 'ethers'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { concaveProvider } from 'lib/providers'
import React, { useState } from 'react'
import { useAccount, useSigner } from 'wagmi'

const Faucet = () => {
  const chainId = useCurrentSupportedNetworkId()
  const [inputAmount, setInputAmout] = useState<CurrencyAmount<Currency>>(
    CurrencyAmount.fromRawAmount(CNV[chainId], '0'),
  )
  const [{ data: account }] = useAccount()
  const [{ data: signer }] = useSigner()

  const mint = () => {
    const provider = concaveProvider(chainId)
    const contract = new Contract(
      inputAmount.currency.wrapped.address,
      ['function mint(address guy, uint256 wad) external'],
      provider,
    ).connect(signer)

    console.log(contract)
    contract.mint(account.address, inputAmount.numerator.toString())
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
            Faucet
          </Heading>
          <Flex mt={0} align="center" gap={10} width="full" justify="center" alignItems={'center'}>
            <Text maxW={520} textAlign={'center'}>
              Select and mint tokens
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
            <Card
              p={6}
              gap={6}
              variant="primary"
              h="fit-content"
              shadow="Block Up"
              w="100%"
              maxW="420px"
            >
              <CurrencyInputField
                currencyAmountIn={inputAmount}
                onChangeAmount={setInputAmout}
                CurrencySelector={SelectAMMCurrency}
              />

              <Button variant="primary" size="large" w="full" onClick={mint}>
                Mint
              </Button>
            </Card>
          </Flex>
        </>
      </Flex>
    </Box>
  )
}

export default withPageTransition(Faucet)
