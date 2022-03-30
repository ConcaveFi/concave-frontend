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
import { useRoundPrecision } from 'hooks/usePrecision'
import React from 'react'
import { ConfirmSwap } from './ConfirmSwap'
import { MaxAmount } from './MaxAmount'
import { SwapSettings } from './Settings'
import { TokenInput } from './TokenInput'
import { TransactionStatus } from './TransactionStatus'
import { TransactionSubmitted } from './TransactionSubmitted'
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
  const submitted = useDisclosure()
  return (
    <Card gap={2} p={6} h="fit-content" shadow="Block Up" {...cardProps}>
      <TokenInput
        value={'' + swap.fromAmount}
        price={swap.from.price}
        selected={swap.from}
        onChangeValue={swap.setFromAmount}
        onSelectToken={(t) => swap.setFromSymbol(t.symbol)}
      >
        <MaxAmount
          label="Balance:"
          max={+swap.from.balance?.formatted}
          onClick={() => swap.setFromAmount(swap.from.balance?.formatted)}
        />
      </TokenInput>
      <Switch swap={swap} />
      <TokenInput
        value={'' + swap.toAmount}
        price={swap.to.price}
        selected={swap.to}
        onChangeValue={swap.setToAmount}
        onSelectToken={(t) => swap.setToSymbol(t.symbol)}
      >
        <Text
          py={1}
          px={3}
          fontWeight={400}
          fontSize={'xs'}
          textAlign={'right'}
          textColor="text.low"
        >
          Balance: {useRoundPrecision(+swap.to.balance?.formatted).formatted}
        </Text>
      </TokenInput>
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
              1 {swap.to.symbol} = {useRoundPrecision(swap.to.price / swap.from.price).formatted}{' '}
              {swap.from.symbol}
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
        bodyProps={{
          alignItems: 'center',
          gap: 1,
          shadow: 'Up for Blocks',
        }}
      >
        <TransactionStatus
          swap={swap}
          onClose={() => {
            status.onClose()
            submitted.onOpen()
          }}
        ></TransactionStatus>
      </Modal>

      <Modal
        bluryOverlay={true}
        title="Confirm Swap"
        isOpen={confirm.isOpen}
        onClose={confirm.onClose}
        bodyProps={{
          gap: 2,
          shadow: 'Up for Blocks',
        }}
      >
        <ConfirmSwap
          swap={swap}
          onConfirm={() => {
            status.onOpen()
            confirm.onClose()
          }}
        />
      </Modal>

      <Modal
        bluryOverlay={true}
        title="Confirm Swap"
        isOpen={submitted.isOpen}
        onClose={submitted.onClose}
        bodyProps={{
          alignItems: 'center',
          shadow: 'Up for Blocks',
        }}
      >
        <TransactionSubmitted
          swap={swap}
          onClose={() => {
            submitted.onClose()
          }}
        />
      </Modal>

      <Button variant="primary" size="large" isFullWidth onClick={confirm.onOpen}>
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
        onClickCapture={swap.switchTokens}
        borderRadius={'full'}
      >
        <ExpandArrowIcon />
      </Button>
    </Flex>
  )
}
