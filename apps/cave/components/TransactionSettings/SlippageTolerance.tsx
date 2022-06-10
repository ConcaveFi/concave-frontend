import { QuestionIcon } from '@concave/icons'
import {
  Button,
  Card,
  HStack,
  InputGroup,
  InputRightAddon,
  NumericInput,
  Stack,
  Text,
  Tooltip,
} from '@concave/ui'
import { toPercent } from 'utils/toPercent'

type SlippageToleranceProps = {
  value: number
  onValueChange: ({ value: number, percent: Percent }) => void
  onClickAuto: () => void
  maxSlippage?: number
}

export const SlippageTolerance = ({
  value,
  onValueChange,
  onClickAuto,
  maxSlippage = 50,
}: SlippageToleranceProps) => {
  return (
    <Stack align="flex-start">
      <HStack>
        <Text fontSize="sm">Slippage tolerance</Text>
        <Tooltip
          label="Your transaction will revert if the price changes unfavorably by more than this percentage."
          bg="gray.900"
          color="white"
          placement="bottom"
          position="relative"
          shouldWrapChildren
        >
          <QuestionIcon w="18px" h="18px" />
        </Tooltip>
      </HStack>
      <HStack>
        <Card shadow="Down Big" borderRadius="xl">
          <InputGroup px={3} variant="unstyled" size="sm" h="full">
            <NumericInput
              value={value}
              placeholder="0.50"
              variant="unstyled"
              decimalScale={2}
              isAllowed={({ value, floatValue }) =>
                value === '' || (floatValue < maxSlippage && !!toPercent(floatValue))
              }
              size="medium"
              onValueChange={({ floatValue }) =>
                onValueChange({ value: floatValue, percent: toPercent(floatValue) })
              }
            />
            <InputRightAddon color="text.low" fontWeight="semibold">
              %
            </InputRightAddon>
          </InputGroup>
        </Card>

        <Button
          onClick={onClickAuto}
          variant="primary.outline"
          backgroundColor="whiteAlpha.200"
          p={3}
          fontSize="sm"
        >
          Auto
        </Button>
      </HStack>
      (
      <Text fontSize="sm" color="text.low" aria-live="assertive" aria-relevant="additions removals">
        {value < 0.05 && value > 0 && `The transaction may fail`}
        {value > 2 && `The transaction may be frontrun`}
      </Text>
      )
    </Stack>
  )
}
