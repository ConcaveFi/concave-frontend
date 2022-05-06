import { SubmittedIcon } from '@concave/icons'
import { Button, Flex, Link, Modal, Text } from '@concave/ui'
import { ethers } from 'ethers'
import React from 'react'

export const BondReceiptModal = ({
  receipt,
  isOpen,
  onClose,
}: {
  receipt: ethers.providers.TransactionResponse
  isOpen: boolean
  onClose: () => void
}) => {
  console.log('receipt tx within modal', receipt)
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
        Transaction Submitted <br />
        {/* FIX THIS */}
        <Link
          href={`https://etherscan.io/tx/${receipt?.hash}`}
          fontWeight={400}
          fontSize={'18px'}
          textColor={'Highlight'}
          isExternal
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
