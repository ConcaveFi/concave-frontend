import { Box, Button, Flex, Spinner, Text, useBreakpointValue } from '@concave/ui'
import { GlassPanel } from 'components/Treasury/TreasuryManagementCard'
import { BigNumber } from 'ethers'
import { truncateNumber } from 'utils/truncateNumber'
interface UserDividendCardProps {
  totalLocked: BigNumber
  isLoading: boolean
}
export const UserDividendCard = (props: UserDividendCardProps) => {
  const mobileLayout = useBreakpointValue({ base: true, md: false })
  if (mobileLayout)
    return (
      <GlassPanel direction={'column'} align="center" minW={'358px'} height={242}>
        <DividendContent isLoading={props.isLoading} totalLocked={props.totalLocked} />
      </GlassPanel>
    )

  return (
    <Box
      borderRadius="16px"
      shadow={'Down Big'}
      width={'800px'}
      height={{ lg: '136px', md: '130px' }}
    >
      <DividendContent isLoading={props.isLoading} totalLocked={props.totalLocked} />
    </Box>
  )
}

const DividendContent = (props: UserDividendCardProps) => {
  const { isLoading, totalLocked } = props
  const mobileLayout = useBreakpointValue({ base: true, md: false })
  const mediumLayout = useBreakpointValue({ base: false, md: true, lg: false })
  const largeLayout = useBreakpointValue({ base: false, lg: true })
  return (
    <>
      <Flex>
        <Text
          textAlign={'start'}
          ml={{ lg: 6, md: 12 }}
          textColor={'text.low'}
          fontSize={'18px'}
          fontWeight="700"
          my={5}
        >
          Your Dividends Share
        </Text>
        {mediumLayout && <RedeemButton m="auto" />}
      </Flex>
      <Flex justify={'center'} gap={{ base: 4 }} overflow="hidden" minW={320}>
        <Flex direction={{ base: 'column', md: 'row' }} gap={6}>
          <Info title="Total Locked" label={truncateNumber(totalLocked)} />
          <Info title="Next Dividend Date" label="Coming Soon" />
        </Flex>
        <Flex direction={{ base: 'column', md: 'row' }} gap={6}>
          <Info title="Available Dividends" label="0.0" />
          <Info title="Your dividends Share" label="0.0" />
        </Flex>
        {largeLayout && <RedeemButton my={'auto'} />}
      </Flex>
      {mobileLayout && <RedeemButton my={'auto'} />}
    </>
  )
}

const RedeemButton = ({ ...props }) => {
  const { redeemable } = props
  return (
    <Button
      cursor={redeemable ? 'pointer' : 'default'}
      fontWeight="bold"
      fontSize="md"
      variant={redeemable ? 'primary.outline' : ''}
      size="md"
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

const Info = ({ title, label, loading }: { title: string; label: string; loading?: boolean }) => {
  return (
    <Flex direction={'column'} alignItems="start">
      <Text fontSize={'11px'} fontWeight={600} textColor={'text.low'}>
        {title}
      </Text>
      <Flex>
        <Text fontSize={{ base: '12px', lg: '17px' }} fontWeight={700}>
          {label}
        </Text>
        {loading && <Spinner height={'20px'} width={'20px'} ml={1} />}
      </Flex>
    </Flex>
  )
}
