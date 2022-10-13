import { Box, Button, Card, Flex, Heading, Text } from '@concave/ui'
import { recoverTypedSignature, SignTypedDataVersion, TypedMessage } from '@metamask/eth-sig-util'
import { withPageTransition } from 'components/PageTransition'
import { ethers, Wallet } from 'ethers'
import { useState } from 'react'
import { useAccount, useSigner } from 'wagmi'
import Blog from '../../../contracts/artifacts/contracts/Signature.sol/Blog.json'
import { contractAddress } from '../../../contracts/config'

const msgParams = {
  domain: {
    chainId: 1337,
    name: 'Blog',
    verifyingContract: contractAddress,
    version: '1',
  },
  message: {
    seller: '0x8522093305253EfB2685241dc0C587CDD9B10e4B',
  },
  primaryType: 'Swap',
  types: {
    Swap: [{ name: 'seller', type: 'address' }],
  },
}

export const useSignTypedData = (data: TypedMessage<any>) => {
  const account = useAccount()
  const ethereum = window.ethereum as any
  const { data: wallet } = useSigner()
  const [signature, setSignature] = useState('')
  const [signer, setSigner] = useState('')

  /**
   * Should be works with ledger
   * @returns
   */
  const signV4 = async () => {
    try {
      console.log(account.address)
      const signature = await (ethereum as any).request({
        method: 'eth_signTypedData_v4',
        params: [account.address, JSON.stringify(data)],
      })
      const recoveredAddr = recoverTypedSignature({
        data,
        signature,
        version: SignTypedDataVersion.V4,
      })
      setSignature(signature)
      setSigner(recoveredAddr)
      return { signature, recoveredAddr }
    } catch (e) {
      console.error(e)
    }
  }
  const signV5 = async () => {
    const w = wallet as Wallet
    const result = await w._signTypedData(msgParams.domain, msgParams.types, msgParams.message)
    console.log(result)
    return { signature: result }
  }
  /**
   * Should be works with ledger
   * @returns
   */
  const signV3 = async () => {
    try {
      console.log(account.address)
      const signature = await (ethereum as any).request({
        method: 'eth_signTypedData_v3',
        params: [account.address, JSON.stringify(data)],
      })
      const recoveredAddr = recoverTypedSignature({
        data,
        signature,
        version: SignTypedDataVersion.V3,
      })
      setSignature(signature)
      setSigner(recoveredAddr)
      return { signature, recoveredAddr }
    } catch (e) {
      console.error(e)
    }
  }

  const verify = () => {}
  return {
    data,
    signature,
    signer,
    verify,
    signV4,
    signV3,
    signV5,
  }
}

const Faucet = () => {
  const account = useAccount()

  const { signV4, signV3, signV5, signature, verify, signer, data } = useSignTypedData(msgParams)

  // It doest work
  const test = async () => {
    let provider = new ethers.providers.JsonRpcProvider()
    const contract = new ethers.Contract(contractAddress, Blog.abi, provider)
    const { signature } = await signV4()
    const verifySignature = await contract.verifySignature(
      ['0x8522093305253EfB2685241dc0C587CDD9B10e4B'],
      signature,
    )
    console.table({ verifySignature, wallet: account.address })
  }
  const test2 = async () => {
    let provider = new ethers.providers.JsonRpcProvider()
    const contract = new ethers.Contract(contractAddress, Blog.abi, provider)
    const { signature } = await signV4()

    const r = '0x' + signature.substring(2).substring(0, 64)
    const s = '0x' + signature.substring(2).substring(64, 128)
    const v = parseInt(signature.substring(2).substring(128, 130), 16)
    console.log(r, s, v)
    const verifySignature = await contract.verifySignature2(
      ['0x8522093305253EfB2685241dc0C587CDD9B10e4B'],
      r,
      s,
      v,
    )
    console.table({ verifySignature, wallet: account.address })
  }

  return (
    <Box maxH={'100vh'} w={'100%'} overflowY={'hidden'} apply="scrollbar.secondary">
      <Flex
        align={'center'}
        w={'100%'}
        borderRadius={0}
        gap={4}
        textAlign="center"
        direction="column"
      >
        <>
          <Heading as="h1" mt={16} mb={3} fontSize="5xl">
            Test signature
          </Heading>
          <Flex mt={0} align="center" gap={10} width="full" justify="center" alignItems={'center'}>
            <Text maxW={520} textAlign={'center'}>
              Select and mint tokens
            </Text>
          </Flex>

          <Flex
            direction="column"
            float={'left'}
            position="relative"
            justify={'center'}
            align="center"
            width="full"
            gap={5}
            p={{ base: 0, sm: 4 }}
          >
            <Card p={6} gap={6} variant="primary" h="fit-content" shadow="Block Up" w="100%">
              <Button variant="primary" size="large" w="full" onClick={() => test()}>
                Sign V4
              </Button>
              <Button variant="primary" size="large" w="full" onClick={() => test2()}>
                Sign2
              </Button>
            </Card>
          </Flex>
        </>
      </Flex>
    </Box>
  )
}

export default withPageTransition(Faucet)
