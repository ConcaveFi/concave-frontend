import { ExpandArrowIcon } from '@concave/icons'
import { Button, Flex, Input, ScaleFade } from '@concave/ui'
import { useReducer } from 'react'

export const CustomRecipient = ({ onChangeRecipient }) => {
  const [isOpen, toggle] = useReducer((s) => !s, false)
  return (
    <Flex direction="column" align="center" w="100%">
      {isOpen ? (
        <Button
          onClick={() => (toggle(), onChangeRecipient())}
          variant="select"
          px={3}
          py={1}
          mb={1}
        >
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
      <ScaleFade in={isOpen} unmountOnExit style={{ width: '100%' }}>
        <Input
          onChange={(e) => onChangeRecipient(e.target.value)}
          placeholder="Recipient address"
        />
      </ScaleFade>
    </Flex>
  )
}
