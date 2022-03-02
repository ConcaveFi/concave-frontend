import { Button, ButtonProps, Text } from '@concave/ui'

export const MaxAmount = ({
  max,
  label,
  ...props
}: { max?: number; label: string } & ButtonProps) => (
  <Button
    borderRadius="full"
    py={1}
    px={3}
    gap={1}
    fontSize={12}
    fontWeight={500}
    backgroundColor="transparent"
    height="auto"
    textColor="grey.700"
    whiteSpace="nowrap"
    {...props}
  >
    <Text textColor={'text.low'}>
      {label} {max}
    </Text>
    <Text textColor={'text.highlight'}>Max</Text>
  </Button>
)
