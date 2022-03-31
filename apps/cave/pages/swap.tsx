import { Flex } from '@concave/ui'
import { CandleStickCard } from 'components/CandleStickCard'
import GcnvTitle from 'components/GcnvTitle'
import { SwapCardLegacy } from 'components/Swap/SwapCardLegacy'
import { useSwap } from 'components/Swap/useSwap'
import { useAuth } from 'contexts/AuthContext'
import React from 'react'

const cardProps = {}

function Swap() {
  const { user, isConnected } = useAuth()
  const swap = useSwap(isConnected ? user?.address : '', {})

  return (
    <Flex direction="column" gap={12}>
      <GcnvTitle title="Swap gCNV" description="Swap gCNV here" />
      <Flex gap={4} flexWrap="wrap" justify="center">
        <CandleStickCard
          from={swap.from.token}
          to={swap.to.token}
          variant="secondary"
          gap={2}
          p={6}
          h={['100%', 470, 400]}
          w={['100%', '100%', 500, 567, 567]}
          align="stretch"
        />
        <SwapCardLegacy
          swap={swap}
          buttonLabel="Swap"
          shadow={
            '0px 4px 86px rgba(123, 129, 255, 0.3), 0px 20px 30px rgba(0, 0, 0, 0.47), inset -10px 10px 30px rgba(128, 156, 255, 0.1)'
          }
          variant="primary"
          justifyContent={'space-between'}
          gap={2}
          p={6}
          h={['100%', 400]}
          w={['100%', '100%', 500, 567, 400]}
        />
      </Flex>
    </Flex>
  )
}

export default Swap
