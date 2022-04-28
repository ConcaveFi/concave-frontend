import { TransactionIcon } from '@concave/icons'
import { Box, Flex, HStack, Image, Text, VStack } from '@concave/ui'
import { format } from 'date-fns'
// import fromUnixTime from 'date-fns/fromUnixTime'

const MarketplaceTransactionCard = (props: any) => {
  const { filter } = props
  // const unixTime = fromUnixTime(filter.date);
  // const cleanDate =  format(new Date(unixTime), 'PPpp');
  const cleanDate = format(new Date(filter.date), 'PPpp')
  return (
    <Box mx="auto" py={5} w="auto" h="auto" shadow="down" borderRadius="16px">
      <HStack>
        <VStack>
          <Box>
            <Text color="blue.400" as="b">
              {filter.event}
            </Text>
          </Box>
          <Image h="70px" w="70px" src={'/assets/marketplace/1mposition.png'} alt={filter.date} />
        </VStack>

        <VStack>
          <Box>
            <Text fontSize="xs" color="text.low" fontWeight="medium">
              {cleanDate}
            </Text>
          </Box>
          <Box>
            <Text as="b">{`${filter.length} `}</Text>
            <Text fontSize="s" color="text.low" fontWeight="light">
              {`position of `}
            </Text>
            <Text as="b">{`${filter.cnv} CNV`}</Text>
          </Box>
          <Flex>
            <Box>
              <a href={`https://etherscan.io/tx/${filter.link}`} target="_blank" rel="noreferrer">
                <Text color="blue.400" as="u">
                  Transaction
                </Text>
                <TransactionIcon viewBox="0 0 30 30" />
              </a>
            </Box>
          </Flex>
        </VStack>
      </HStack>
    </Box>
  )
}
export default MarketplaceTransactionCard
