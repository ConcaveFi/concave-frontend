import { Box, Button, Flex, Spinner, Text } from '@concave/ui'
import { BigNumber } from 'ethers'
import { formatFixed } from 'utils/formatFixed'
import { truncateNumber } from 'utils/truncateNumber'
interface UserDividendCardProps {
  totalLocked: BigNumber
  isLoading: boolean
}
const UserDividendCard = (props: UserDividendCardProps) => {
  const { isLoading, totalLocked } = props

  // commit
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
      <Flex justify={{ md: 'center' }} gap={{ base: 0 }} overflow="hidden">
        <Flex direction={'column'} alignItems="start" ml={6} flex={1}>
          <Text fontSize={'11px'} fontWeight={600} textColor={'text.low'}>
            Total locked:
          </Text>
          <Flex>
            <Text fontSize={'17px'} fontWeight={700}>
              {truncateNumber(totalLocked)}
            </Text>
            {isLoading && <Spinner height={'20px'} width={'20px'} ml={1} />}
          </Flex>
        </Flex>
        <Flex direction={'column'} alignItems="start" ml={6} flex={1}>
          <Text fontSize={'11px'} fontWeight={600} textColor={'text.low'}>
            Next Dividend Date:
          </Text>
          <Text fontSize={'17px'} fontWeight={700}>
            Coming Soon
          </Text>
        </Flex>
        <Flex direction={'column'} alignItems="start" ml={6} flex={1}>
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
  const { redeemable } = props
  return (
    <Button
      cursor={redeemable ? 'pointer' : 'default'}
      fontWeight="bold"
      fontSize="md"
      variant={redeemable ? 'primary.outline' : ''}
      w="160px"
      h="40px"
      size="large"
      shadow="down"
      mx={6}
      _focus={{}}
      _hover={{}}
      _active={redeemable ? { transform: 'scale(0.95)' } : {}}
      {...props}
    >
      <Text color={redeemable ? 'white' : 'text.low'} fontSize="sm">
        {props.redeemable ? 'Redeem' : 'Not Redeemable'}
      </Text>
    </Button>
  )
}
