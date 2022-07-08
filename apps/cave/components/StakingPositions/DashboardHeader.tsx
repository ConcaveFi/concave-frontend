import { Flex, Heading, Text } from '@concave/ui'

export function DashboardHeader() {
  return (
    <>
      <Heading as="h1" mt={8} mb={3} fontSize="5xl">
        Liquid Stake Positions
      </Heading>
      <Flex my={3} justify={'center'} maxWidth={{ sm: '358px', lg: '1000px' }}>
        <Text textAlign="center">
          This is the user dashboard to claim dividends and manage your liquid NFT positions.
        </Text>
      </Flex>
    </>
  )
}
