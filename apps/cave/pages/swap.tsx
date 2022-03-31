import { Flex } from '@concave/ui'
import { CandleStickCard } from 'components/CandleStickCard'
import GcnvTitle from 'components/GcnvTitle'
import { SwapCard } from 'components/Swap/SwapCard'
import { useSwap } from 'components/Swap/useSwap'
import { useAuth } from 'contexts/AuthContext'
import React from 'react'

function Swap() {
  const { user, isConnected } = useAuth()
  const swap = useSwap(isConnected ? user?.address : '', {})

  return (
    <Flex direction="column" gap={12}>
      <GcnvTitle title="Swap gCNV" description="Swap gCNV here" />
      <Flex gap={4} flexWrap="wrap" justify="center">
        {/* <CandleStickCard
          from={swap.from.token}
          to={swap.to.token}
          variant="secondary"
          gap={2}
          p={6}
          h={['100%', 470, 400]}
          w={['100%', '100%', 500, 567, 567]}
          align="stretch"
        /> */}
        <SwapCard />
      </Flex>
    </Flex>
  )
}

export default Swap
