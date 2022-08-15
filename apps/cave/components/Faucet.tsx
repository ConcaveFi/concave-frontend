import { ChainId, DAI, NATIVE } from '@concave/core'
import { Button, Image, Link, Modal, Stack, Text } from '@concave/ui'
import { Wallet } from 'ethers'
import { hexlify, parseEther, parseUnits } from 'ethers/lib/utils'
import { useCurrencyBalance } from 'hooks/useCurrencyBalance'
import { getTxExplorer } from 'lib/getTransactionExplorer'
import { concaveProvider } from 'lib/providers'
import { useQuery } from 'react-query'
import { useAccount, useContractWrite } from 'wagmi'

const faucetKey = process.env.NEXT_PUBLIC_FAUCET_PK
const faucet = faucetKey && new Wallet(faucetKey, concaveProvider(ChainId.RINKEBY))

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
  const { address } = useAccount()

  const { data: ethBalance, isLoading } = useCurrencyBalance(NATIVE[ChainId.RINKEBY])

  const { data: faucetBalance } = useQuery('faucet balance', () => faucet.getBalance(), {
    enabled: !!faucet,
  })

  const {
    data: sentEthTx,
    isSuccess: ethSentSuccess,
    isLoading: isSendingEth,
    refetch: sendEth,
  } = useQuery('send eth', () => sendSomeEth(address), { enabled: false })

  if (faucetBalance?.lt(parseEther('0.1')))
    return (
      <Stack fontWeight="bold" rounded="2xl" shadow="down" py={3} fontSize="sm" spacing={0}>
        <Text>Noo the ETH faucet is dry 😭</Text>
      </Stack>
    )

  if (ethBalance?.greaterThan(0))
    return (
      <Stack fontWeight="bold" rounded="2xl" shadow="down" py={3} fontSize="sm" spacing={0}>
        <Text>Nice you already got {ethBalance?.toFixed(2, { groupSeparator: ',' })} ETH</Text>
      </Stack>
    )

  return (
    <>
      <Button
        leftIcon={<Image w="20px" src={`/assets/tokens/eth.svg`} alt="" />}
        onClick={() => sendEth()}
        isLoading={isSendingEth || isLoading}
        loadingText={isSendingEth && 'sending 0.1 ETH'}
        variant="secondary"
        p={3}
      >
        Get some gas ETH
      </Button>
      {ethSentSuccess && (
        <Stack fontWeight="bold" rounded="2xl" shadow="down" py={2} fontSize="sm" spacing={0}>
          <Text>🎉 0.1 ETH Sent!</Text>
          <Link
            href={getTxExplorer(sentEthTx.hash, sentEthTx.chainId)}
            fontSize="sm"
            color="text.accent"
            isExternal
          >
            View on explorer
          </Link>
        </Stack>
      )}
    </>
  )
}

const DAIMinter = () => {
  const { address } = useAccount()

  const {
    data: mintDaiTx,
    isLoading,
    write: mintDAI,
  } = useContractWrite({
    addressOrName: DAI[ChainId.RINKEBY].address,
    contractInterface: ['function mint(address guy, uint256 wad) external'],
    functionName: 'mint',
    args: [address, parseUnits('69420', 18)],
  })

  if (!!mintDaiTx)
    return (
      <Stack fontWeight="bold" rounded="2xl" shadow="down" py={2} fontSize="sm" spacing={0}>
        <Text>🎉 69420 tDAI tx sent!</Text>
        <Link
          href={getTxExplorer(mintDaiTx.hash, mintDaiTx.chainId)}
          fontSize="sm"
          color="text.accent"
          isExternal
        >
          View on explorer
        </Link>
      </Stack>
    )

  return (
    <Button
      leftIcon={<Image w="20px" src={`/assets/tokens/dai.svg`} alt="" />}
      onClick={() => mintDAI()}
      isLoading={isLoading}
      loadingText="Confirm in your wallet"
      variant="secondary"
      p={3}
    >
      Mint tDai
    </Button>
  )
}

const Faucet = ({ isOpen, onClose }) => {
  return (
    <Modal
      bluryOverlay={true}
      title="The cave faucet"
      titleAlign="center"
      isOpen={isOpen}
      onClose={onClose}
      bodyProps={{ w: '350px', gap: 3, textAlign: 'center' }}
    >
      <Text fontWeight="bold">{`You'll`} need tDai to test around here</Text>
      <ETHFaucet />
      <DAIMinter />
      <Text fontWeight="bold" fontSize="sm" color="text.low">
        On the swap page you can exchange tDai for CNV to start messing around!
      </Text>
    </Modal>
  )
}
