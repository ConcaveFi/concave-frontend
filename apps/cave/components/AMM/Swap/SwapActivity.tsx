import { Card, Flex, Link, SlideFade, Stack, Text } from '@concave/ui'
import { formatDistance, fromUnixTime } from 'date-fns'
import { commify } from 'ethers/lib/utils'
import { gql, request } from 'graphql-request'
import { getTxExplorer } from 'lib/getTransactionExplorer'
import { useQuery } from 'react-query'
import { formatAddress } from 'utils/formatAddress'

type Amount = { amount: string; symbol: string }
type Activity = {
  type: 'buy' | 'sell'
  bought: Amount
  sold: Amount
  when: number
  by: string
  txHash: string
}

const AmountText = ({ value }: { value: Amount }) => (
  <Text
    w="100px"
    maxW="100px"
    textAlign="center"
    fontWeight="bold"
    color="text.high"
    fontSize="sm"
    noOfLines={1}
  >
    {commify((+value.amount).toFixed(2))} {value.symbol}
  </Text>
)

const ActivityRow = ({ type, bought, sold, when, by, txHash }: Activity) => {
  const isBuy = type === 'buy'
  return (
    <Link
      href={getTxExplorer(txHash, 1)}
      isExternal
      py={2}
      rounded="lg"
      _hover={{ textDecoration: 'none', bg: 'blackAlpha.200' }}
    >
      <Flex gap={3} fontSize="sm" justify="space-around">
        <Text
          fontSize="sm"
          w="50px"
          textAlign="center"
          fontWeight="bold"
          color={isBuy ? 'green.300' : 'red.300'}
        >
          {isBuy ? 'Buy' : 'Sell'}
        </Text>
        <AmountText value={bought} />
        <AmountText value={sold} />
        <Text fontSize="sm" fontWeight="medium" color="text.low" w="124px" textAlign="center">
          {formatDistance(fromUnixTime(when), Date.now(), { addSuffix: true })}
        </Text>
      </Flex>
    </Link>
  )
}

const AMM_ACTIVITY_QUERY = gql`
  query GET_TX_GEMSWAP {
    logAmm(limit: 20, order_by: { txBlockNumber: desc }, where: { txHash: { _neq: "null" } }) {
      txHash
      timestamp
      type
      sellCNVAmount
      sellGetDAIAmount
      buyGetCNVAmount
      buyInDaiAmount
      from
    }
  }
`

export const SwapActivity = () => {
  const { data, isSuccess } = useQuery(['amm activity'], () =>
    request('https://concave.hasura.app/v1/graphql', AMM_ACTIVITY_QUERY),
  )
  return (
    <Card
      as={SlideFade}
      in={isSuccess}
      variant="secondary"
      maxH="230px"
      w="full"
      borderGradient="secondary"
      px={5}
      py={3}
    >
      <Stack overflowY="scroll" gap={0} spacing={0} w="full" apply="scrollbar.big">
        <Flex gap={3} textAlign="center" justify="space-around" fontWeight="bold" color="text.low">
          <Text fontSize="sm" w="50px">
            Type
          </Text>
          <Text fontSize="sm" w="100px">
            CNV Amount
          </Text>
          <Text fontSize="sm" w="100px">
            DAI Amount
          </Text>
          <Text fontSize="sm" w="124px">
            Date
          </Text>
        </Flex>
        {isSuccess &&
          data.logAmm.map(
            ({
              from,
              type,
              buyGetCNVAmount,
              buyInDaiAmount,
              sellCNVAmount,
              sellGetDAIAmount,
              timestamp,
              txHash,
            }) => (
              <ActivityRow
                key={txHash}
                txHash={txHash}
                type={type}
                sold={{
                  symbol: 'DAI',
                  amount: type === 'buy' ? buyInDaiAmount : sellGetDAIAmount,
                }}
                bought={{
                  symbol: 'CNV',
                  amount: type === 'buy' ? buyGetCNVAmount : sellCNVAmount,
                }}
                when={timestamp}
                by={formatAddress(from)}
              />
            ),
          )}
      </Stack>
    </Card>
  )
}
