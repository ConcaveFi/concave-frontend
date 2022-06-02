import { ChainId, CHAIN_NAME } from '@concave/core'
import { Button, Card, Flex, SlideFade, Text } from '@concave/ui'
import Router from 'next/router'
import { ReactNode } from 'react'
import { useNetwork } from 'wagmi'

export function NetworkMismatch({
  isOpen,
  children,
  currentChainId,
  expectedChainId,
}: {
  isOpen: boolean
  children: ReactNode
  currentChainId: ChainId
  expectedChainId: ChainId
}) {
  const [, switchNetwork] = useNetwork()

  return (
    <SlideFade
      in={isOpen}
      offsetY={10}
      unmountOnExit
      style={{ position: 'absolute', bottom: '40px', left: '50%' }}
    >
      <Card
        variant="secondary"
        p={4}
        gap={1}
        fontSize="md"
        fontWeight="medium"
        transform="translateX(-50%)"
        textAlign="start"
      >
        <Text fontWeight="bold">Network changed</Text>
        {children}
        <Flex justify="center" gap={2} mt={2}>
          <Button
            variant="secondary"
            size="medium"
            px={3}
            onClick={() =>
              Router.push({ query: { chainId: currentChainId } }, undefined, {
                shallow: false,
                scroll: false,
              })
            }
          >
            Continue in {CHAIN_NAME[currentChainId]}
          </Button>
          <Button
            variant="primary"
            size="medium"
            px={3}
            onClick={() => switchNetwork(expectedChainId)}
          >
            Switch to {CHAIN_NAME[expectedChainId]}
          </Button>
        </Flex>
      </Card>
    </SlideFade>
  )
}
