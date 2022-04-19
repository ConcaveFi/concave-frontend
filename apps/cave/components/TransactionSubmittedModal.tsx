import { SpinIcon, SubmittedIcon } from '@concave/icons'
import { Button, Flex, keyframes, Link, Modal, Text, UseDisclosureReturn } from '@concave/ui'
import React from 'react'
import { useWaitForTransaction } from 'wagmi'

type TransactionStatusProps = {
  hash: string
  disclosure: UseDisclosureReturn
  onClose: () => void
}

export const TransactionSubmittedModal = ({
  hash,
  disclosure,
  onClose,
}: TransactionStatusProps) => {
  const [swapReceipt] = useWaitForTransaction({
    hash: hash,
    skip: !hash,
  })

  return (
    <Modal
      bluryOverlay={true}
      title="Confirm Swap"
      isOpen={disclosure.isOpen}
      onClose={disclosure.onClose}
      bodyProps={{
        alignItems: 'center',
        shadow: 'Up for Blocks',
      }}
    >
      {swapReceipt.loading ? (
        <WaitingContent disclosure={disclosure} hash={hash} label="Add liquidity" />
      ) : (
        <ConfirmContent disclosure={disclosure} hash={hash} onClose={onClose} />
      )}
    </Modal>
  )
}

const ConfirmContent = ({
  hash,
  disclosure,
  onClose,
}: {
  hash: string
  disclosure: UseDisclosureReturn
  onClose: () => void
}) => {
  return (
    <>
      <SubmittedIcon w={10} mb={5} mt={12} />
      <Text align={'center'} fontSize={'24px'} fontWeight={600}>
        Transaction Submitted <br />
        <Link
          href={`https://etherscan.io/tx/${hash}`}
          fontWeight={400}
          fontSize={'18px'}
          textColor={'Highlight'}
          isExternal
        >
          View on Explorer
        </Link>
      </Text>

      <Flex>
        <Button
          onClick={() => {
            disclosure.onClose()
            onClose()
          }}
          variant="secondary"
          size="large"
          mt={4}
          w="180px"
        >
          Close
        </Button>
      </Flex>
    </>
  )
}

const WaitingContent = ({
  hash,
  disclosure,
  label,
}: {
  label: string
  hash: string
  disclosure: UseDisclosureReturn
}) => {
  return (
    <>
      {' '}
      <SpinIcon __css={spinnerStyles} w={10} mb={5} mt={12} />
      <Text fontSize="lg" fontWeight="medium">
        Waiting For Confirmation
      </Text>
      <Text fontSize="md" textColor="Highlight">
        {label}
      </Text>
      <Link
        href={`https://etherscan.io/tx/${hash}`}
        my={5}
        fontWeight="semibold"
        textColor="#5F7A99"
        fontSize="md"
        isExternal
      >
        Confirm this transaction in your wallet
      </Link>
      <Flex>
        <Button onClick={disclosure.onClose} variant="secondary" size="large" w="180px">
          Close
        </Button>
      </Flex>
    </>
  )
}

const spin = keyframes({
  '0%': {
    transform: 'rotate(0deg)',
  },
  '100%': {
    transform: 'rotate(360deg)',
  },
})

const spinnerStyles = {
  animation: `${spin} 2s linear infinite`,
}
