import { useToast, Stack, CloseButton, Card, Link, Text, CardProps } from '@concave/ui'
import ms from 'ms'

type TransactionStatus = 'success' | 'error' | 'pending'

const TransactionStatusToastVariant: Record<TransactionStatus, CardProps> = {
  success: { borderGradient: '#48D89A' },
  error: { borderGradient: '#A54747' },
  pending: {
    borderGradient: `url(/assets/borders/transaction-pending.svg)`,
  },
}

interface TransactionStatusToastProps {
  type: keyof typeof TransactionStatusToastVariant
  title: string
  description: string
  link: string
  onClose: () => void
}

export const TransactionStatusToast = ({
  type,
  title,
  description,
  link,
  onClose,
}: TransactionStatusToastProps) => {
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
      {...TransactionStatusToastVariant[type]}
    >
      <Stack spacing={1}>
        <Text fontSize="lg" fontFamily="heading" fontWeight="bold">
          {title}
        </Text>
        <Text textColor="text.low">{description}</Text>
        <Link isExternal href={link} textColor="text.accent" fontSize="xs">
          View on explorer
        </Link>
      </Stack>
      <CloseButton variant="subtle" onClick={onClose} />
    </Card>
  )
}

/* 
  there is no way of styling a toast on the theme (without styling Alert) 
  it is recomended to use a custom component
  https://github.com/chakra-ui/chakra-ui/issues/2736#issuecomment-743159129
*/
const useTransactionStatusToast = () => {
  const toast = useToast({
    position: 'top-right',
    duration: ms('5s'),
    // render: //TransactionStatusToast,
  })

  return {
    onSuccess: (description: string) => {
      toast({
        title: 'Transaction completed',
        description,
        isClosable: true,
      })
    },
    onError: (description: string) => {
      toast({
        title: 'Transaction errored',
        description,
        isClosable: true,
      })
    },
    onPending: (description: string) => {
      toast({
        title: 'Transaction is pending',
        description,
        isClosable: true,
      })
    },
  }
}
