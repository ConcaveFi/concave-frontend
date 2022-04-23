import { SpinIcon, SubmittedIcon } from '@concave/icons'
import { Button, Flex, keyframes, Link, Modal, Text, UseDisclosureReturn } from '@concave/ui'
import React, { useMemo } from 'react'
import { useNetwork, useWaitForTransaction } from 'wagmi'

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
  const content = useMemo(() => {
    if (!hash) {
      return <WaitingWalletContent disclosure={disclosure} hash={hash} label="Add liquidity" />
    }
    if (swapReceipt.loading) {
      return <WaitingBlockContent disclosure={disclosure} hash={hash} label="Add liquidity" />
    }
    return <ConfirmContent disclosure={disclosure} hash={hash} onClose={onClose} />
  }, [disclosure, hash, onClose, swapReceipt.loading])

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
      {content}
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
  const [
    {
      data: { chain },
    },
  ] = useNetwork()
  const subdomain = chain.id === 1 ? '' : chain.name + '.'
  const url = `https://${subdomain}etherscan.io/tx/${hash}`

  return (
    <>
      <SubmittedIcon w={10} mb={5} mt={12} />
      <Text align={'center'} fontSize={'24px'} fontWeight={600}>
        Transaction Submitted <br />
        <Link href={url} fontWeight={400} fontSize={'18px'} textColor={'Highlight'} isExternal>
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

const WaitingWalletContent = ({
  hash,
  disclosure,
  label,
}: {
  label: string
  hash: string
  disclosure: UseDisclosureReturn
}) => {
  const [
    {
      data: { chain },
    },
  ] = useNetwork()
  const subdomain = chain.id === 1 ? '' : chain.name + '.'
  const url = `https://${subdomain}etherscan.io/tx/${hash}`

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
      <Link href={url} my={5} fontWeight="semibold" textColor="#5F7A99" fontSize="md" isExternal>
        Confirm this transaction in your wallet
      </Link>
      <Flex>
        <Button mt={4} onClick={disclosure.onClose} variant="secondary" size="large" w="180px">
          Close
        </Button>
      </Flex>
    </>
  )
}

const WaitingBlockContent = ({
  hash,
  disclosure,
  label,
}: {
  label: string
  hash: string
  disclosure: UseDisclosureReturn
}) => {
  const [
    {
      data: { chain },
    },
  ] = useNetwork()
  const subdomain = chain.id === 1 ? '' : chain.name + '.'
  const url = `https://${subdomain}etherscan.io/tx/${hash}`

  return (
    <>
      <SpinIcon __css={spinnerStyles} w={10} mb={5} mt={12} />
      <Text fontSize="lg" fontWeight="medium">
        Waiting For Block Confirmation
      </Text>
      <Link href={url} fontWeight={400} fontSize={'18px'} textColor={'Highlight'} isExternal>
        View on Explorer
      </Link>
      <Flex>
        <Button mt={4} onClick={disclosure.onClose} variant="secondary" size="large" w="180px">
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
