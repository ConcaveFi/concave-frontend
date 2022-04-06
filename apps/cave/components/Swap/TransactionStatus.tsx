import { Button, Flex, Link } from '@chakra-ui/react'
import { keyframes } from '@chakra-ui/system'
import { SpinIcon } from '@concave/icons'
import { Modal, Text } from '@concave/ui'
import React from 'react'
import { ethers } from 'ethers'

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

export const TransactionStatusModal = ({
  status,
  inAmount,
  inSymbol,
  outAmount,
  outSymbol,
  isOpen,
  onClose,
}: {
  status: {
    data: ethers.providers.TransactionResponse
    error: Error
    loading: boolean
  }
  inAmount: string
  inSymbol: string
  outAmount: string
  outSymbol: string
  isOpen: boolean
  onClose: () => void
}) => {
  return (
    <Modal
      bluryOverlay={true}
      title="Transaction Status"
      isOpen={isOpen}
      onClose={onClose}
      bodyProps={{ alignItems: 'center', gap: 1 }}
    >
      <SpinIcon __css={spinnerStyles} w={10} mb={5} mt={12} />
      <Text fontSize="lg" fontWeight="medium">
        Waiting For Confirmation
      </Text>
      <Text fontSize="md" textColor="Highlight">
        Swaping {inAmount} {inSymbol} for {outAmount} {outSymbol}
      </Text>
      <Link
        href={`https://etherscan.io/tx/${status?.data?.hash}`}
        my={5}
        fontWeight="semibold"
        textColor="#5F7A99"
        fontSize="md"
        isExternal
      >
        Confirm this transaction in your wallet
      </Link>
      <Flex>
        <Button onClick={onClose} variant="secondary" size="large" w="180px">
          Close
        </Button>
      </Flex>
    </Modal>
  )
}
