import { SubmittedIcon } from '@concave/icons'
import { Button, Flex, Link, Modal, Text } from '@concave/ui'
import { Transaction } from 'ethers'
import { ChainId } from 'gemswap-sdk'
import { useState, useEffect } from 'react'

export const getTxExplorer = (tx: Transaction) => {
  const { hash, chainId } = tx
  const explorer = {
    [ChainId.ETHEREUM]: `https://etherscan.io/tx/${hash}`,
    [ChainId.ROPSTEN]: `https://ropsten.etherscan.io/tx/${hash}`,
  }
  return explorer[chainId]
}

const TransactionSubmitted = ({ tx, onClose }: { tx: Transaction; onClose: () => void }) => (
  <>
    <SubmittedIcon w={10} my={6} />
    <Text align="center" fontSize="md" fontWeight="bold">
      Transaction Submitted <br />
      <Link href={getTxExplorer(tx)} fontSize="sm" color="text.accent" isExternal>
        View on Explorer
      </Link>
    </Text>

    <Flex>
      <Button onClick={onClose} variant="secondary" size="large" mt={4} w="180px">
        Close
      </Button>
    </Flex>
  </>
)

export const TransactionSubmittedDialog = ({
  tx,
  isOpen: isOpenProp,
}: {
  tx: Transaction
  isOpen: boolean
}) => {
  const [isOpen, setIsOpen] = useState(isOpenProp)
  useEffect(() => {
    setIsOpen(isOpenProp)
  }, [isOpenProp])
  const onClose = () => setIsOpen(false)
  return (
    <Modal
      bluryOverlay={true}
      title="Success"
      isOpen={isOpen}
      onClose={onClose}
      bodyProps={{ align: 'center', w: '300px' }}
    >
      <TransactionSubmitted tx={tx} onClose={onClose} />
    </Modal>
  )
}
