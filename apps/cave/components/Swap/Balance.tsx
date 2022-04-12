import { Button, Text } from '@concave/ui'

export const Balance = ({ value, onClick }: { value: string; onClick?: () => void }) => (
  <Button
    fontSize="xs"
    ml="auto"
    onClick={onClick}
    rightIcon={!!onClick && +value && <Text textColor="#2E97E2">Max</Text>}
    leftIcon={<Text>Balance:</Text>}
    iconSpacing={1}
  >
    <Text isTruncated maxW="50px">
      {(+value).toFixed(2)}
    </Text>
  </Button>
)
