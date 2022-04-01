import { Flex } from '@concave/ui'
import { CandleStickCard } from 'components/CandleStickCard'
import { SwapCard } from 'components/Swap/SwapCard'
import { useAuth } from 'contexts/AuthContext'
import React from 'react'

function Swap() {
  return (
    <Flex direction="column" justify="center" align="center" h="100%" gap={12}>
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
