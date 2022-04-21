import { Box, Button, Card, Flex, HStack, Image, Input, Text } from '@concave/ui'
import { useFetchApi } from 'hooks/cnvData'
// import { TokenBalance } from 'components/Swap/TokenBalance'
// import { TokenInput } from 'components/Swap/TokenInput'
// import { Token } from 'constants/routing'
import React, { useEffect, useState } from 'react'
import { chain, useAccount, useBalance } from 'wagmi'
// export const stakedCoin = new Token({
//   chainId: chain.ropsten.id,
//   address: '0x2b8e79cbd58418ce9aeb720baf6b93825b93ef1f',
//   decimals: 18,
//   logoURI: '/assets/tokens/cnv.svg',
//   name: 'Concave',
//   symbol: 'CNV',
// })

function StakeInput() {
  const cnvPrice = useFetchApi('/api/cnv')
  const [stakeInput, setStakeInput] = useState(0)
  const [{ data: account }] = useAccount()

  const [cnvBalance, getBalance] = useBalance({
    addressOrName: account?.address,
    token: '0x2B8E79CBD58418CE9aeB720BAf6B93825B93eF1F', // Change to MAINNET address
  })

  const setMax = () => {
    setStakeInput(+cnvBalance.data?.formatted)
  }

  return (
    <Card w="350px" px={4} py={5}>
      <Flex justify="space-between" alignItems="center">
        <Input
          value={stakeInput}
          onChange={(e) => setStakeInput(Number(e.target.value))}
          ml={-1}
          shadow="none"
          w="60%"
          bg="none"
          fontSize="xl"
        />
        <Flex shadow="up" borderRadius="3xl" px={4} py={1} alignItems="center">
          <Image src="/assets/tokens/cnv.svg" alt="concave-logo" h={8} w={8} />
          <Text ml={2} color="text.medium" fontSize="xl" fontWeight="bold">
            CNV
          </Text>
        </Flex>
      </Flex>
      <Flex mt={2} justify="space-between" px={2}>
        <Text color="text.low" fontSize="md" fontWeight="bold">{`$${(
          stakeInput * cnvPrice.data?.cnv
        ).toFixed(2)}`}</Text>
        <HStack spacing={2}>
          <Text color="text.low" fontSize="sm" fontWeight="bold">
            Balance: {(+cnvBalance.data?.formatted).toFixed(2)} CNV
          </Text>
          <Button textColor="blue.500" onClick={setMax}>
            Max
          </Button>
        </HStack>
      </Flex>
      {/* <TokenInput
        onChangeCurrency={console.log}
        currency={stakedCoin}
        value={stakedCoin.symbol}
        onChangeValue={console.log}
      >
        <TokenBalance value={'42690'} onClick={console.log} />
      </TokenInput> */}
    </Card>
  )
}

export default StakeInput
