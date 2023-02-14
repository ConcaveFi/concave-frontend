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
import { useReducer, useRef } from 'react'
import { usePrevious } from 'react-use'
import { useDebounce } from 'usehooks-ts'
import { Address, useEnsAddress } from 'wagmi'

export const CustomRecipient = ({
  onChangeRecipient,
}: {
  onChangeRecipient: (r?: Address) => void
}) => {
  const [isOpen, toggle] = useReducer((s) => !s, false)

  const [recipient, setRecipient] = useReducer((_, r) => {
    // if user types an address, set it as recipient
    if (isAddress(r)) onChangeRecipient(r)
    return r
  }, '')
  const debouncedRecipient = useDebounce(recipient, 500)

  const { data: ensAddress, isLoading } = useEnsAddress({
    name: debouncedRecipient,
    enabled: !isAddress(debouncedRecipient),
  })
  // if user types an ens name,
  // check if it resolved to an address and is not the same as the previous render (to avoid infinite loops)
  const prevEnsAddress = usePrevious(ensAddress)
  if (prevEnsAddress !== ensAddress && isAddress(ensAddress)) onChangeRecipient(ensAddress)

  const styles = useMultiStyleConfig('Input', { variant: 'primary', size: 'medium' })

  const inputRef = useRef(null)

  return (
    <Flex direction="column" align="center" w="100%">
      {isOpen ? (
        <Button onClick={() => (toggle(), onChangeRecipient(null))} variant="select" px={3} mb={2}>
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
              onChange={(e) => setRecipient(e.target.value)}
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
