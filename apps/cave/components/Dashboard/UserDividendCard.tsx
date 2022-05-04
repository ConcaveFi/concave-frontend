import { Box, Button, Flex, Spinner, Text } from '@concave/ui'
import { useState } from 'react'

interface UserDividendCardProps {
  totalLocked: string
}
const UserDividendCard = (props: UserDividendCardProps) => {
  const [active, setActive] = useState(false)
  const isLoading = props.totalLocked === 'Loading'
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
              {props.totalLocked}
            </Text>
            {isLoading && <Spinner height={'20px'} width={'20px'} ml={1} />}
          </Flex>
        </Flex>
        {/* <Flex direction={'column'} alignItems="start" ml={6}>
          <Text fontSize={'11px'} fontWeight={600} textColor={'text.low'}>
            Your Dividends Share:
          </Text>
          <Text fontSize={'17px'} fontWeight={700}>
            0.00323%
          </Text>
        </Flex> */}
        <Flex direction={'column'} alignItems="start" ml={6}>
          <Text fontSize={'11px'} fontWeight={600} textColor={'text.low'}>
            Next Dividend Date:
          </Text>
          <Text fontSize={'17px'} fontWeight={700}>
            07.04.2022
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
        <Flex flex={1} direction={'column'} textAlign={'start'}>
          <Button
            //   onClick={'s'}
            fontWeight="bold"
            fontSize="md"
            variant="secondary"
            border="stroke.primary"
            w="160px"
            h="40px"
            size="large"
            mx="auto"
            shadow="down"
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

{
  /* <Flex justify="left">
        <Text color="text.low" fontSize="lg" as="b">
          Your Dividends Share
        </Text>
      </Flex>
      <Flex direction="row" gap={4} alignItems="center" justify="center" m={2}>
        <Flex flex={1} direction={'column'} textAlign={'start'} ml="2">
          <Text color="text.low" fontSize="sm">
            Total Locked:
          </Text>
          <Text fontSize="md" fontWeight="bold">
            6132.42 CNV
          </Text>
        </Flex>
        <Flex flex={1} direction={'column'} textAlign={'start'} ml="2">
          <Text color="text.low" fontSize="sm">
            Your Dividends Share:
          </Text>
          <Text fontSize="md" fontWeight="bold">
            0.00323%
          </Text>
        </Flex>
        <Flex flex={1} direction={'column'} textAlign={'start'} ml="2">
          <Text color="text.low" fontSize="sm">
            Next Dividend Date:
          </Text>
          <Text fontSize="md" fontWeight="bold">
            04.06.2022
          </Text>
        </Flex>
        <Flex flex={1} direction={'column'} textAlign={'start'} ml="2">
          <Text color="text.low" fontSize="sm">
            Available Dividends:
          </Text>
          <Text fontSize="md" fontWeight="bold">
            0.0
          </Text>
        </Flex>
        <Flex flex={1} direction={'column'} textAlign={'start'} ml="2">
          <Button
            mt={5}
            //   onClick={'s'}
            fontWeight="bold"
            fontSize="md"
            variant="primary.outline"
            //   bgGradient="linear(90deg, #72639B 0%, #44B9DE 100%)"
            w="160px"
            h="40px"
            size="large"
            mx="auto"
          >
            Redeem
          </Button>
        </Flex>
      </Flex> */
}
