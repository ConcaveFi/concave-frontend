import { Box, Button, Card, Flex, Heading, Text } from '@concave/ui'
import { withPageTransition } from 'components/PageTransition'
import { ethers } from 'ethers'
import { useAccount, useSignTypedData } from 'wagmi'
import Blog from '../../../contracts/artifacts/contracts/Signature.sol/Blog.json'
import { contractAddress } from '../../../contracts/config'

const Faucet = () => {
  const chainId = 1337
  const account = useAccount()
  const signatur = useSignTypedData({
    domain: {
      name: 'Blog',
      version: '1',
      chainId,
      verifyingContract: contractAddress,
    },
    types: {
      Swap: [{ name: 'seller', type: 'address' }],
    },
    value: {
      seller: '0x8522093305253EfB2685241dc0C587CDD9B10e4B',
    },
  })

  // it works =D
  const test = async () => {
    const signature = await signatur.signTypedDataAsync()
    let provider = new ethers.providers.JsonRpcProvider()
    const contract = new ethers.Contract(contractAddress, Blog.abi, provider)
    const verifySignature = await contract.verifySignature(
      ['0x8522093305253EfB2685241dc0C587CDD9B10e4B'],
      signature,
    )
    console.table({ verifySignature, wallet: account.address })
  }

  const test2 = async () => {
    let provider = new ethers.providers.JsonRpcProvider()
    const contract = new ethers.Contract(contractAddress, Blog.abi, provider)
    const signature = await signatur.signTypedDataAsync()

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
