import { ExpandArrowIcon } from '@concave/icons'
import { Flex, Button } from '@concave/ui'

export const SwitchCurrencies = ({ onClick }) => {
  return (
    <Flex align="center" justify="center">
      <Button
        shadow="Up Small"
        _focus={{ shadow: 'Up Big' }}
        _hover={{ shadow: 'Up Big' }}
        _active={{ shadow: 'down' }}
        px={3.5}
        py={2}
        bgColor="blackAlpha.100"
        rounded="3xl"
        onClick={onClick}
      >
        <ExpandArrowIcon />
      </Button>
    </Flex>
  )
}
