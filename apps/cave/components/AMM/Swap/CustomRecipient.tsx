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
import { useEnsAddress } from 'wagmi'

export const CustomRecipient: React.FC<{ onChangeRecipient: (address?: string) => void }> = ({
  onChangeRecipient,
}) => {
  const [isOpen, toggle] = useReducer((s) => !s, false)

  const [recipient, setRecipient] = useState('')

  const { data: ensAddress, isLoading } = useEnsAddress({
    name: recipient,
    enabled: !isAddress(recipient),
    onSuccess: (address) => {
      onChangeRecipient(address)
    },
  })

  const styles = useMultiStyleConfig('Input', { variant: 'primary', size: 'medium' })

  const inputRef = useRef(null)

  return (
    <Flex direction="column" align="center" w="100%">
      {isOpen ? (
        <Button onClick={() => (toggle(), onChangeRecipient())} variant="select" px={3} mb={2}>
          <ExpandArrowIcon w="12px" />
        </Button>
      ) : (
        <Button
          onClick={toggle}
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
              onChange={(e) => {
                const value = e.target.value
                setRecipient(value)
                if (isAddress(value)) onChangeRecipient(value)
              }}
              placeholder="Recipient address"
            />
            {ensAddress && (
              <Text color="text.low" fontSize="xs" onClick={(e) => e.stopPropagation()}>
                {ensAddress}
              </Text>
            )}
          </Stack>
          {isLoading && <Spinner size="sm" speed="1s" color="text.low" />}
        </HStack>
      </Collapse>
    </Flex>
  )
}

export default CustomRecipient
