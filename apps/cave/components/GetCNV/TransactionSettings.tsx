import {
  Box,
  Button,
  HStack,
  Input,
  InputGroup,
  InputRightAddon,
  Modal,
  ModalContent,
  ModalOverlay,
  Switch,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { Card } from '@concave/ui'
import { SettingsIcon2, CnvQuestionIcon } from '@concave/icons'
import { SwapState } from 'hooks/useSwap'

export const TransitionSettingsModalButton = (props: { swap: SwapState }) => {
  const { swap } = props
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button
        borderRadius={'3xl'}
        margin={0}
        padding={0}
        backgroundColor={'transparent'}
        onClick={onOpen}
      >
        <SettingsIcon2 viewBox="0 0 20 25" cursor={'pointer'} />
      </Button>
      <Modal isCentered onClose={onClose} isOpen={isOpen} motionPreset="slideInBottom">
        <ModalOverlay />
        <ModalContent width={'255px'} borderRadius={'3xl'}>
          <TansactionSettings swap={swap} />
        </ModalContent>
      </Modal>
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

export const TansactionSettings = (props: { swap: SwapState }) => {
  const {
    expertMode,
    multihops,
    slippageTolerance,
    transactionDeadLine,
    setSlippageTolerance,
    setExpertMode,
    setMultihops,
    setTransactionDeadLine,
  } = props.swap

  return (
    <Card id="find" bgImage="/assets/blackboard.png">
      <VStack
        borderRadius="3xl"
        padding={4}
        gap={4}
        divider={<Box w="100%" h="2px" bg="strokeReflection" />}
        backdropFilter="blur(3px)"
      >
        <Text fontSize={'18px'}>Transactions Settings</Text>
        <VStack gap={3} align={'flex-start'}>
          <HStack align={'end'}>
            <VStack align={'flex-start'}>
              <Text fontSize={'sm'}>
                Slippage tolerance <QuestionIcon />
              </Text>
              <HStack>
                <Card boxShadow={'low'}>
                  <InputGroup p={3} variant={'unstyled'} size="sm">
                    <Input
                      type="number"
                      defaultValue={'0.50'}
                      value={slippageTolerance}
                      onChange={({ target }) => setSlippageTolerance(+target.value)}
                    />
                    <InputRightAddon>%</InputRightAddon>
                  </InputGroup>
                </Card>
                <Button
                  variant="primary.outline"
                  borderRadius={'xl'}
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
              <Card boxShadow={'low'}>
                <InputGroup p={3} variant={'unstyled'} size="sm">
                  <Input
                    defaultValue="30"
                    type="number"
                    value={`${transactionDeadLine}`}
                    onChange={({ target }) => setTransactionDeadLine(+target.value)}
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
              <Switch isChecked={expertMode} onChange={() => setExpertMode(!expertMode)} />
            </HStack>
            <HStack justifyContent={'space-between'} width={'100%'}>
              <Text fontSize={'sm'}>
                Multihops
                <QuestionIcon />
              </Text>
              <Switch isChecked={multihops} onChange={() => setMultihops(!multihops)} />
            </HStack>
          </VStack>
        </VStack>
      </VStack>
    </Card>
  )
}
