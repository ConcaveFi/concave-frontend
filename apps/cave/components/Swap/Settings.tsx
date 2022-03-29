import { CnvQuestionIcon } from '@concave/icons'
import {
  Box,
  Button,
  Card,
  HStack,
  Input,
  InputGroup,
  InputRightAddon,
  Switch,
  Text,
  VStack,
} from '@concave/ui'
import React from 'react'
import { UseSwap } from './useSwap'

export const SwapSettings = ({ swap }: { swap: UseSwap }) => {
  const { expertMode, multihops, slippageTolerance, transactionDeadLine } = swap

  return (
    <>
      <VStack
        borderRadius="2xl"
        padding={4}
        gap={4}
        divider={<Box w="100%" h="2px" bg="strokeReflection" />}
      >
        <Text fontSize={'18px'}>Transactions Settings</Text>
        <VStack gap={3} align={'flex-start'}>
          <HStack align={'end'}>
            <VStack align={'flex-start'}>
              <Text fontSize={'sm'}>
                Slippage tolerance <QuestionIcon />
              </Text>
              <HStack>
                <Card boxShadow={'-1px 1px 5px rgba(255, 255, 255, 0.3)'}>
                  <InputGroup p={3} variant={'unstyled'} size="sm">
                    <Input
                      type="number"
                      value={slippageTolerance}
                      onChange={({ target }) => swap.set({ slippageTolerance: +target.value })}
                    />
                    <InputRightAddon>%</InputRightAddon>
                  </InputGroup>
                </Card>
                <Button
                  variant="primary.outline"
                  borderRadius={'2xl'}
                  height={'45px'}
                  backgroundColor={'whiteAlpha.200'}
                  padding={5}
                  margin={3}
                  size="xs"
                >
                  Auto
                </Button>
              </HStack>
            </VStack>
          </HStack>

          <HStack>
            <VStack align={'flex-start'}>
              <Text fontSize={'sm'}>
                Transaction deadline <QuestionIcon />
              </Text>
              <Card boxShadow={'-1px 1px 5px rgba(255, 255, 255, 0.3)'}>
                <InputGroup p={3} variant={'unstyled'} size="sm">
                  <Input
                    type="number"
                    value={`${transactionDeadLine}`}
                    onChange={({ target }) => swap.set({ transactionDeadLine: +target.value })}
                  />
                  <InputRightAddon>minutes</InputRightAddon>
                </InputGroup>
              </Card>
            </VStack>
          </HStack>

          <VStack align={'flex-start'} width={'100%'}>
            <Text fontWeight={'bold'} fontSize={'sm'}>
              Interface Settings
            </Text>
            <HStack justifyContent={'space-between'} width={'100%'}>
              <Text fontSize={'sm'}>
                Expert Mode <QuestionIcon />
              </Text>
              <Switch
                size="sm"
                isChecked={expertMode}
                onChange={() => swap.set({ expertMode: !expertMode })}
              />
            </HStack>
            <HStack justifyContent={'space-between'} width={'100%'}>
              <Text fontSize={'sm'}>
                Multihops
                <QuestionIcon />
              </Text>
              <Switch
                size="sm"
                isChecked={multihops}
                onChange={() => swap.set({ multihops: !multihops })}
              />
            </HStack>
          </VStack>
        </VStack>
      </VStack>
    </>
  )
}

export const QuestionIcon = () => (
  <CnvQuestionIcon
    filter="drop-shadow(-1px 1px 2px rgba(255, 255, 255, 0.25))"
    height={'18px'}
    width={'18px'}
    viewBox="0 0 16 16"
    ml={1}
  />
)
