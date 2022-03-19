import { Popover, PopoverBody, PopoverContent, PopoverTrigger, Portal } from '@chakra-ui/react'
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
import { SwapSettings } from './SwapSettingsCard'
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
  const confirm = useDisclosure()
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
      <Switch swap={swap} />
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
            borderColor={'transparent'}
            bg={'stroke.secondary'}
            boxShadow={'1px 0px 2px #101317'}
            borderRadius={'3xl'}
            style={{
              marginTop: '4px',
            }}
            mt={8}
            h={8}
            w={0.5}
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
            <Button>
              <SwapSettingsIcon viewBox="0 0 20 25" cursor={'pointer'} />
            </Button>
          </PopoverTrigger>
          <Portal>
            <PopoverContent backdropFilter={'blur(15px)'} bg={'transparent'} borderRadius={'2xl'}>
              <PopoverBody id="b" as={Card} minH={'400'} h={400} variant="secondary">
                <SwapSettings swap={swap} />
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </Popover>
      </HStack>

      <Modal
        bluryOverlay={true}
        title="Confirm Swap"
        isOpen={status.isOpen}
        onClose={status.onClose}
        sx={{ alignItems: 'center', gap: 1 }}
      >
        <TransactionStatus swap={swap} onClose={status.onClose}></TransactionStatus>
      </Modal>

      <Modal
        bluryOverlay={true}
        title="Confirm Swap"
        isOpen={confirm.isOpen}
        onClose={confirm.onClose}
        sx={{ gap: 2 }}
      >
        <ConfirmSwap
          swap={swap}
          onConfirm={() => {
            status.onOpen()
            confirm.onClose()
          }}
        />
      </Modal>

      <Button variant="Bright Button" size="large" isFullWidth onClick={confirm.onOpen}>
        {buttonLabel}
      </Button>
    </Card>
  )
}

const Switch = ({ swap }: { swap: UseSwap }) => {
  return (
    <Flex align="center" justify="center">
      <Button
        shadow={'Up Small'}
        _focus={{ boxShadow: 'Up Small' }}
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
  )
}
