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
    fontSize={'xs'}
    fontWeight={400}
    backgroundColor="transparent"
    height="auto"
    whiteSpace="nowrap"
    {...props}
  >
    <Text fontSize={'xs'} textColor={'text.low'}>
      {label} {max}
    </Text>
    <Text fontSize={'xs'} textColor={'#2E97E2'}>
      Max
    </Text>
  </Button>
)
