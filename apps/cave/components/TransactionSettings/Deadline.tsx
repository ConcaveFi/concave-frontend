import { QuestionIcon } from '@concave/icons'
import {
  Card,
  HStack,
  InputGroup,
  InputRightAddon,
  NumericInput,
  Stack,
  Text,
  Tooltip,
} from '@concave/ui'

export const Deadline = ({
  value,
  placeholder,
  onValueChange,
}: {
  value: number
  placeholder: number
  onValueChange: (n: number) => void
}) => {
  return (
    <Stack align="start">
      <HStack>
        <Text fontSize="sm">Transaction deadline</Text>
        <Tooltip
          label="Your transaction will revert if it is pending for more than this period of time."
          shouldWrapChildren
        >
          <QuestionIcon />
        </Tooltip>
      </HStack>
      <Card shadow="Down Big" borderRadius="xl">
        <InputGroup px={3} variant="unstyled" size="sm">
          <NumericInput
            value={value}
            isNumericString
            placeholder={`${placeholder}`}
            decimalScale={4}
            maxLength={7}
            size="medium"
            variant="unstyled"
            onValueChange={({ floatValue }, { source }) =>
              source === 'event' && onValueChange(floatValue)
            }
          />
          <InputRightAddon fontFamily="body" color="text.low" fontWeight="semibold">
            minutes
          </InputRightAddon>
        </InputGroup>
      </Card>
    </Stack>
  )
}
