import { Flex, Text } from '@chakra-ui/react'
import { UserBondPosition } from 'components/BondPositions/UserBondPosition'

export default function BondsPositions() {
  return (
    <Flex direction={'column'} align={'center'} gap={6} justify="center" width={'full'}>
      <Text fontWeight={'bold'} fontSize="5xl">
        Your Bond Positions
      </Text>
      <UserBondPosition variant={'pending'} />
      <UserBondPosition variant={'listed'} />
    </Flex>
  )
}
