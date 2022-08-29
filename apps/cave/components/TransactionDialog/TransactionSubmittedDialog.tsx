import { SubmittedIcon } from '@concave/icons'
import { Button, Link, Modal, Text } from '@concave/ui'
import { Transaction } from 'ethers'
import { getTxExplorer } from 'lib/getTransactionExplorer'
import { ReactNode, useEffect, useState } from 'react'
import { useNetwork } from 'wagmi'

const TxSubmitted = ({ title, tx }: { title: string; tx: Transaction }) => {
  const { chain } = useNetwork()
  return (
    <>
      <SubmittedIcon w={10} my={4} />
      <Text align="center" fontSize="md" fontWeight="bold">
        {title || `Transaction Submitted`} <br />
        <Link href={getTxExplorer(tx.hash, chain.id)} fontSize="sm" color="text.accent" isExternal>
          View on explorer
        </Link>
      </Text>
    </>
  )
}

type TransactionSubmittedDialogProps = {
  title?: string
  subtitle?: string
  tx: Transaction
  isOpen: boolean
  closeParentComponent?: VoidFunction
  children?: ReactNode
}

export const TransactionSubmittedDialog: React.FC<TransactionSubmittedDialogProps> = ({
  title,
  subtitle,
  tx,
  isOpen: isOpenProp,
  closeParentComponent,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(isOpenProp)

  useEffect(() => {
    setIsOpen(isOpenProp)
  }, [isOpenProp])

  const onClose = () => {
    setIsOpen(false)
    if (closeParentComponent) closeParentComponent()
  }
  return (
    <Modal
      bluryOverlay={true}
      title={title || 'Tx Submitted'}
      isOpen={isOpen}
      onClose={onClose}
      bodyProps={{ align: 'center', w: '300px', gap: 4 }}
    >
      <TxSubmitted title={subtitle} tx={tx} />
      {children}
      <Button onClick={onClose} variant="secondary" size="large" w="180px">
        Close
      </Button>
    </Modal>
  )
}

export default TransactionSubmittedDialog
