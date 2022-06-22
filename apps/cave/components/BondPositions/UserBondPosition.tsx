import { Flex } from '@chakra-ui/react'
import { BondDataCard } from './BondDataCard'
import { BondedCard } from './BondedCard'

// All types "Variants", it's just to create different versions of a mock
// Evertyhing will be overwritted later.
type Variants = 'listed' | 'pending'
type UserBondPositions = { variant: Variants }
export const UserBondPosition: React.FC<UserBondPositions> = ({ variant }) => {
  return (
    <Flex direction={'column'}>
      <BondedCard variant={variant} />
      <BondDataCard variant={variant} mt={-100} zIndex={2} />
    </Flex>
  )
}
