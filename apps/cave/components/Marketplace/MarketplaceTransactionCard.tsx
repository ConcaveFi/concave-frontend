import { TransactionIcon } from '@concave/icons'
import { Box, Flex, HStack, Image, Link, Text, VStack } from '@concave/ui'
import { format } from 'date-fns'
// import fromUnixTime from 'date-fns/fromUnixTime'

interface MarketplaceTransactionCardProps {
  type: 'sale' | 'listing'
  filter?: any
}

const MarketplaceTransactionCard = (props: MarketplaceTransactionCardProps) => {
  const { filter, type } = props
  // const unixTime = fromUnixTime(filter.date);
  // const cleanDate =  format(new Date(unixTime), 'PPpp');
  const cleanDate = format(new Date(filter.date), 'PPpp')
  const labelType = type === 'sale' ? 'sale' : 'listing'
  const labelColor = type === 'sale' ? '#7AF0CD' : '#2E97E2'
  return (
    <Flex width={'full'} height="100" rounded="2xl" mb={2} shadow="up">
      <Flex direction={'column'} width={'83px'} justify="end">
        <VStack height={'full'} mt={2}>
          <Text position={'absolute'} fontWeight={700} textColor={labelColor}>
            {labelType}
          </Text>
        </VStack>
        <Image sizes="100%" src={'/assets/marketplace/3mposition.png'} alt="position" />
      </Flex>
      <Flex
        flex={1}
        height="full"
        direction={'column'}
        textAlign="center"
        textColor={'text.low'}
        ml={'1'}
        align="start"
        justify={'space-between'}
        alignItems="start"
        fontSize={14}
      >
        <Text pt={1}>Mar 4, 2022, 2:33:24 PM</Text>
        <Flex direction={'column'}>
          <Flex alignItems={'end'} width={'full'}>
            <Text fontSize={14} textColor={'white'} fontWeight="700">
              3Month
            </Text>
            <Text pl={1}> positions is</Text>
          </Flex>
          <Flex alignItems={'end'} width={'full'}>
            <Text> listed at</Text>
            <Text pl={1} fontSize={14} textColor={'white'} fontWeight="700">
              700 CNV
            </Text>
          </Flex>
        </Flex>
        <Flex width={'full'} mt={1} justify={'start'}>
          <Link
            pb={1}
            href={`https://etherscan.io/tx/${filter.link}`}
            target="_blank"
            rel="noreferrer"
            textColor={'#2E97E2'}
            textDecoration="underline"
          >
            Transaction
          </Link>
          <TransactionIcon ml={2} mt={'6px'} viewBox="0 0 30 30" />
        </Flex>
      </Flex>
    </Flex>
    // <Box mx="auto" py={5} w="auto" h="auto" shadow="down" borderRadius="16px">
    //   <HStack>
    //     <VStack>
    //       <Box>
    //         <Text color="blue.400" as="b">
    //           {filter.event}
    //         </Text>
    //       </Box>
    //       <Image h="70px" w="70px" src={'/assets/marketplace/1mposition.png'} alt={filter.date} />
    //     </VStack>

    //     <VStack>
    //       <Box>
    //         <Text fontSize="xs" color="text.low" fontWeight="medium">
    //           {cleanDate}
    //         </Text>
    //       </Box>
    //       <Box>
    //         <Text as="b">{`${filter.length} `}</Text>
    //         <Text fontSize="s" color="text.low" fontWeight="light">
    //           {`position of `}
    //         </Text>
    //         <Text as="b">{`${filter.cnv} CNV`}</Text>
    //       </Box>
    //       <Flex>
    //         <Box>
    //           <a href={`https://etherscan.io/tx/${filter.link}`} target="_blank" rel="noreferrer">
    //             <Text color="blue.400" as="u">
    //               Transaction
    //             </Text>
    //             <TransactionIcon viewBox="0 0 30 30" />
    //           </a>
    //         </Box>
    //       </Flex>
    //     </VStack>
    //   </HStack>
    // </Box>
  )
}
export default MarketplaceTransactionCard
