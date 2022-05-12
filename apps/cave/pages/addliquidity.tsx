import { Flex, Heading, Text } from '@concave/ui'
import { AddLiquidityCard } from 'components/AMM/AddLiquidity/AddLiquidity'
import { Loading } from 'components/Loading'
import { useFetchTokenData } from 'hooks/useTokenList'
import { useRouter } from 'next/router'
import React from 'react'

export default function AddLiquidity() {
  const router = useRouter()
  const params = {
    chainID: Array.isArray(router.query.chainId) ? router.query.chainId[0] : router.query.chainId,
    currency0: Array.isArray(router.query.currency0)
      ? router.query.currency0[0]
      : router.query.currency0,
    currency1: Array.isArray(router.query.currency1)
      ? router.query.currency1[0]
      : router.query.currency1,
  }
  const currency0 = useFetchTokenData(params.chainID, params.currency0)
  const currency1 = useFetchTokenData(params.chainID, params.currency1)
  return (
    <>
      <Flex
        align={'center'}
        w={'100%'}
        borderRadius={0}
        gap={4}
        textAlign="center"
        direction="column"
      >
        <Heading as="h1" mt={16} mb={3} fontSize="5xl">
          Add Liquidity Pools
        </Heading>
        <Flex mt={0} align="center" gap={10} width="full" justify="center" alignItems={'center'}>
          <Text maxW={520} textAlign={'center'}>
            Tip: When you add liquidity, you will receive pool tokens representing your position.
            These tokens automatically earn fees proportional to your share of the pool, and can be
            redeemed at any time.
          </Text>
        </Flex>
        <Flex
          direction="column"
          float={'left'}
          position="relative"
          justify={'center'}
          align="center"
          width="full"
          p={4}
        >
          {!currency0?.isLoading && !currency1?.isLoading && router.isReady ? (
            <AddLiquidityCard
              borderWidth={2}
              variant="primary"
              p={4}
              w="500px"
              gap={6}
              shadow="Up for Blocks"
              currency0={currency0.data}
              currency1={currency1.data}
            />
          ) : (
            <Loading size="md" />
          )}
        </Flex>
      </Flex>
    </>
  )
}
