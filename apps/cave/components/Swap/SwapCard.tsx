import { Popover, PopoverBody, PopoverContent, PopoverTrigger, Stack } from '@chakra-ui/react'
import { ExpandArrowIcon, GasIcon, SwapSettingsIcon } from '@concave/icons'
import {
  Button,
  Card,
  CardProps,
  Flex,
  HStack,
  Modal,
  StackDivider,
  Text,
  useDisclosure,
} from '@concave/ui'
import { useCurrency } from 'hooks/useCurrency'
import { useGasPrice } from 'hooks/useGasPrice'
import React from 'react'
import { ConfirmSwap } from './ConfirmSwap'
import { Input } from './Input'
import { MaxAmount } from './MaxAmount'
import { SwapSettingsCard } from './SwapSettingsCard'
import { TransactionStatus } from './TransactionStatus'
import { UseSwap } from './useSwap'

export function SwapCard({
  buttonLabel,
  swap,
  active,
  ...cardProps
}: {
  buttonLabel: string
  active: string
  swap: UseSwap
} & CardProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const status = useDisclosure()
  return (
    <Card {...cardProps}>
      <Input
        token={swap.from}
        maxAmount={swap.from.maxAmount}
        onChangeValue={(amount) => {
          swap.setFrom({ ...swap.from, amount })
        }}
        tokenOptions={swap.inputTokens}
        onSelectToken={(symbol) => swap.setFrom({ ...swap.from, symbol })}
      >
        <MaxAmount
          label="Balance:"
          max={swap.from.maxAmount}
          onClick={() => swap.setFrom({ ...swap.from, amount: swap.from.maxAmount })}
        />
      </Input>
      <Flex align="center" justify="center">
        <Button
          shadow={'Up Small'}
          _focus={{ boxShadow: 'Up Small' }}
          as={Button}
          padding={'4px 14px 4px 14px'}
          bgColor="rgba(156, 156, 156, 0.01);"
          minW="43"
          maxH="26"
          onClickCapture={swap.swithTokens}
          borderRadius={'full'}
        >
          <ExpandArrowIcon />
        </Button>
      </Flex>
      <Input
        token={swap.to}
        tokenOptions={swap.outputTokens}
        onChangeValue={(amount) => swap.setTo({ ...swap.to, amount })}
        onSelectToken={(symbol) => {
          swap.setTo({ ...swap.to, symbol })
        }}
      >
        <Text
          py={1}
          px={3}
          fontWeight={400}
          fontSize={'xs'}
          textAlign={'right'}
          textColor="text.low"
        >
          Balance: {swap.to.maxAmount}
        </Text>
      </Input>
      <HStack
        divider={
          <StackDivider
            border={'0px solid transparent'}
            borderRadius={'3xl'}
            style={{
              marginTop: '4px',
            }}
            mt={8}
            h={'32px'}
            w={'2px'}
            bgColor={'transparent'}
            boxShadow={'1px 0px 2px #101317'}
          />
        }
        align="center"
        justify="center"
      >
        <HStack>
          <HStack justifyContent={'center'} flexWrap={'wrap'}>
            <Text fontSize="xs">
              1 {swap.to.symbol} = {(swap.to.price / swap.from.price).toFixed(4)} {swap.from.symbol}
            </Text>
            <Text paddingRight={2} fontSize="xs" textColor="text.low">
              ({useCurrency(swap.to.price)})
            </Text>
          </HStack>
          <GasIcon viewBox="0 0 16 16" />
          <Text fontSize="xs" textColor="text.low">
            {useGasPrice()}
          </Text>
        </HStack>

        <Popover>
          <PopoverTrigger>
            <SwapSettingsIcon viewBox="0 0 20 25" cursor={'pointer'} />
          </PopoverTrigger>
          <PopoverContent
            backdropFilter={'blur(15px)'}
            bg={'transparent'}
            borderRadius={'2xl'}
            h={400}
            w={'300px'}
          >
            <PopoverBody as={Card} variant="secondary" h={400} w={'300px'}>
              <SwapSettingsCard swap={swap}></SwapSettingsCard>
            </PopoverBody>
          </PopoverContent>
        </Popover>
        {/* 
        <SwapSettingsModal>
          <SwapSettingsIcon viewBox="0 0 20 25" cursor={'pointer'} />
          <SwapSettingsCard swap={swap}></SwapSettingsCard>
        </SwapSettingsModal> */}
      </HStack>

      <Modal
        bluryOverlay={true}
        title="Confirm Swap"
        isOpen={status.isOpen}
        onClose={status.onClose}
        sx={{ alignItems: 'center' }}
      >
        <TransactionStatus swap={swap} onClose={status.onClose}></TransactionStatus>
      </Modal>

      <Modal
        bluryOverlay={true}
        title="Confirm Swap"
        isOpen={isOpen}
        onClose={onClose}
        sx={{ gap: 2 }}
      >
        <ConfirmSwap
          swap={swap}
          onConfirm={() => {
            status.onOpen()
            onClose()
          }}
        />
      </Modal>

      <Button
        shadow={
          '20px -20px 39px rgba(120, 182, 255, 0.25), 0px 5px 14px rgba(0, 0, 0, 0.47), inset 0px -10px 20px rgba(117, 164, 255, 0.5);'
        }
        fontSize="2xl"
        variant="primary"
        size="large"
        isFullWidth
        onClick={onOpen}
      >
        {buttonLabel}
      </Button>
    </Card>
  )
}
