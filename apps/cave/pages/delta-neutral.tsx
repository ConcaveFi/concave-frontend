import { DAI, NATIVE } from '@concave/core'
import { Flex, Text } from '@concave/ui'
import { VaultActivity } from 'components/DeltaNeutral/VaultActivity'
import { VaultCapacity } from 'components/DeltaNeutral/VaultCapacity'
import { VaultPositionSelect } from 'components/DeltaNeutral/VaultPositionSelect'
import { useFetchTokenData } from 'hooks/useTokenList'

const DeltaNeutral = () => {
  const WMATIC = useFetchTokenData(137, '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270')
  const debugTokens = [
    { title: 'Synapse vault strategy', tokens: [WMATIC.data, NATIVE[1]] },
    { title: 'Yearn vault strategy', tokens: [NATIVE[1], DAI[1]] },
  ]
  console.log(WMATIC)

  return (
    <Flex direction="column" w="full" maxW={'1100px'} align={'center'} mx="auto">
      <Text mt={8} mx={'auto'} fontSize="6xl" fontWeight={'bold'}>
        Vaults
      </Text>

      <Text mt={2} textAlign={'center'} mx={'auto'} fontWeight="bold">
        Rebalance Event Countdoun <br /> or <br /> Depsoits will be deployed in Countodown
      </Text>
      <Flex w={'full'} my={10} justify="center" gap={6} h="full" align={'center'}>
        {debugTokens.map(({ tokens, title }, index) => (
          <Flex direction={'column'} key={index}>
            <VaultPositionSelect title={title} selectabe tokens={tokens} />
            <VaultCapacity zIndex={-1} mt={-16} />
          </Flex>
        ))}
      </Flex>
      <VaultActivity />
    </Flex>
  )
}
export default DeltaNeutral
