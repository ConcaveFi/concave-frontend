import { CheckIcon, CloseIcon, SpinnerIcon } from '@concave/icons'
import { Flex, keyframes, Link, Text } from '@concave/ui'
import {
  getTransactionStatusLabel,
  TrackedTransaction,
  useTransactionRegistry,
} from 'hooks/TransactionsRegistry'
import { getTxExplorer } from 'lib/getTransactionExplorer'

export default function RecentTransactionsContainer() {
  const { recentTransactions } = useTransactionRegistry()
  const hasRecentTransactions = recentTransactions.length > 0

  return (
    <Flex flex={1} direction={'column'} mt={8} mb={4}>
      <Flex
        justify={hasRecentTransactions ? 'space-between' : 'center'}
        align={hasRecentTransactions ? 'start' : 'center'}
        height={hasRecentTransactions ? '20px' : '40px'}
      >
        <Text fontWeight={'700'} fontSize="md" textColor={'text.low'}>
          {hasRecentTransactions ? 'Recent Transactions:' : 'You do not have recent transactions.'}
        </Text>
      </Flex>
      {hasRecentTransactions && (
        <Flex
          direction={'column'}
          mt={3}
          maxH="128px"
          pr={2}
          mr={-4}
          overflowY={'auto'}
          overflowX="hidden"
          apply="border.secondary"
          __css={scroll}
        >
          {recentTransactions.map((tx) => (
            <TransactionInfo key={tx.hash} {...tx} />
          ))}
        </Flex>
      )}
    </Flex>
  )
}

const TransactionInfo = ({ meta, status, chainId, hash }: TrackedTransaction) => {
  return (
    <Flex justify="space-between" align="center" gap={1} mb={2}>
      <Flex fontSize="sm" fontWeight="bold" direction="column">
        <Text textTransform="capitalize">{meta?.type}</Text>
        <Link isExternal href={getTxExplorer(hash, chainId)} textColor={'text.low'}>
          {getTransactionStatusLabel({ status, meta })}
        </Link>
      </Flex>
      {status === 'error' && (
        <CloseIcon width={'15px'} height="15px" color={'red.300'} justifySelf="end" />
      )}
      {status === 'pending' && (
        <SpinnerIcon
          animation={`${spin} 3s linear infinite`}
          color={'text.low'}
          justifySelf="end"
        />
      )}
      {status === 'success' && (
        <CheckIcon width={'17px'} height="17px" color={'green.300'} justifySelf="end" />
      )}
    </Flex>
  )
}

const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
})

const scroll = {
  '::-webkit-scrollbar': {
    width: '12px',
  },

  '::-webkit-scrollbar-track': {
    border: 'solid 4px transparent',
    rounded: '2xl',
  },

  '::-webkit-scrollbar-thumb': {
    border: 'solid 3px transparent',
    boxShadow: 'inset 0 0 10px 10px #74bae8',
    rounded: 'full',
  },
}
