import { Flex, Heading, Text } from '@concave/ui'

export function LiquidDashboardHeader() {
  return (
    <>
      <Heading apply="background.text-brightBlue" fontWeight={'semibold'} mt={8} fontSize="5xl">
        Liquid stake positions
      </Heading>
      <Flex mt={3} mb={8} justify={'center'} maxWidth={{ sm: '358px', lg: '1000px' }}>
        <Text textAlign="center" apply="background.text-brightBlue">
          This is the user dashboard to claim dividends and manage your liquid NFT positions.
        </Text>
      </Flex>
    </>
  )
}
