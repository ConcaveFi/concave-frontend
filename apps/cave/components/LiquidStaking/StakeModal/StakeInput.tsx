import { Box, Button, Card, Flex, HStack, Image, Input, Text } from '@concave/ui'
// import { TokenBalance } from 'components/Swap/TokenBalance'
// import { TokenInput } from 'components/Swap/TokenInput'
// import { Token } from 'constants/routing'
import React from 'react'
import { chain } from 'wagmi'

// export const stakedCoin = new Token({
//   chainId: chain.ropsten.id,
//   address: '0x2b8e79cbd58418ce9aeb720baf6b93825b93ef1f',
//   decimals: 18,
//   logoURI: '/assets/tokens/cnv.svg',
//   name: 'Concave',
//   symbol: 'CNV',
// })

function StakeInput() {
  return (
    <Card w="350px" px={4} py={5}>
      <Flex justify="space-between" alignItems="center">
        <Input
          ml={-1}
          shadow="none"
          w="60%"
          bg="none"
          fontSize="xl"
          placeholder="0.0"
          onChange={() => console.log('input')}
        />
        <Flex shadow="up" borderRadius="3xl" px={4} py={1} alignItems="center">
          <Image src="/assets/tokens/cnv.svg" alt="concave-logo" h={8} w={8} />
          <Text ml={2} color="text.medium" fontSize="xl" fontWeight="bold">
            CNV
          </Text>
        </Flex>
      </Flex>
      <Flex mt={2} justify="space-between" px={2}>
        <Text color="text.low" fontSize="md" fontWeight="bold">{`$900.3`}</Text>
        <HStack spacing={2}>
          <Text color="text.low" fontSize="md" fontWeight="bold">
            Balance: {`435.12`}
          </Text>
          <Button textColor="blue.500">Max</Button>
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
