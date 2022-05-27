import { CNV } from 'constants/tokens'
import { Button, Flex, Modal, Spinner, Text, useDisclosure } from '@concave/ui'
import useAddTokenToWallet, { injectedTokenResponse } from 'hooks/useAddTokenToWallet'
import { useIsMounted } from 'hooks/useIsMounted'
import { GlassPanel } from './TreasuryManagementCard'
import { useEffect, useState } from 'react'
import { useAccount, useBalance, useConnect, useContractWrite, useSigner } from 'wagmi'
import { aCNVredeemabi } from 'lib/contractoABI'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import RedeemVestedTokenDialog from './RedeemVestedTokenDialog'
import useVestedTokens from './Hooks/useVestedTokens'
import { Contract } from 'ethers'
import { concaveProvider as provider } from 'lib/providers'
import { WaitingConfirmationDialog } from 'components/WaitingConfirmationDialog'
import { TransactionSubmittedDialog } from 'components/TransactionSubmittedDialog'
import { TransactionErrorDialog } from 'components/TransactionErrorDialog'
// aCNV address
// 0x2a6bb78490c2221e0d36d931192296be4b3a01f1 RINKEBY
// 0x6ff0106d34feee8a8acf2e7b9168480f86b82e2f eth

function TreasuryRedeemCard() {
  const { addingToWallet }: injectedTokenResponse = useAddTokenToWallet({
    tokenAddress: CNV.address,
    tokenChainId: CNV.chainId,
  })

  const netWorkId = useCurrentSupportedNetworkId()
  const { bbtCNVData, aCNVData, pCNVData } = useVestedTokens({ chainId: netWorkId })
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [description, setDescription] = useState("This feature it's not done yet.")

  const [walletName, setWalletName] = useState('')
  const [{ data }] = useConnect()
  const [{ data: account }] = useAccount()

  const {
    isOpen: onRedeemBBTCNV,
    onOpen: onOpenRedeemBBTCNV,
    onClose: onCloseRedeemBBTCNV,
  } = useDisclosure()
  const {
    isOpen: onRedeemACNV,
    onOpen: onOpenRedeemACNV,
    onClose: onCloseRedeemACNV,
  } = useDisclosure()

  useEffect(() => {
    setWalletName(data?.connector?.name || 'Wallet')
  }, [walletName])

  const [{ data: signer }] = useSigner()

  const { isOpen: isConfirmOpen, onOpen: onOpenConfirm, onClose: onCloseConfirm } = useDisclosure()
  const { isOpen: isSubOpen, onOpen: onOpenSub, onClose: onCloseSub } = useDisclosure()
  const { isOpen: isErrorOpen, onOpen: onOpenError, onClose: onCloseError } = useDisclosure()
  const [tx, setTx] = useState()
  const [error, setError] = useState('')

  return (
    <>
      <GlassPanel
        width={{ base: '510px', xl: '260px' }}
        height={{ base: '240px', xl: '331px' }}
        backdropBlur={'2px'}
        rounded="2xl"
        direction={'column'}
      >
        <Flex justify={'center'} align="center" flex={1} maxHeight="60px" mt={2}>
          <Text fontSize={'25px'} fontWeight="700">
            Redeem CNV
          </Text>
        </Flex>
        <Flex mx={6} textAlign="center" justify={'center'}>
          <Text fontSize={{ base: '20px', xl: '16px' }} textColor="text.low" fontWeight={'700'}>
            Redeem your tokens for CNV below
          </Text>
        </Flex>
        <Flex mt={5} direction={{ base: 'row', xl: 'column' }} gap={{ base: 0, xl: 3 }}>
          <GlassPanel
            width={{ base: '150px', xl: '182px' }}
            height={'40px'}
            rounded="2xl"
            mx={'auto'}
            justify={'center'}
          >
            <Button onClick={onOpenRedeemACNV}>
              <Text fontSize={{ base: '13px', xl: '18px' }} fontWeight="700" my={'auto'}>
                aCNV
              </Text>
            </Button>
            <RedeemVestedTokenDialog
              balance={'1'}
              isOpen={onRedeemACNV}
              onClose={onCloseRedeemACNV}
              tokenSymbol="aCNV"
              onClick={() => {
                onOpenConfirm()
                new Contract(
                  '0x38baBedCb1f226B49b2089DA0b84e52b6181Ca59',
                  aCNVredeemabi,
                  provider(1),
                )
                  .connect(signer)
                  .redeem(account?.address)
                  .then((tx) => {
                    setTx(tx)
                    onOpenSub()
                    onCloseConfirm()
                  })
                  .catch((e) => {
                    onCloseConfirm()
                    setError('Transaction reject.')
                    onOpenError()
                  })
              }}
            />
          </GlassPanel>
          <GlassPanel
            width={{ base: '150px', xl: '182px' }}
            height={'40px'}
            rounded="2xl"
            mx={'auto'}
            justify={'center'}
          >
            <Button>
              <Text
                onClick={onOpen}
                fontSize={{ base: '13px', xl: '18px' }}
                fontWeight="700"
                my={'auto'}
              >
                pCNV
              </Text>
            </Button>
          </GlassPanel>
          <GlassPanel
            width={{ base: '150px', xl: '182px' }}
            height={'40px'}
            rounded="2xl"
            mx={'auto'}
            justify={'center'}
          >
            <Button onClick={onOpen}>
              <Text fontSize={{ base: '13px', xl: '18px' }} fontWeight="700" my={'auto'}>
                bbtCNV
              </Text>
            </Button>
          </GlassPanel>
        </Flex>

        <Text
          onClick={() => {
            addingToWallet()
          }}
          textColor={'text.low'}
          fontWeight={700}
          cursor="pointer"
          mx={'auto'}
          my="auto"
          fontSize={{ base: '22px', xl: '18px' }}
        >
          Add CNV to your {walletName}
        </Text>
      </GlassPanel>
      <WaitingConfirmationDialog isOpen={isConfirmOpen} />
      <TransactionSubmittedDialog isOpen={isSubOpen} closeParentComponent={onCloseSub} tx={tx} />
      <TransactionErrorDialog
        error={error}
        isOpen={isErrorOpen}
        closeParentComponent={onCloseError}
      />
      <ComingSoonDialog desc={description} isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default TreasuryRedeemCard

export const ComingSoonDialog = ({
  isOpen,
  desc,
  onClose,
}: {
  isOpen: boolean
  desc: string
  onClose: () => void
}) => {
  return (
    <Modal
      isCentered
      motionPreset="slideInBottom"
      preserveScrollBarGap
      title={''}
      hideClose
      onClose={onClose}
      isOpen={isOpen}
    >
      <Flex width={'220px'} height="140px" direction={'column'} px="3">
        <Text fontSize={'2xl'} fontWeight="bold" mx={'auto'}>
          Coming soon!
        </Text>
        <Flex width={'full'} height="full" textAlign="center" wordBreak={'break-word'}>
          <Text textColor={'text.low'} fontWeight="bold" fontSize={'lg'}>
            {desc}
          </Text>
        </Flex>
      </Flex>
    </Modal>
  )
}
