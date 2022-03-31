import { ExpandArrowIcon, TokenIcon } from '@concave/icons'
import { Box, Flex, HStack, IconButton, Modal, NumericInput, Text } from '@concave/ui'
import { useCurrency } from 'hooks/useCurrency'
import { useGasPrice } from 'hooks/useGasPrice'
import { useFloorPrecision, useRoundPrecision } from 'hooks/usePrecision'
import React from 'react'
import { Token, UseSwap } from './useSwap'

const TokenInfo = ({
  token,
  amount,
  loss,
}: {
  token: Token
  amount: string | number
  loss?: number
}) => {
  return (
    <Flex
      borderRadius={'3xl'}
      justifyContent={'space-between'}
      boxShadow={'Down Medium'}
      px={5}
      p={4}
    >
      <Box w={200}>
        <NumericInput disabled fontSize={'32px'} decimalScale={5} value={amount} />
        <Text fontWeight={700} fontSize={14} textColor="text.low">
          {useCurrency(+amount * token.price)}
          {loss && ` (-${loss}%)`}
        </Text>
      </Box>
      <HStack>
        <TokenIcon size="sm" {...token} />
        <Text fontSize={24} fontWeight={700}>
          {token.token.symbol.toUpperCase()}
        </Text>
      </HStack>
    </Flex>
  )
}

const SwapButton = ({ swap }: { swap: UseSwap }) => (
  <Flex justifyContent={'center'}>
    <IconButton
      variant="secondary"
      shadow={'Up Small'}
      borderRadius={'full'}
      bgGradient="linear(to-l, secondary.75, secondary.150)"
      w={'35px'}
      h={'30px'}
      onClick={swap.switchTokens}
      m={-8}
      aria-label="Search database"
      icon={<ExpandArrowIcon h={'100%'} />}
    />
  </Flex>
)

const MinExpectedOutput = ({ swap }: { swap: UseSwap }) => {
  return (
    <Box>
      <Flex fontSize={'14px'} w={'100%'} mb={2} justifyContent={'space-between'}>
        <Text whiteSpace={'pre-wrap'} mr={8} fontWeight={700} textColor="text.low">
          Minimum received after slippage
        </Text>
        <Text whiteSpace={'nowrap'} fontWeight={700} textColor="text.low">
          {useFloorPrecision(swap.minimumReceivedAfterSlippage).formatted} {swap.to.token.symbol}
        </Text>
      </Flex>
      <Flex fontSize={'14px'} w={'100%'} justifyContent={'space-between'}>
        <Text fontWeight={700} textColor="text.low">
          Network Fee
        </Text>
        <Text fontWeight={700} textColor="text.low">
          ~ {useGasPrice()}
        </Text>
      </Flex>
    </Box>
  )
}
const ExpectedOutput = ({ swap }: { swap: UseSwap }) => {
  return (
    <Box>
      <Flex fontSize={'18px'} w={'100%'} justifyContent={'space-between'}>
        <Text whiteSpace={'pre-wrap'} mr={4} fontWeight={600}>
          Expected Output
        </Text>
        <Text fontWeight={600}>
          {useRoundPrecision(swap.toAmount).formatted} {swap.to.token.symbol}
        </Text>
      </Flex>
      <Flex w={'100%'} justifyContent={'space-between'}>
        <Text fontWeight={600}>Price Impact</Text>
        <Text fontWeight={600}>-{swap.slippageTolerance}%</Text>
      </Flex>
    </Box>
  )
}

export const ConfirmSwap = ({ isOpen, onClose }) => {
  return (
    <Modal
      bluryOverlay={true}
      title="Confirm Swap"
      isOpen={isOpen}
      onClose={onClose}
      bodyProps={{
        gap: 2,
        shadow: 'Up for Blocks',
      }}
    >
      {/* <TokenInfo token={swap.from} amount={swap.fromAmount}></TokenInfo>
      <SwapButton swap={swap} />
      <TokenInfo token={swap.to} amount={swap.toAmount} loss={0.26}></TokenInfo>

      <HStack fontSize="14px" fontWeight={700} my={6} justifyContent={'center'} flexWrap={'wrap'}>
        <Text>
          1 {swap.to.symbol} = {useRoundPrecision(swap.to.price / swap.from.price).formatted}{' '}
          {swap.from.symbol}
        </Text>
        <Text paddingRight={2} textColor="text.low">
          ({useCurrency(swap.to.price)})
        </Text>
      </HStack>

      <Flex direction={'column'} borderRadius={'3xl'} mb={8} p={6} boxShadow={'Down Medium'}>
        <ExpectedOutput swap={swap} />
        <StackDivider borderRadius={'full'} mx={-4} my={4} h={0.5} bg={'stroke.secondary'} />
        <MinExpectedOutput swap={swap} />
      </Flex>

      <Button variant="primary" size="large" onClick={onConfirm} isFullWidth>
        Confirm Swap
      </Button> */}
    </Modal>
  )
}
