import { SubmittedIcon } from '@concave/icons'
import { Button, Flex, Link, Modal, Text } from '@concave/ui'
import { Transaction } from 'ethers'
import useAddTokenToWallet, { injectedTokenResponse } from 'hooks/useAddTokenToWallet'
import { getTxExplorer } from 'lib/getTransactionExplorer'
import { useEffect, useState } from 'react'
import { useNetwork } from 'wagmi'

type TxSubmittedProps = {
  title: string
  tx: Transaction
  onClose?: () => void
  tokenSymbol: string
  addTokenToWallet: () => void
}

const TxSubmitted = ({ title, tx, onClose, tokenSymbol, addTokenToWallet }: TxSubmittedProps) => {
  const { chain } = useNetwork()

  const [showAddButton, setShowAddButton] = useState(
    typeof tokenSymbol !== 'undefined' ? true : false,
  )

  return (
    <>
      <SubmittedIcon w={10} my={6} />
      <Text align="center" fontSize="md" fontWeight="bold">
        {title || `Transaction Submitted`} <br />
        <Link href={getTxExplorer(tx.hash, chain.id)} fontSize="sm" color="text.accent" isExternal>
          View on explorer
        </Link>
      </Text>

      {showAddButton && (
        <Flex>
          <Button
            onClick={() => {
              addTokenToWallet()
              setTimeout(() => {
                setShowAddButton(false)
              }, 1000)
            }}
            variant="secondary"
            size="large"
            mt={4}
          >
            Add {tokenSymbol} to wallet
          </Button>
        </Flex>
      )}

      {!showAddButton && (
        <Flex>
          <Button onClick={onClose} variant="secondary" size="large" mt={4} w="180px">
            Close
          </Button>
        </Flex>
      )}
    </>
  )
}

type TransactionSubmittedDialogProps = {
  title?: string
  subtitle?: string
  tx: Transaction
  isOpen: boolean
  closeParentComponent?: VoidFunction
  tokenSymbol?: string
  tokenOutAddress?: string
}

export const TransactionSubmittedDialog = ({
  title,
  subtitle,
  tx,
  isOpen: isOpenProp,
  closeParentComponent,
  tokenSymbol,
  tokenOutAddress,
}: TransactionSubmittedDialogProps) => {
  const [isOpen, setIsOpen] = useState(isOpenProp)

  useEffect(() => {
    setIsOpen(isOpenProp)
  }, [isOpenProp])

  const { loading: loadingtoWallet, addingToWallet }: injectedTokenResponse = useAddTokenToWallet({
    tokenAddress: tokenOutAddress,
    tokenChainId: 4,
    tokenImage:
      'https://raw.githubusercontent.com/ConcaveFi/assets/master/blockchains/ethereum/assets/0x000000007a58f5f58E697e51Ab0357BC9e260A04/logo.png',
  })

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
      bodyProps={{ align: 'center', w: '300px' }}
    >
      <TxSubmitted
        title={subtitle}
        tx={tx}
        onClose={onClose}
        tokenSymbol={tokenSymbol}
        addTokenToWallet={addingToWallet}
      />
    </Modal>
  )
}
