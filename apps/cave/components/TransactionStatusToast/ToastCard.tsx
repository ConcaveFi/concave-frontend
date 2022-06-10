import { useToast, Stack, CloseButton, Card, Link, Text } from '@concave/ui'
import ms from 'ms'

const TransactionStatusToastVariant = {
  info: {
    borderGradient:
      'linear-gradient(41.89deg, #53399B 0.69%, #7DE0FF 38.19%, #504179 72.85%, #84E2FF 100%)',
  },
  success: {
    borderGradient: 'linear-gradient(45deg, #48D89A 50%, #328E5D 10%, #259E59 100%)',
  },
  error: {
    borderGradient: 'linear-gradient(45deg, #A54747 50%, #F79494 40%,red 100%)',
  },
  loading: {
    borderGradient: 'url(/assets/borders/transaction-pending.svg)',
  },
}

interface TransactionStatusToastProps {
  type: keyof typeof TransactionStatusToastVariant
  title: string
  description: string
  link: string
  onClose: () => void
}

const TransactionStatusToast = ({
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

const useTransactionStatusToast = () => {
  const toast = useToast({
    position: 'top-right',
    duration: ms('5s'),
    // render: //TransactionStatusToast,
  })

  toast({
    title: 'Transaction is pending',
    description: 'swapping will be completed shortly',
    status: 'loading',
  })
}
