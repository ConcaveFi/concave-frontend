import { useToast, Stack, CloseButton, Card, Link, Text, CardProps, RenderProps } from '@concave/ui'
import { getTransactionStatusLabel, TrackedTransaction } from 'hooks/useTransactionRegistry'
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
      key={id}
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

/* 
  there is no way of styling a toast on the theme (without styling Alert) 
  it seems to be recomended using a custom component
  https://github.com/chakra-ui/chakra-ui/issues/2736#issuecomment-743159129
*/
export const useTransactionStatusToast = () => {
  const toast = useToast({
    position: 'top-right',
    duration: ms('15s'),
  })

  return useCallback(
    (tx: TrackedTransaction) => {
      toast({
        id: tx.hash,
        render: makeTransactionStatusToast(tx),
      })
    },
    [toast],
  )
}
