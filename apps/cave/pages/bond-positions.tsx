import { Flex } from '@chakra-ui/react'
import { UserBondPosition } from 'components/BondPositions/UserBondPosition'

export default function BondsPositions() {
  return (
    <Flex direction={'column'} align={'center'} gap={6} justify="center" width={'full'}>
      <UserBondPosition variant={'pending'} />
      <UserBondPosition variant={'listed'} />
    </Flex>
  )
}
