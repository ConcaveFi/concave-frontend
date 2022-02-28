import { HStack, Text } from '@chakra-ui/react'
import { TokenIcon } from '@concave/icons'
import { SwapContext } from 'hooks/useSwap'
import React, { useContext } from 'react'

export const CandleStickTokenOptions = () => {
  const { selectedInputToken, selectedOutputToken } = useContext(SwapContext)
  return (
    <HStack p={1} pr={2} pl={2} height={'40px'} borderRadius="3xl" shadow={'low'}>
      <TokenIcon size="30px" tokenName={selectedInputToken} />
      <Text>{selectedInputToken} /</Text>
      <TokenIcon size="30px" tokenName={selectedOutputToken} />
      <Text paddingRight={1}>{selectedOutputToken}</Text>
    </HStack>
  )
}
