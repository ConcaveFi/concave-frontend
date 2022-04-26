import { SpinIcon, SubmittedIcon } from '@concave/icons'
import { Button, Flex, keyframes, Link, Modal, Text, UseDisclosureReturn } from '@concave/ui'
import React, { useMemo } from 'react'
import { useNetwork, useWaitForTransaction } from 'wagmi'

type TransactionStatusProps = {
  title: string
  label: string
  hash: string
  disclosure: UseDisclosureReturn
  onClose: () => void
}

export const TransactionSubmittedModal = ({
  title,
  label,
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
      return (
        <WaitingWalletContent disclosure={disclosure} onClose={onClose} hash={hash} label={label} />
      )
    }
    if (swapReceipt.loading) {
      return (
        <WaitingBlockContent disclosure={disclosure} onClose={onClose} hash={hash} label={label} />
      )
    }
    return <ConfirmContent disclosure={disclosure} hash={hash} onClose={onClose} />
  }, [disclosure, hash, label, onClose, swapReceipt.loading])

  return (
    <Modal
      bluryOverlay={true}
      title={title}
      isOpen={disclosure.isOpen}
      onClose={disclosure.onClose}
      bodyProps={{
        h: '350px',
        p: 12,
        pt: 16,
        justifyContent: 'space-between',
        alignItems: 'center',
        shadow: 'Up for Blocks',
      }}
    >
      {content}
    </Modal>
  )
}

export const ConfirmContent = ({
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
  const subdomain = chain?.id === 1 ? '' : chain?.name + '.'
  const url = `https://${subdomain}etherscan.io/tx/${hash}`

  return (
    <>
      <SubmittedIcon w={10} />
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

export const WaitingWalletContent = ({
  hash,
  disclosure,
  label,
  onClose,
}: {
  label: string
  hash: string
  disclosure: UseDisclosureReturn
  onClose: () => void
}) => {
  const [
    {
      data: { chain },
    },
  ] = useNetwork()

  return (
    <>
      {' '}
      <SpinIcon __css={spinnerStyles} w={10} />
      <Text fontSize="lg" fontWeight="medium">
        Waiting For Confirmation
      </Text>
      <Text fontSize="md" textColor="Highlight">
        {label}
      </Text>
      <Link href={'url'} fontWeight={400} fontSize={'18px'} textColor={'Highlight'} isExternal>
        Confirm this transaction in your wallet
      </Link>
      <Flex>
        <Button
          mt={4}
          onClick={() => {
            disclosure.onClose()
            onClose()
          }}
          variant="secondary"
          size="large"
          w="180px"
        >
          Close
        </Button>
      </Flex>
    </>
  )
}

export const WaitingBlockContent = ({
  hash,
  disclosure,
  label,
  onClose,
}: {
  label: string
  hash: string
  disclosure: UseDisclosureReturn
  onClose: () => void
}) => {
  const [
    {
      data: { chain },
    },
  ] = useNetwork()
  const subdomain = chain?.id === 1 ? '' : chain?.name + '.'
  const url = `https://${subdomain}etherscan.io/tx/${hash}`

  return (
    <>
      <SpinIcon __css={spinnerStyles} w={10} />
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
