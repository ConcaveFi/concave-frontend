import { ChainId, CHAIN_NAME } from '@concave/core'
import { Button, Card, Flex, SlideFade, Text } from '@concave/ui'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import { getQueryValue } from 'utils/getQueryValue'
import { useNetwork, useSwitchNetwork } from 'wagmi'

export const NetworkMismatch: React.FC<{
  onReset?: (resetingToChainId: ChainId) => void
  children: (props: { activeChainId; queryChainId }) => ReactNode
}> = ({ onReset, children }) => {
  const { switchNetwork, error } = useSwitchNetwork()

  const { query, push } = useRouter()
  const { chain } = useNetwork()

  const activeChainId = chain?.id
  const queryChainId = getQueryValue(query, 'chainId') || ChainId.ETHEREUM // if it's not set, default to eth mainnet

  const isNetworkMismatch = +queryChainId && activeChainId && +queryChainId !== activeChainId
  const queryHasCurrency = !!query.currency0 || !!query.currency1

  return (
    <SlideFade
      in={isNetworkMismatch && queryHasCurrency}
      offsetY={10}
      delay={0.2}
      unmountOnExit
      style={{
        position: 'absolute',
        bottom: '40px',
        insetInline: 0,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Card
        variant="secondary"
        borderGradient="secondary"
        p={4}
        gap={1}
        fontSize="md"
        fontWeight="medium"
        textAlign="start"
      >
        <Text fontWeight="bold">Network changed</Text>
        {children({ queryChainId, activeChainId })}
        <Flex justify="center" gap={2} mt={2}>
          <Button
            variant="secondary"
            size="medium"
            onClick={() => {
              push({ query: {} }, undefined, { shallow: true })
              onReset?.(activeChainId)
            }}
          >
            Restart on {CHAIN_NAME[activeChainId]}
          </Button>
          <Button
            variant="primary"
            size="medium"
            px={3}
            onClick={() => switchNetwork?.(+queryChainId)}
          >
            Switch to {CHAIN_NAME[queryChainId]}
          </Button>
        </Flex>
        {error && (
          <Text color="text.low" align="center" fontSize="sm" mt={2}>
            Try switching directly in your wallet.
          </Text>
        )}
      </Card>
    </SlideFade>
  )
}

export default NetworkMismatch
