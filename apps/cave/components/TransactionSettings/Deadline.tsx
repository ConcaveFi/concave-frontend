import { QuestionIcon } from '@concave/icons'
import { Card, InputGroup, InputRightAddon, NumericInput, Stack, Text } from '@concave/ui'

export const Deadline = ({ value, onValueChange }) => {
  return (
    <Stack align="start">
      <Text fontSize="sm">
        Transaction deadline <QuestionIcon />
      </Text>
      <Card shadow="Down Big" borderRadius="xl">
        <InputGroup px={3} variant="unstyled" size="sm">
          <NumericInput
            value={value}
            isNumericString
            placeholder="30"
            decimalScale={4}
            maxLength={7}
            size="medium"
            variant="unstyled"
            onValueChange={onValueChange}
          />
          <InputRightAddon fontFamily="body" color="text.low" fontWeight="semibold">
            minutes
          </InputRightAddon>
        </InputGroup>
      </Card>
    </Stack>
  )
}
