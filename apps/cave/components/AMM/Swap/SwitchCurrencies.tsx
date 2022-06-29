import { ExpandArrowIcon } from '@concave/icons'
import { Flex, Button } from '@concave/ui'

export const SwitchCurrencies = ({ onClick }) => {
  return (
    <Flex align="center" justify="center">
      <Button
        variant="select"
        px={3.5}
        py={2}
        bgColor="blackAlpha.100"
        onClick={onClick}
        aria-label="switch currencies"
      >
        <ExpandArrowIcon />
      </Button>
    </Flex>
  )
}
