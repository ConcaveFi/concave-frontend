import { Text } from '@chakra-ui/react'
import { useEtherBalance, useEthers, NATIVE_CURRENCY } from '@usedapp/core'

export function Balance(): JSX.Element {
  const { account, chainId } = useEthers()
  const etherBalance = useEtherBalance(account)
  const finalBalance = etherBalance && NATIVE_CURRENCY[chainId].format(etherBalance?.toString())
  return <Text>{finalBalance}</Text>
}
