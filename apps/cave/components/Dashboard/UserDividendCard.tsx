import { Box, Button, Flex, Spinner, Text } from '@concave/ui'
import { useState } from 'react'

interface UserDividendCardProps {
  totalLocked: number
  statusData: { isLoading; success; notConnected }
}
const UserDividendCard = (props: UserDividendCardProps) => {
  const { statusData } = props
  const { isLoading, success, notConnected } = statusData

  const totalLocked = notConnected
    ? '--.--.--.--'
    : isLoading
    ? 'loading'
    : +parseFloat(props.totalLocked.toFixed(3)) + ' CNV'
  return (
    <Box
      pos="relative"
      overflowY={'hidden'}
      borderRadius="16px"
      mt={1}
      shadow={'Down Big'}
      width={'800px'}
      height={{ lg: '136px', md: '160px' }}
    >
      <Flex
        m={6}
        flex={1}
        justify={{ lg: 'start', md: 'center' }}
        align="center"
        gap={{ md: 10, lg: 0 }}
      >
        <Text ml={{ lg: 3, md: 0 }} textColor={'text.low'} fontSize={'18px'} fontWeight="700">
          Your Dividends Share
        </Text>
        <RedeemButton display={{ lg: 'none', md: 'flex' }} />
      </Flex>
      <Flex justify={{ md: 'center' }} gap={{ md: 10 }}>
        <Flex direction={'column'} alignItems="start" ml={6}>
          <Text fontSize={'11px'} fontWeight={600} textColor={'text.low'}>
            Total locked:
          </Text>
          <Flex>
            <Text fontSize={'17px'} fontWeight={700}>
              {totalLocked}
            </Text>
            {isLoading && <Spinner height={'20px'} width={'20px'} ml={1} />}
          </Flex>
        </Flex>
        <Flex direction={'column'} alignItems="start" ml={6}>
          <Text fontSize={'11px'} fontWeight={600} textColor={'text.low'}>
            Next Dividend Date:
          </Text>
          <Text fontSize={'17px'} fontWeight={700}>
            07/04/2022
          </Text>
        </Flex>
        <Flex direction={'column'} alignItems="start" ml={6}>
          <Text fontSize={'11px'} fontWeight={600} textColor={'text.low'}>
            Available Dividends:
          </Text>
          <Text fontSize={'17px'} fontWeight={700}>
            0.0
          </Text>
        </Flex>
        <Flex direction={'row'} justify="end">
          <RedeemButton display={{ lg: 'flex', md: 'none' }} />
        </Flex>
      </Flex>
    </Box>
  )
}
export default UserDividendCard

const RedeemButton = ({ ...props }) => {
  return (
    <Button
      fontWeight="bold"
      fontSize="md"
      variant="secondary"
      border="stroke.primary"
      w="160px"
      h="40px"
      size="large"
      shadow="down"
      mx={6}
      {...props}
    >
      <Text color="text.low" fontSize="sm">
        Redeem
      </Text>
    </Button>
  )
}
