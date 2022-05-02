import { Button, Text } from '@concave/ui'
import { commify } from 'ethers/lib/utils'

export const Balance = ({ value, onClick }: { value: string; onClick?: () => void }) => (
  <Button
    as={!!onClick ? Button : Text}
    fontSize="xs"
    ml="auto"
    onClick={onClick}
    rightIcon={!!onClick && +value && <Text textColor="#2E97E2">Max</Text>}
    _hover={!!onClick && { transform: 'scale(1.01)', color: 'text.high' }}
    _focus={!!onClick && { transform: 'scale(1.02)' }}
    _active={!onClick && { transform: 'none' }}
    leftIcon={<Text>Balance:</Text>}
    iconSpacing={1}
  >
    <Text isTruncated maxW="100px">
      {commify((+value).toFixed(2))}
    </Text>
  </Button>
)
