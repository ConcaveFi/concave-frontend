import { CNV } from 'constants/tokens'
import { Button, Flex, Modal, Spinner, Text, useDisclosure } from '@concave/ui'
import useAddTokenToWallet, { injectedTokenResponse } from 'hooks/useAddTokenToWallet'
import { useIsMounted } from 'hooks/useIsMounted'
import { getWalletType } from 'lib/injected.wallets'
import { GlassPanel } from './TreasuryManagementCard'
import { useEffect, useState } from 'react'
import { useAccount, useBalance, useContractWrite } from 'wagmi'
import { aCNVredeemabi } from 'lib/contractoABI'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { CNV_ADDRESS, DAI } from '@concave/gemswap-sdk'
import { ethers } from 'ethers'
import { formatEther } from 'ethers/lib/utils'
import { TransactionErrorDialog } from 'components/TransactionErrorDialog'

// aCNV address
// 0x2a6bb78490c2221e0d36d931192296be4b3a01f1 RINKEBY
// 0x6ff0106d34feee8a8acf2e7b9168480f86b82e2f eth
function ClaimAcnvButton() {
  const netWorkdId = useCurrentSupportedNetworkId()
  const [{ data: account }] = useAccount()
  const [{ data, error, loading }, write] = useContractWrite(
    {
      addressOrName: '0x38baBedCb1f226B49b2089DA0b84e52b6181Ca59',
      contractInterface: aCNVredeemabi,
    },
    'redeem',
    {
      args: [account?.address],
    },
  )
  const [redeemText, setRedeemText] = useState('Redeem aCNV')
  const [redeeming, setRedeeming] = useState(false)

  const [{ data: balanceData, loading: loadingBalance }] = useBalance({
    addressOrName: account?.address,
    token: '0x2a6bb78490c2221e0d36d931192296be4b3a01f1',
  })

  const redeemAncv = () => {
    setRedeeming(loading ? true : false)
    setRedeemText(loading ? 'Redeeming' : 'Nothing to Redeem')
    write()
  }

  const { isOpen, onClose, onOpen } = useDisclosure()
  return (
    <>
      <Button fontSize={{ base: '13px', xl: '18px' }} fontWeight="700" onClick={onOpen}>
        <Flex align={'center'} justify="center" gap={2}>
          <Text my={'auto'}>aCNV -</Text>
          {loadingBalance ? <Spinner size={'sm'} /> : <Text>{balanceData?.formatted}</Text>}
        </Flex>
      </Button>
      <Modal
        bluryOverlay={true}
        title="Nothing to Redeem"
        isOpen={isOpen}
        onClose={onClose}
        bodyProps={{ align: 'center', w: '300px' }}
      >
        <Flex
          height={'150px'}
          boxShadow="Down Medium"
          width={'full'}
          rounded="2xl"
          align={'center'}
          direction="column"
          textAlign={'center'}
        >
          <Text fontSize={'2xl'} fontWeight="bold" mt={6}>
            Error:
          </Text>
          <Text fontWeight={'bold'} textColor={'text.low'}>
            You do not have any aCNV to redeem.
          </Text>
        </Flex>
      </Modal>
    </>
  )
}

function TreasuryRedeemCard() {
  const isMounted = useIsMounted()
  const { loading: loadingtoWallet, addingToWallet }: injectedTokenResponse = useAddTokenToWallet({
    tokenAddress: CNV.address,
    tokenChainId: CNV.chainId,
  })

  const [walletName, setWalletName] = useState('')

  useEffect(() => {
    if (walletName === '') setWalletName(getWalletType())
  }, [walletName])

  return (
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
          <ClaimAcnvButton />
        </GlassPanel>
        <GlassPanel
          width={{ base: '150px', xl: '182px' }}
          height={'40px'}
          rounded="2xl"
          mx={'auto'}
          justify={'center'}
        >
          <Button>
            <Text fontSize={{ base: '13px', xl: '18px' }} fontWeight="700" my={'auto'}>
              pCNV - 0
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
            <Text fontSize={{ base: '13px', xl: '18px' }} fontWeight="700" my={'auto'}>
              bbtCNV - 100
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
  )
}

export default TreasuryRedeemCard
