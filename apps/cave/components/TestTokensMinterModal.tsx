import { Text, Button, Modal, Image, Stack, Link } from '@concave/ui'
import { Wallet } from 'ethers'
import { parseEther, hexlify, parseUnits } from 'ethers/lib/utils'
import { ChainId, DAI, NATIVE } from 'gemswap-sdk'
import { useCurrencyBalance } from 'hooks/useCurrencyBalance'
import { concaveProvider } from 'lib/providers'
import { useNetwork, useAccount, useContractWrite, chain } from 'wagmi'
import { useQuery } from 'react-query'
import { getTxExplorer } from './TransactionSubmittedDialog'
import { useEffect, useState } from 'react'
import { useWorthyUser } from './DevelopGateway'

const faucetKey = process.env.NEXT_PUBLIC_FAUCET_PK
const faucet = faucetKey && new Wallet(faucetKey, concaveProvider(ChainId.ROPSTEN))

const sendSomeEth = async (recipient) => {
  const tx = {
    from: faucet.address,
    to: recipient,
    value: parseEther('0.1'),
    nonce: await faucet.getTransactionCount(),
    gasLimit: hexlify(2100000),
    gasPrice: await faucet.getGasPrice(),
  }
  return await faucet.sendTransaction(tx)
}

const ETHFaucet = () => {
  const [{ data: account }] = useAccount()

  const { data: ethBalance } = useCurrencyBalance(NATIVE[ChainId.ROPSTEN])

  const {
    data: sentEthTx,
    isSuccess: ethSentSuccess,
    isLoading: isSendingEth,
    refetch: sendEth,
  } = useQuery('send eth', () => sendSomeEth(account?.address), { enabled: false })

  if (!ethBalance?.greaterThan(0))
    return (
      <Stack fontWeight="bold" rounded="2xl" shadow="down" py={3} fontSize="sm" spacing={0}>
        <Text>Nice you already got {ethBalance?.toFixed(3, { groupSeparator: ',' })} ETH</Text>
      </Stack>
    )

  return (
    <>
      <Button
        leftIcon={<Image w="20px" src={`/assets/tokens/eth.svg`} alt="" />}
        onClick={() => sendEth()}
        isLoading={isSendingEth}
        loadingText="sending 0.2 ETH"
        variant="secondary"
        p={3}
      >
        Get some gas ETH
      </Button>
      {ethSentSuccess && (
        <Stack fontWeight="bold" rounded="2xl" shadow="down" py={2} fontSize="sm" spacing={0}>
          <Text>0.1 ETH Sent!</Text>
          <Link
            href={getTxExplorer(sentEthTx, chain.ropsten)}
            fontSize="sm"
            color="text.accent"
            isExternal
          >
            check on explorer
          </Link>
        </Stack>
      )}
    </>
  )
}

const DAIMinter = () => {
  const [{ data: account }] = useAccount()

  const [{ data: mintDaiTx, loading }, mintDAI] = useContractWrite(
    {
      addressOrName: DAI[ChainId.ROPSTEN].address,
      contractInterface: ['function mint(address guy, uint256 wad) external'],
    },
    'mint',
    { args: [account.address, parseUnits('69420', 18)] },
  )

  if (!!mintDaiTx)
    return (
      <Stack fontWeight="bold" rounded="2xl" shadow="down" py={2} fontSize="sm" spacing={0}>
        <Text>69420 tDAI tx sent!</Text>
        <Link
          href={getTxExplorer(mintDaiTx, chain.ropsten)}
          fontSize="sm"
          color="text.accent"
          isExternal
        >
          check on explorer
        </Link>
      </Stack>
    )

  return (
    <Button
      leftIcon={<Image w="20px" src={`/assets/tokens/dai.svg`} alt="" />}
      onClick={() => mintDAI()}
      isLoading={loading}
      loadingText="confirm in your wallet"
      variant="secondary"
      p={3}
    >
      Mint some tDai
    </Button>
  )
}

const TestTokensMinter = () => {
  const { data: tDaiBalance } = useCurrencyBalance(DAI[ChainId.ROPSTEN])

  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => {
    setIsOpen(tDaiBalance && !tDaiBalance?.greaterThan(0))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tDaiBalance?.serialize()])
  const onClose = () => setIsOpen(false)

  return (
    <Modal
      bluryOverlay={true}
      title="The cave faucet"
      titleAlign="center"
      isOpen={isOpen}
      onClose={onClose}
      bodyProps={{ w: '350px', gap: 3, textAlign: 'center' }}
    >
      <Text fontWeight="bold">
        Looks like {`you're`} in Ropsten Testnet, but {`don't`} have any tDai to test around here 😔
      </Text>
      <ETHFaucet />
      <DAIMinter />
      <Text fontWeight="bold" fontSize="sm" color="text.low">
        On the swap page you can exchange tDai for CNV to start messing around!
      </Text>
    </Modal>
  )
}

export const TestTokensMinterModal = () => {
  const [{ data }] = useNetwork()
  const { isUserWorthy } = useWorthyUser()

  if (!isUserWorthy || data.chain?.id !== ChainId.ROPSTEN) return null
  return <TestTokensMinter />
}
