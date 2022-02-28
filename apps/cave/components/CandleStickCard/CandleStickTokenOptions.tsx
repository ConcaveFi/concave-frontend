import { HStack, Text } from '@chakra-ui/react'
import { TokenIcon } from '@concave/icons'
import React from 'react'

export const CandleStickTokenOptions = ({
  selectedInputToken,
  selectedOutputToken,
}: {
  selectedInputToken: string
  selectedOutputToken: string
}) => {
  return (
    <HStack p={1} pr={2} pl={2} height={'40px'} borderRadius="3xl" shadow={'low'}>
      <TokenIcon size="30px" tokenName={selectedInputToken} />
      <Text>{selectedInputToken} /</Text>
      <TokenIcon size="30px" tokenName={selectedOutputToken} />
      <Text paddingRight={1}>{selectedOutputToken}</Text>
    </HStack>
  )
}
