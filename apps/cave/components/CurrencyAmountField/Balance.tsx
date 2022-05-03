import { Box, Button, Text } from '@concave/ui'

export const Balance = ({ value, onMax }: { value: string; onMax?: () => void }) => (
  <Button
    as={!!onMax ? Button : Box}
    fontSize="xs"
    ml="auto"
    onClick={onMax}
    rightIcon={!!onMax && <Text textColor="#2E97E2">Max</Text>}
    _hover={!!onMax && { transform: 'scale(1.01)', color: 'text.high' }}
    _focus={!!onMax && { transform: 'scale(1.02)' }}
    _active={!onMax && { transform: 'none' }}
    leftIcon={<Text>Balance:</Text>}
    iconSpacing={1}
  >
    <Text isTruncated maxW="100px">
      {value}
    </Text>
  </Button>
)
