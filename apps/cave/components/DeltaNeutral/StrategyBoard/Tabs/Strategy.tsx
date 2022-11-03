import { Flex, Image, Text } from '@concave/ui'
import { VaultActivityBar } from 'components/DeltaNeutral/VaultActivityBar'

export const StrategyTab = () => {
  return (
    <Flex direction={'column'} height="340px" w={'full'}>
      <Flex height={'80%'} align="center" pl={6} w="full">
        <Image src="assets/icons/vault.svg" alt="vault" />
        <Flex direction={'column'} pl={6}>
          <Text fontWeight={'bold'} fontSize={'3xl'}>
            Deposit into vault
          </Text>
          <Text color="text.small">
            Deposit USDC into the vault using the form on the right. This triggers an automatic
            borrow of an equal value of SOL (from the Delta lending pool), which is invested
            alongside your USDC deposit into SOL-USDC pools.
          </Text>
        </Flex>
      </Flex>
      <VaultActivityBar
        size="md"
        mx={'auto'}
        currentActive={0}
        onChangePag={() => {}}
        paginationCount={5}
      />
    </Flex>
  )
}
