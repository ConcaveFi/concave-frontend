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
    : +parseFloat(props.totalLocked.toFixed(3))
  return (
    <Box
      pos="relative"
      overflowY={'auto'}
      maxHeight={'500px'}
      borderRadius="16px"
      mt={1}
      shadow={'Down Big'}
      width={'800px'}
      height={'136px'}
    >
      <Flex m={6} flex={1}>
        <Text textColor={'text.low'} fontSize={'18px'} fontWeight="700">
          Your Dividends Share
        </Text>
      </Flex>
      <Flex>
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
        </Flex>{' '}
        <Flex direction={'row'} flex="1" justify="end">
          <Button
            //   onClick={'s'}
            fontWeight="bold"
            fontSize="md"
            variant="secondary"
            border="stroke.primary"
            w="160px"
            h="40px"
            size="large"
            shadow="down"
            mx={6}
          >
            <Text color="text.low" fontSize="sm">
              Redeem
            </Text>
          </Button>
        </Flex>
      </Flex>
    </Box>
  )
}
export default UserDividendCard
