import { Card, CardProps, CloseButton, Link, RenderProps, Stack, Text, useToast } from '@concave/ui'
import { getTransactionStatusLabel, TrackedTransaction } from 'hooks/TransactionsRegistry'
import { getTxExplorer } from 'lib/getTransactionExplorer'
import ms from 'ms'
import { useCallback } from 'react'

const variants: Record<TrackedTransaction['status'], CardProps> = {
  success: { borderGradient: '#48D89A' },
  error: { borderGradient: '#A54747' },
  pending: {
    borderGradient: `url(/assets/borders/transaction-pending.svg)`,
  },
}

const titles: Record<TrackedTransaction['status'], string> = {
  success: 'Transaction completed',
  error: 'Transaction errored',
  // transaction in queue (you probably messed with the nonce, more info)
  pending: 'Transaction is pending',
}

export const TransactionStatusToast = ({
  meta,
  status,
  hash,
  chainId,
  onClose,
  id,
}: TrackedTransaction & RenderProps) => {
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
      <CloseButton variant="subtle" onClick={onClose} />
    </Card>
  )
}

const makeTransactionStatusToast = (tx: TrackedTransaction) =>
  function TransactionToast({ onClose, id }: RenderProps) {
    return <TransactionStatusToast onClose={onClose} id={id} {...tx} />
  }

/**
  Transaction status toasts are managed by useTransactionRegisty
  you probably don't want to use it directly

  there is no way of styling a toast on the theme (without styling Alert) 
  it seems to be recomended using a custom component
  https://github.com/chakra-ui/chakra-ui/issues/2736#issuecomment-743159129
*/
export const useTransactionStatusToast = () => {
  const toast = useToast({
    position: 'top-right',
    containerStyle: { margin: 8 },
  })

  return useCallback(
    (tx: TrackedTransaction) => {
      /* no idea why, maybe bug on chakra, 
        it's not auto closing when adding two toasts with same id
        tried using tx.hash as the id but toast.close(tx.hash) closes the new one being created
        and shows nothing lol */
      toast.close('pending' + tx.hash)
      toast({
        id: tx.status + tx.hash,
        duration: tx.status === 'pending' ? null : ms('15s'), // don't auto hide while pending
        render: makeTransactionStatusToast(tx),
      })
    },
    [toast],
  )
}
