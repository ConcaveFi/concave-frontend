import { FixedOrderMarketContract } from '@concave/marketplace'
import { Box, Button, Card, Flex, Heading, HStack, Text } from '@concave/ui'
import { withPageTransition } from 'components/PageTransition'
import { BigNumberish, Signature, utils } from 'ethers'
import { concaveProvider } from 'lib/providers'
import { useState } from 'react'
import { useSigner, useSignTypedData } from 'wagmi'

export async function signPermit(
  seller: any, //providers.JsonRpcSigner,
  erc721: string,
  erc20: string,
  tokenId: BigNumberish,
  startPrice: BigNumberish,
  endPrice: BigNumberish,
  start: BigNumberish,
  deadline: BigNumberish,
): Promise<Signature> {
  const cavemart = new FixedOrderMarketContract(concaveProvider(4)).getContract()
  console.log(seller)
  console.log('providers.JsonRpcSigner')
  console.log(seller.getAddress)
  console.log(seller._signTypedData)
  const domain = await cavemart.DOMAIN_SEPARATOR()
  console.log(domain)
  const address = await seller.getAddress()
  const rawSignature = await seller._signTypedData(
    {
      version: '1',
      name: 'Fixed Order Market',
      chainId: 4,
      verifyingContract: '0x67cB8469Ea1F689E149b2c4c245ba47E56cd6041',
    },
    {
      SwapMetadata: [
        { name: 'seller', type: 'address' },
        { name: 'erc721', type: 'address' },
        { name: 'erc20', type: 'address' },
        { name: 'tokenId', type: 'uint256' },
        { name: 'startPrice', type: 'uint256' },
        { name: 'endPrice', type: 'uint256' },
        { name: 'nonce', type: 'uint256' },
        { name: 'start', type: 'uint256' },
        { name: 'deadline', type: 'uint256' },
      ],
    },
    {
      seller,
      erc721,
      erc20,
      tokenId,
      startPrice,
      endPrice,
      nonce: await cavemart.nonces(address), // current nonce
      start,
      deadline,
    },
  )
  return utils.splitSignature(rawSignature)
}

const Faucet = () => {
  const [signerAddress, setSignerAddress] = useState('')
  const [v, setV] = useState(0)
  const [r, setR] = useState('')
  const [s, setS] = useState('')
  const [signature, setSignature] = useState('')
  const [showInputs, setShowInputs] = useState(true)

  const value = {
    seller: '0x8522093305253EfB2685241dc0C587CDD9B10e4B',
    erc721: '0xB9E431Fc34152246BB28453b6ce117829E8A5B0C',
    erc20: '0x4A8b871784A8e6344126F47d48283a87Ea987f27',
    tokenId: '15',
    startPrice: '10000000000',
    endPrice: '0',
    nonce: '0',
    start: '0',
    deadline: '1658905990',
    typehash: '0x23a27891e65e6e1755f07adab331a8ea10ca325ee538756056d223ac73fd97a6',
  }
  const domain = {
    version: '1',
    name: 'Fixed Order Market',
    chainId: 4,
    verifyingContract: '0x67cB8469Ea1F689E149b2c4c245ba47E56cd6041',
  }
  const types = {
    SwapMetadata: [
      { name: 'typehash', type: 'bytes32' },
      { name: 'seller', type: 'string' },
      { name: 'erc721', type: 'string' },
      { name: 'erc20', type: 'string' },
      { name: 'tokenId', type: 'uint256' },
      { name: 'startPrice', type: 'uint256' },
      { name: 'endPrice', type: 'uint256' },
      { name: 'nonce', type: 'uint256' },
      { name: 'start', type: 'uint256' },
      { name: 'deadline', type: 'uint256' },
    ],
  }
  const { signTypedDataAsync } = useSignTypedData({
    types,
    domain,
    value,
  })
  const { data: signer } = useSigner()

  const create = () => {
    signPermit(
      signer,
      value.erc721,
      value.erc20,
      value.tokenId,
      value.startPrice,
      value.endPrice,
      value.start,
      value.deadline,
    )
    // signTypedDataAsync()
    //   .then(async (data) => {
    //     const tmpSignature = data.substring(2)
    //     const signatureObject = {
    //       r: `0x${tmpSignature.substring(0, 64)}`,
    //       s: `0x${tmpSignature.substring(64, 128)}`,
    //       v: parseInt(tmpSignature.substring(128, 130), 16),
    //     }
    //     console.log(
    //       JSON.stringify([
    //         value.seller,
    //         value.erc721,
    //         value.erc20,
    //         value.tokenId,
    //         value.startPrice,
    //         value.endPrice,
    //         value.start,
    //         value.deadline,
    //       ]),
    //     )
    //     setSignature(data)
    //     setSignerAddress(verifyTypedData(domain, types, value, signatureObject))
    //     setV(signatureObject.v)
    //     setR(signatureObject.r)
    //     setS(signatureObject.s)
    //   })
    //   .catch(alert)
  }

  return (
    <Box w={'100%'} overflowY={'hidden'} apply="scrollbar.secondary">
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
            To sign test
          </Heading>

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
              <Button _focus={{}} size={`md`} variant={'primary'} onClick={create}>
                To sign
              </Button>
            </Card>
          </Flex>
        </>
      </Flex>

      <Box>
        <HStack>
          <Text w={'100px'}>signer: </Text> <Text w={'full'}>{signerAddress}</Text>
        </HStack>
        <HStack>
          <Text w={'100px'}>signature: </Text> <Text w={'full'}>{signature}</Text>
        </HStack>
        <HStack>
          <Text w={'100px'}>r: </Text> <Text w={'full'}>{r}</Text>
        </HStack>
        <HStack>
          <Text w={'100px'}>s: </Text> <Text w={'full'}>{s}</Text>
        </HStack>
        <HStack>
          <Text w={'100px'}>v: </Text> <Text w={'full'}>{v}</Text>
        </HStack>
      </Box>
    </Box>
  )
}
const jsonParse = (value: string) => JSON.parse(toJson(value))
const toJson = (value: string) => {
  try {
    const obj = JSON.parse(value)
    return value
  } catch (e) {
    try {
      return eval(`JSON.stringify (${value})`)
    } catch (e) {
      console.error(`error to parse`)
      throw `error`
    }
  }
}
export default withPageTransition(Faucet)
