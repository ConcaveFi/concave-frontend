import { Box, Flex, FlexProps, gradientBorder, Text } from '@concave/ui'
import { FC } from 'react'

type VaultCapacityProps = { isSelected?: boolean }
export const VaultCapacity: FC<FlexProps & VaultCapacityProps> = ({ isSelected, ...props }) => {
  const borderVariant = isSelected ? 'primary' : 'secondary'
  const borderWidth = isSelected ? 4 : 2
  return (
    <Flex
      w="250px"
      h={'269px'}
      apply="background.glass"
      rounded={'2xl'}
      sx={{ ...gradientBorder({ borderWidth: borderWidth, variant: borderVariant }) }}
      mt={-16}
      //   fontWeight="bold"
      direction={'column'}
      justify="end"
      {...props}
      px={3}
      py={4}
    >
      <Text px={3} color={'text.small'} fontSize="sm" mb={6}>
        Farm-RAY-USDC delta-neutral. Just cover any impermanent loss. All investments are compounded
        dail
      </Text>
      <Flex justify={'space-between'} fontSize="sm">
        <Text>Current deposits</Text>
        <Text> 332,341 USDC</Text>
      </Flex>
      <Flex width={'full'} h="8px" rounded={'full'} apply="background.metal" my={1}>
        <Box width={'50%'} h="full" bg="stroke.accent" rounded={'inherit'}></Box>
      </Flex>
      <Flex justify={'space-between'} fontSize="sm">
        <Text>Vault capacity</Text>
        <Text> 500,000 USDC</Text>
      </Flex>
    </Flex>
  )
}
