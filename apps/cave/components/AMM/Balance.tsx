import { Button, Text } from '@concave/ui'
import { commify } from 'ethers/lib/utils'

export const Balance = ({ value, onClick }: { value: string; onClick?: () => void }) => (
  <Button
    fontSize="xs"
    ml="auto"
    onClick={onClick}
    isDisabled={!+value}
    rightIcon={!!onClick && +value && <Text textColor="#2E97E2">Max</Text>}
    _focus={{ transform: 'scale(1.02)' }}
    leftIcon={<Text>Balance:</Text>}
    iconSpacing={1}
  >
    <Text isTruncated maxW="100px">
      {commify((+value).toFixed(2))}
    </Text>
  </Button>
)
