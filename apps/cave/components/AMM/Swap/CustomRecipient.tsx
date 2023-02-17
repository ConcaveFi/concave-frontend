import { ExpandArrowIcon } from '@concave/icons'
import {
  Button,
  Collapse,
  Flex,
  HStack,
  Input,
  Spinner,
  Stack,
  Text,
  useMultiStyleConfig,
} from '@concave/ui'
import { isAddress } from 'ethers/lib/utils'
import { useReducer, useRef, useState } from 'react'
import { useDebounce } from 'usehooks-ts'
import { useEnsAddress } from 'wagmi'

export const useCustomRecipient = () => {
  const [inputValue, onChangeInput] = useState('')
  const debouncedValue = useDebounce(inputValue, 500)

  const { data: ensAddress, isLoading } = useEnsAddress({
    name: debouncedValue,
    enabled: !isAddress(debouncedValue),
  })

  const isInputAddress = isAddress(inputValue)
  const isValidEns = isAddress(ensAddress)

  return {
    inputValue,
    onChangeInput,
    name: isValidEns ? debouncedValue : undefined,
    address: isInputAddress ? inputValue : ensAddress,
    isValid: isInputAddress || isValidEns,
    reset: () => onChangeInput(''),
    isLoading,
  }
}

export const CustomRecipient = ({
  name,
  address,
  onChangeInput,
  reset,
  isValid,
  isLoading,
}: ReturnType<typeof useCustomRecipient>) => {
  const [isOpen, toggle] = useReducer((s) => !s, false)

  const styles = useMultiStyleConfig('Input', { variant: 'primary', size: 'medium' })

  const inputRef = useRef(null)

  return (
    <Flex direction="column" align="center" w="100%">
      {isOpen ? (
        <Button onClick={() => (toggle(), reset())} variant="select" px={3} mb={2}>
          <ExpandArrowIcon w="12px" />
        </Button>
      ) : (
        <Button
          onClick={() => (toggle(), setTimeout(() => inputRef.current.focus()))}
          py={1}
          px={2}
          rounded="lg"
          _hover={{ bg: 'blackAlpha.400' }}
          fontSize="xs"
          fontWeight="medium"
          color="text.accent"
        >
          Custom recipient
        </Button>
      )}
      <Collapse in={isOpen} unmountOnExit style={{ overflow: 'visible', width: '100%' }}>
        <HStack
          sx={{ ...styles.field, bg: 'none' }}
          justify="space-between"
          onClick={() => inputRef.current.focus()}
          cursor="text"
        >
          <Stack spacing={1} w="100%">
            <Input
              ref={inputRef}
              variant="unstyled"
              py={1}
              my={-1}
              onChange={(e) => onChangeInput(e.target.value)}
              placeholder="Recipient address"
            />
            {name && (
              <Text color="text.low" fontSize="xs" onClick={(e) => e.stopPropagation()}>
                {address}
              </Text>
            )}
          </Stack>
          {isLoading && <Spinner size="sm" speed="1s" color="text.low" />}
        </HStack>
      </Collapse>
    </Flex>
  )
}
