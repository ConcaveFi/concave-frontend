import { CheckIcon, CloseIcon, SpinnerIcon } from '@concave/icons'
import { Flex, keyframes, Link, Text, useDisclosure } from '@concave/ui'
import SecondConfirmModal from 'components/SecondConfirmModal'
import { commify, formatUnits } from 'ethers/lib/utils'
import { useIsMounted } from 'hooks/useIsMounted'
import {
  getRecentTransactions,
  RecentTransaction,
  useRecentTransactions,
} from 'hooks/useRecentTransactions'
import { useWaitForTransaction } from 'wagmi'

export default function RecentTransactionsContainer() {
  const { data: recentTransactions, clearRecentTransactions } = useRecentTransactions()

  const { isOpen: isDialogOpen, onOpen: onOpenDialog, onClose: onCloseDialog } = useDisclosure()

  const hasRecentTransactions = recentTransactions.size > 0

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
        {hasRecentTransactions && (
          <Text
            cursor={'pointer'}
            onClick={onOpenDialog}
            fontWeight={'700'}
            fontSize="md"
            textColor={'text.low'}
          >
            Clear all
          </Text>
        )}
      </Flex>

      {/* Confimation Modal --------------- */}
      <SecondConfirmModal
        onConfirm={() => {
          clearRecentTransactions()
          onCloseDialog()
        }}
        onClose={onCloseDialog}
        title="You are sure?"
        isOpen={isDialogOpen}
      >
        <Flex
          m={4}
          width={'300px'}
          justify="center"
          height="90%"
          shadow={'Down Medium'}
          rounded="2xl"
        >
          <Flex mt={6} maxW={'240px'} direction="column" justify={'space-between'}>
            <Text fontSize={'16px'} textAlign="center" textColor={'text.low'} fontWeight="bold">
              If you confirm all your recents transactions will be cleared from your localstorage
            </Text>
            <Text textColor={'text.low'} opacity={0.6} textAlign="center" mb={2} fontWeight="bold">
              This action can not be reverted
            </Text>
          </Flex>
        </Flex>
      </SecondConfirmModal>
      {/* -------------------------- */}

      {hasRecentTransactions && (
        <Flex
          direction={'column'}
          mt={3}
          gap={1}
          maxH="98px"
          overflowY={'auto'}
          overflowX="hidden"
          apply="border.secondary"
          __css={scroll}
        >
          {Array.from(recentTransactions).map((value, index) => (
            <TransactionInfo key={index} recentTransaction={value[1]} />
          ))}
        </Flex>
      )}
    </Flex>
  )
}

const TransactionInfo = ({ recentTransaction }: { recentTransaction: RecentTransaction }) => {
  const { type, amount, amountTokenName, purchaseTokenName, transaction, purchase, stakePool } =
    recentTransaction
  const [{ data: txData, loading, error }] = useWaitForTransaction({ hash: transaction.hash })

  const recentTxs = useRecentTransactions()
  // const tx = recentTxs.data.get(transaction.hash)
  const isMounted = useIsMounted()
  const tx = isMounted && getRecentTransactions().get(transaction.hash)

  const info =
    type === 'Stake'
      ? `${commify(amount)} ${amountTokenName} staked in ${stakePool} Position`
      : type === 'Bond'
      ? `${commify(amount)} ${amountTokenName} bonded for ${commify(purchase)} ${purchaseTokenName}`
      : `${commify(amount)} ${amountTokenName} swaped for ${
          purchase > 100 ? commify(purchase) : purchase
        } ${purchaseTokenName}`

  return (
    <Flex justify={'space-between'}>
      <Flex fontWeight={'bold'} gap={1} align="center">
        <Text>{recentTransaction.type}</Text>
        <Link
          isExternal
          href={`https://RINKEBY.etherscan.io/tx/${transaction.hash}`}
          fontSize={'14px'}
          textColor={'text.low'}
        >
          {info + ' ->'}
        </Link>
      </Flex>
      {/* Status 0 = Fail  */}
      {/* Status 1 = Success  */}
      {tx?.status === 'error' && (
        <CloseIcon width={'12px'} height="12px" color={'red.300'} justifySelf="end" />
      )}
      {!tx?.status && (
        <SpinnerIcon
          animation={`${spin} 3s linear infinite`}
          color={'text.low'}
          justifySelf="end"
        />
      )}
      {tx?.status === 'success' && <CheckIcon color={'green.300'} justifySelf="end" />}
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
    // boxShadow: 'inset 0 0 10px 10px',
    // color: 'green.300',
    border: 'solid 4px transparent',
    rounded: '2xl',
  },

  '::-webkit-scrollbar-thumb': {
    border: 'solid 3px transparent',
    boxShadow: 'inset 0 0 10px 10px #74bae8',
    rounded: 'full',
  },
}
