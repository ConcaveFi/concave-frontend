import { Button, Flex, Link, Modal, Text } from '@concave/ui'
import { SubmittedIcon } from '@concave/icons'
import { ethers } from 'ethers'
import React from 'react'

export const TransactionSubmittedModal = ({
  receipt,
  isOpen,
  onClose,
}: {
  receipt: {
    data: ethers.providers.TransactionReceipt
    error: Error
    loading: boolean
  }
  isOpen: boolean
  onClose: () => void
}) => {
  return (
    <Modal
      bluryOverlay={true}
      title="Confirm Swap"
      isOpen={isOpen}
      onClose={onClose}
      bodyProps={{
        alignItems: 'center',
        shadow: 'Up for Blocks',
      }}
    >
      <SubmittedIcon w={10} mb={5} mt={12} />
      <Text align={'center'} fontSize={'24px'} fontWeight={600}>
        Transaction Submitted
        <Link
          href={`https://etherscan.io/tx/${receipt?.data?.transactionHash}`}
          fontWeight={400}
          fontSize={'18px'}
          textColor={'Highlight'}
        >
          View on Explorer
        </Link>
      </Text>

      <Flex>
        <Button onClick={onClose} variant="secondary" size="large" mt={4} w="180px">
          Close
        </Button>
      </Flex>
    </Modal>
  )
}
