import { CHAIN_NAME } from '@concave/core'
import { CheckIcon, CloseIcon, SpinnerIcon } from '@concave/icons'
import { Flex, keyframes, Link, Text, useDisclosure } from '@concave/ui'
import SecondConfirmModal from 'components/SecondConfirmModal'
import { getTxExplorer } from 'lib/getTransactionExplorer'
import {
  getTransactionStatusLabel,
  TrackedTransaction,
  useTransactionRegistry,
} from 'hooks/useTransactionRegistry'
import { useAccount } from 'wagmi'

export default function RecentTransactionsContainer() {
  const { lastTransactions } = useTransactionRegistry()
  // const { data: recentTransactions, clearRecentTransactions } = useRecentTransactions()

  // const { isOpen: isDialogOpen, onOpen: onOpenDialog, onClose: onCloseDialog } = useDisclosure()

  const { data: account } = useAccount()
  const hasRecentTransactions = lastTransactions.length > 0

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
        {/* {hasRecentTransactions && (
          <Text
            cursor={'pointer'}
            onClick={onOpenDialog}
            fontWeight={'700'}
            fontSize="md"
            textColor={'text.low'}
          >
            Clear all
          </Text>
        )} */}
      </Flex>

      {/* Confimation Modal --------------- */}
      {/* <SecondConfirmModal
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
      </SecondConfirmModal> */}
      {/* -------------------------- */}

      {hasRecentTransactions && (
        <Flex
          direction={'column'}
          mt={3}
          gap={1}
          maxH="98px"
          pr={2}
          overflowY={'auto'}
          overflowX="hidden"
          apply="border.secondary"
          __css={scroll}
        >
          {lastTransactions.map((tx) => (
            <TransactionInfo key={tx.hash} {...tx} />
          ))}
        </Flex>
      )}
    </Flex>
  )
}

const TransactionInfo = ({ meta, status, chainId, hash }: TrackedTransaction) => {
  return (
    <Flex justify={'space-between'}>
      <Flex fontWeight={'bold'} gap={1} align="center">
        <Text autoCapitalize="">{meta.type}</Text>
        <Link isExternal href={getTxExplorer(hash, chainId)} fontSize="sm" textColor={'text.low'}>
          {getTransactionStatusLabel({ status, meta })}
        </Link>
      </Flex>
      <Flex width={'17px'}>
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
