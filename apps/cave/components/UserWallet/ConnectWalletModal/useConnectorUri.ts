import { useQuery } from 'react-query'
import { Connector } from 'wagmi'

export const useConnectorUri = (connector: Connector) => {
  const { data: uri, isLoading } = useQuery(
    `${connector?.name} uri`,
    async () => {
      const connectorProvider = await connector?.getProvider()
      const uri = connectorProvider.connector?.uri || connectorProvider.qrUrl
      if (uri.endsWith('key=')) throw 'no key'
      return uri
    },
    { enabled: !!connector?.id, retry: (_, error) => error === 'no key' },
  )

  return { uri, isLoading }
}
