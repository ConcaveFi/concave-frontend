import { Flex, Text } from '@chakra-ui/react'
import { Card } from '@concave/ui'
import { PreferredBondTable } from './PreferredBondTable'

export const BondPreferredCard = () => {
  return (
    <Card width={'632px'} height="466px" ml={'60px'} variant="secondary">
      <Text mx={'auto'} my={8} fontSize="32px" fontWeight={'bold'}>
        Select a preferred bond
      </Text>
      <PreferredBondTable />
    </Card>
  )
}
