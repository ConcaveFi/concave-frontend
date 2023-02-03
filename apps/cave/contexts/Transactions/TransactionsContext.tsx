import { PropsWithChildren } from 'react'
import { Card, CardProps, CloseButton, keyframes, Link, Stack, Text } from '@concave/ui'
import {
  createTransactionsStore,
  StoredTransaction,
  ToastsViewport,
  TransactionsStoreProvider,
  TransactionStatusToastProps,
} from '@pcnv/txs-react'
import { getTxExplorer } from 'lib/getTransactionExplorer'

import { getTransactionStatusLabel, TransactionMeta } from './getTransactionStatusLabel'

const transactionsStore = createTransactionsStore()

const variants: Record<StoredTransaction['status'], CardProps> = {
  confirmed: { borderGradient: '#48D89A' },
  failed: { borderGradient: '#A54747' },
  pending: {
    borderGradient: `url(/assets/borders/transaction-pending.svg)`,
  },
}

const titles: Record<StoredTransaction['status'], string> = {
  confirmed: 'Transaction completed',
  failed: 'Transaction errored',
  pending: 'Transaction is pending',
}

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const TransactionStatusToast = ({
  transaction: { hash, chainId, meta, status },
  dismiss,
  rootProps,
}: TransactionStatusToastProps<TransactionMeta>) => {
  return (
    <Card
      minW="300px"
      shadow="Glass Up Medium"
      variant="secondary"
      fontSize="sm"
      fontWeight="semibold"
      px={4}
      py={3}
      direction="row"
      justify="space-between"
      {...variants[status]}
      sx={{
        '&[data-part="root"]': {
          animation: `${fadeIn} 0.5s ease-in-out`,
        },
        '&[data-part="root"]:not([data-open])': {
          animation: `${fadeIn} 0.5s ease-in-out reverse`,
        },
      }}
      {...(rootProps as any)} // TODO: Fix Card types
    >
      <Stack spacing={1}>
        <Text fontSize="lg" fontFamily="heading" fontWeight="bold">
          {titles[status]}
        </Text>
        <Text textColor="text.low">{getTransactionStatusLabel({ meta, status })}</Text>
        <Link isExternal href={getTxExplorer(hash, chainId)} textColor="text.accent" fontSize="xs">
          View on explorer
        </Link>
      </Stack>
      <CloseButton variant="subtle" onClick={dismiss} />
    </Card>
  )
}

export const TransactionsContext = ({ children }: PropsWithChildren) => {
  return (
    <TransactionsStoreProvider store={transactionsStore}>
      <ToastsViewport TransactionStatusComponent={TransactionStatusToast} placement="top-end" />
      {children}
    </TransactionsStoreProvider>
  )
}
