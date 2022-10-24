import { Card, Flex, Link, Stack, Text } from '@concave/ui'
import { formatDistance, fromUnixTime } from 'date-fns'
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
    textAlign="center"
    fontWeight="bold"
    color="text.high"
    fontSize="sm"
    noOfLines={1}
  >
    {value.amount} {value.symbol}
  </Text>
)

const ActivityRow = ({ type, bought, sold, when, by, txHash }: Activity) => {
  const isBuy = type === 'buy'
  return (
    <Link href={getTxExplorer(txHash, 1)}>
      <Flex gap={3} fontSize="sm" _hover={{ color: 'text.high' }}>
        <AmountText value={isBuy ? bought : sold} />
        <Text
          fontSize="sm"
          w="40px"
          textAlign="center"
          fontWeight="bold"
          color={isBuy ? 'green.300' : 'red.300'}
        >
          {isBuy ? 'bought' : 'sold'}
        </Text>
        <Text fontSize="sm" w="30px" textAlign="center" fontWeight="medium" color="text.low">
          {isBuy ? 'with' : 'for'}
        </Text>
        <AmountText value={isBuy ? sold : bought} />
        <Text fontSize="sm" textAlign="center" fontWeight="medium" color="text.low">
          by {by}
        </Text>
        <Text fontSize="sm" fontWeight="medium" color="text.low">
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

export const SwapActivity = (props) => {
  const { data, isSuccess } = useQuery(['amm activity'], () =>
    request('https://concave.hasura.app/v1/graphql', AMM_ACTIVITY_QUERY),
  )
  return (
    isSuccess && (
      <Card variant="secondary" maxH="200px" borderGradient="secondary" px={5} py={3}>
        <Stack overflowY="scroll" gap={1} w="full">
          {data.logAmm.map(
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
                bought={{ symbol: 'CNV', amount: type === 'buy' ? buyGetCNVAmount : sellCNVAmount }}
                when={timestamp}
                by={formatAddress(from)}
              />
            ),
          )}
        </Stack>
      </Card>
    )
  )
}
