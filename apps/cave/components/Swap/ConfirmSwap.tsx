import { ExpandArrowIcon, TokenIcon } from '@concave/icons'
import {
  Box,
  Button,
  Card,
  Flex,
  FlexProps,
  HStack,
  NumericInput,
  StackDivider,
  Text,
} from '@concave/ui'
import { useCurrency } from 'hooks/useCurrency'
import { useGasPrice } from 'hooks/useGasPrice'
import { coingecko } from 'lib/coingecko.adapter'
import React from 'react'
import { useQuery } from 'react-query'
import { Token, UseSwap } from './useSwap'

export type TokenButton = {
  active?: boolean
  symbol: string
} & FlexProps

const TOKEN_INFO = 'TOKEN_INFO'

const TokenButton = ({ symbol, active, ...flexProps }: TokenButton) => {
  const { data: tokenInfo } = useQuery([TOKEN_INFO, symbol], () => coingecko.getTokenInfo(symbol))
  const shadow = active ? 'Down Big' : 'Up Small'
  return (
    <Flex p={2} cursor={'pointer'} borderRadius={'3xl'} boxShadow={shadow} {...flexProps}>
      <TokenIcon size="7" mr={2} tokenName={symbol} />
      <Text lineHeight={'30px'} mr={2} fontSize={12} fontWeight={700}>
        {tokenInfo?.symbol.toUpperCase()}
      </Text>
    </Flex>
  )
}
export const ConfirmSwapCard = ({ swap }: { swap: UseSwap }) => (
  <Card p={6} gap={1} variant="primary" w={400}>
    <ConfirmSwap swap={swap} />
  </Card>
)
export const ConfirmSwap = ({ swap, onConfirm }: { swap: UseSwap; onConfirm: () => void }) => {
  return (
    <>
      <TokenInfo token={swap.from}></TokenInfo>
      <Flex justifyContent={'center'}>
        <Button
          m={-10}
          p={0}
          _hover={{
            bg: 'linear-gradient(239.18deg, #19394C 27.18%, #0A161F 96.11%)',
          }}
          shadow={'Up Small'}
          _focus={{ boxShadow: 'Up Small' }}
          as={Button}
          padding={'4px 14px 4px 14px'}
          bg={'linear-gradient(239.18deg, #19394C 27.18%, #0A161F 96.11%)'}
          w={'40px'}
          h={'35px'}
          onClickCapture={swap.swithTokens}
          borderRadius={'full'}
        >
          <ExpandArrowIcon />
        </Button>
      </Flex>
      <TokenInfo token={swap.to}></TokenInfo>

      <HStack my={6} justifyContent={'center'} flexWrap={'wrap'}>
        <Text fontSize="14px">
          1 {swap.to.symbol} = {(swap.to.price / swap.from.price).toFixed(4)} {swap.from.symbol}
        </Text>
        <Text paddingRight={2} fontSize="14px" textColor="text.low">
          ({useCurrency(swap.to.price)})
        </Text>
      </HStack>

      <Flex
        direction={'column'}
        maxW={'100%'}
        borderRadius={'3xl'}
        // divider={

        mb={8}
        boxShadow={
          'inset 0px -5px 10px rgba(134, 175, 255, 0.05), inset -9px 12px 24px rgba(13, 17, 23, 0.4)'
        }
      >
        <Box my={4} mx={8}>
          <Flex w={'100%'} justifyContent={'space-between'}>
            <Text whiteSpace={'pre-wrap'} mr={4} fontWeight={600} fontSize={'xl'}>
              Expected Output
            </Text>
            <Text fontWeight={600} fontSize={'xl'}>
              {(+swap.to.amount).toPrecision(5)} {swap.to.symbol}
            </Text>
          </Flex>
          <Flex w={'100%'} justifyContent={'space-between'}>
            <Text fontWeight={600} fontSize={'xl'}>
              Price Impact
            </Text>
            <Text fontWeight={600} fontSize={'xl'}>
              -{swap.slippageTolerance}%
            </Text>
          </Flex>
        </Box>
        <StackDivider
          border={'0px solid transparent'}
          borderRadius={'3xl'}
          style={{
            marginTop: '4px',
          }}
          mt={8}
          h={'1px'}
          w={'100%'}
          //bgColor={'transparent'}
          bg="strokeReflection"
          opacity={1}
          boxShadow={'1px 0px 2px #101317'}
        />
        <Box my={4} mx={8}>
          <Flex w={'100%'} justifyContent={'space-between'}>
            <Text whiteSpace={'pre-wrap'} mr={8} fontWeight={700} textColor="text.low">
              Minimum received after slippage
            </Text>
            <Text whiteSpace={'nowrap'} fontWeight={700} textColor="text.low">
              {(+swap.to.amount * (1 - swap.slippageTolerance / 100)).toFixed(6)} {swap.to.symbol}
            </Text>
          </Flex>
          <Flex w={'100%'} justifyContent={'space-between'}>
            <Text fontWeight={700} textColor="text.low">
              Network Fee
            </Text>
            <Text fontWeight={700} textColor="text.low">
              ~ {useGasPrice()}
            </Text>
          </Flex>
        </Box>
      </Flex>

      <Button
        shadow={
          '20px -20px 39px rgba(120, 182, 255, 0.25), 0px 5px 14px rgba(0, 0, 0, 0.47), inset 0px -10px 20px rgba(117, 164, 255, 0.5);'
        }
        fontSize="2xl"
        variant="primary"
        size="large"
        onClick={onConfirm}
        isFullWidth
      >
        Confirm Swap
      </Button>
    </>
  )
}

const TokenInfo = ({ token }: { token: Token }) => {
  return (
    <Flex
      p={4}
      borderRadius={'3xl'}
      justifyContent={'space-between'}
      boxShadow={
        'inset 0px -5px 10px rgba(134, 175, 255, 0.05), inset -9px 12px 24px rgba(13, 17, 23, 0.4)'
      }
    >
      <Box w={200}>
        <NumericInput disabled fontSize={'32px'} decimalScale={5} value={token.amount} />
        <Text textColor="text.low">{useCurrency(+token.amount * token.price)}</Text>
      </Box>
      <HStack>
        <TokenIcon size="32px" tokenName={token.symbol} />
        <Text fontSize={24} fontWeight={700}>
          {token.symbol.toUpperCase()}
        </Text>
      </HStack>
    </Flex>
  )
}
