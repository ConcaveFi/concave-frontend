import { Button, ButtonProps, Text } from '@concave/ui'

export const TokenBalance = ({
  value,
  onClick,
}: { value?: string; onClick?: () => void | undefined } & ButtonProps) => (
  <Button
    borderRadius="full"
    py={1}
    mx={-3}
    px={3}
    gap={1}
    backgroundColor="transparent"
    height="auto"
    fontSize="xs"
    whiteSpace="nowrap"
    textColor="text.low"
    onClick={onClick}
    isDisabled={!onClick}
  >
    <Text>Balance:</Text>
    <Text isTruncated maxW="50px">
      {value}
    </Text>
    {!!onClick && <Text textColor="#2E97E2">Max</Text>}
  </Button>
)
