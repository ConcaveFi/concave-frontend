import { Button, ButtonProps, Text } from '@concave/ui'

export const MaxAmount = ({
  max,
  label,
  ...props
}: { max?: string; label: string } & ButtonProps) => (
  <Button
    borderRadius="full"
    py={1}
    px={3}
    gap={1}
    fontSize="xs"
    backgroundColor="transparent"
    height="auto"
    whiteSpace="nowrap"
    textColor="text.low"
    {...props}
  >
    <Text>{label}</Text>
    <Text isTruncated maxW="50px">
      {max}
    </Text>
    <Text textColor="#2E97E2">Max</Text>
  </Button>
)
