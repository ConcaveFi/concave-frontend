import { Box, Flex, HStack, Image, Text, VStack } from '@concave/ui'
import { Dispatch, SetStateAction, useState } from 'react'

const MarketplaceTransactionCard = (props: any) => {
  const {filter} = props;
  console.log("filter: ", filter)

  return (
  <HStack>
    <VStack>
      <Box>{filter.event}</Box>
      <Image src="" alt={filter.date} />
    </VStack>

    <VStack>
      <div>{filter.date}</div>
      <div>{`${filter.date} position of ${filter.cnv} CNV`}</div>
      <div>{filter.link}</div>
    </VStack>
  </HStack>
  )
}
export default MarketplaceTransactionCard
