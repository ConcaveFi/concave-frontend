import { CNV } from 'constants/tokens'
import { Button, Flex, Modal, Spinner, Text, useDisclosure } from '@concave/ui'
import useAddTokenToWallet, { injectedTokenResponse } from 'hooks/useAddTokenToWallet'
import { useIsMounted } from 'hooks/useIsMounted'
import { GlassPanel } from './TreasuryManagementCard'
import { useEffect, useState } from 'react'
import { useAccount, useBalance, useConnect, useContractWrite } from 'wagmi'
import { aCNVredeemabi } from 'lib/contractoABI'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import RedeemVestedTokenDialog from './RedeemVestedTokenDialog'
import useVestedTokens from './Hooks/useVestedTokens'

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
            <Button
              onClick={() => {
                if (netWorkId === 4) {
                  onOpen()
                  setDescription(
                    "aCNV on Rinkeby network it's not done yet, only on mainnet network.",
                  )
                }
              }}
            >
              <Text fontSize={{ base: '13px', xl: '18px' }} fontWeight="700" my={'auto'}>
                aCNV
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
            <Button>
              <Text
                onClick={() => {
                  onOpen()
                  setDescription("The pCNV token it's on progress, come back later. :)")
                }}
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
            <Button onClick={onOpenRedeemBBTCNV}>
              <Text fontSize={{ base: '13px', xl: '18px' }} fontWeight="700" my={'auto'}>
                bbtCNV
              </Text>
            </Button>
            <RedeemVestedTokenDialog
              balance={bbtCNVData?.formatted}
              tokenSymbol="bbtCNV"
              contractAddress="0x1697118735044519aF9454700Bc005eEAB9D102b"
              isOpen={onRedeemBBTCNV}
              onClose={() => {
                console.log('a')
                onCloseRedeemBBTCNV()
              }}
            />
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
      <ComingSoonDialog desc={description} isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default TreasuryRedeemCard

const ComingSoonDialog = ({
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
