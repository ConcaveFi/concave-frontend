import { ChainId } from '@concave/gemswap-sdk'
import { SubmittedIcon } from '@concave/icons'
import { Button, Flex, Link, Modal, Text } from '@concave/ui'
import { Transaction } from 'ethers'
import { useEffect, useState } from 'react'
import { useNetwork } from 'wagmi'

export const getTxExplorer = (tx: Transaction, chain: { id: number }) => {
  const { hash, chainId } = tx
  const explorer = {
    [ChainId.ETHEREUM]: `https://etherscan.io/tx/${hash}`,
    [ChainId.ROPSTEN]: `https://ropsten.etherscan.io/tx/${hash}`,
  }
  return explorer[chainId || chain?.id]
}

const TxSubmitted = ({
  title,
  tx,
  onClose,
}: {
  title: string
  tx: Transaction
  onClose: () => void
}) => {
  const [
    {
      data: { chain },
    },
  ] = useNetwork()
  return (
    <>
      <SubmittedIcon w={10} my={6} />
      <Text align="center" fontSize="md" fontWeight="bold">
        {title || `Transaction Submitted`} <br />
        <Link href={getTxExplorer(tx, chain)} fontSize="sm" color="text.accent" isExternal>
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
}

export const TransactionSubmittedDialog = ({
  title,
  subtitle,
  tx,
  isOpen: isOpenProp,
}: {
  title?: string
  subtitle?: string
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
      title={title || 'Success'}
      isOpen={isOpen}
      onClose={onClose}
      bodyProps={{ align: 'center', w: '300px' }}
    >
      <TxSubmitted title={subtitle} tx={tx} onClose={onClose} />
    </Modal>
  )
}
