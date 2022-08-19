import { Currency, CurrencyAmount } from '@concave/core'
import { Button, ButtonProps, Flex, Spinner, Text, useBreakpointValue } from '@concave/ui'

interface UserDividendCardProps {
  totalLocked: CurrencyAmount<Currency>
  isLoading: boolean
}
export const UserDividendCard = (props: UserDividendCardProps) => {
  const { totalLocked } = props
  const mobileLayout = useBreakpointValue({ base: true, md: false })
  const mediumLayout = useBreakpointValue({ base: false, md: true, lg: false })
  const largeLayout = useBreakpointValue({ base: false, lg: true })
  return (
    <Flex direction={'column'} w="full">
      <Text
        textAlign={'start'}
        ml={{ lg: 6, md: 12 }}
        mx={{ base: 'auto', md: 'none' }}
        textColor={'text.low'}
        fontSize={'lg'}
        fontWeight={'bold'}
        my={5}
      >
        Your dividends share
      </Text>
      <Flex
        apply={mobileLayout && 'background.glass'}
        borderRadius="2xl"
        shadow={'down'}
        width="full"
        py={6}
        px={4}
        justify={'space-between'}
        gap={{ base: 4 }}
        overflow="hidden"
        wrap={'wrap'}
      >
        <Info title="Total locked" label={totalLocked.toFixed(2, { groupSeparator: ',' })} />
        <Info title="Next dividend date" label="Coming soon" />
        <Info title="Available dividends" label="0.0" />
        <Info title="Your dividends share" label="0.0" />
        <RedeemButton my={'auto'} />
      </Flex>
    </Flex>
  )
}

const RedeemButton = ({ ...props }: ButtonProps) => {
  const redeemable = false
  return (
    <Button
      cursor={redeemable ? 'pointer' : 'default'}
      fontWeight="bold"
      fontSize="md"
      variant={redeemable ? 'primary.outline' : ''}
      size="md"
      shadow="down"
      _active={redeemable ? { transform: 'scale(0.95)' } : {}}
      {...props}
    >
      <Text color={redeemable ? 'white' : 'text.low'} fontSize="sm">
        {redeemable ? 'Redeem' : 'Not Redeemable'}
      </Text>
    </Button>
  )
}

const Info = ({ title, label, loading }: { title: string; label: string; loading?: boolean }) => {
  return (
    <Flex direction={'column'} alignItems="start">
      <Text fontSize={'11px'} fontWeight="semibold" textColor={'text.low'}>
        {title}
      </Text>
      <Flex>
        <Text fontSize={{ base: 'xs', lg: '17px' }} fontWeight="bold">
          {label}
        </Text>
        {loading && <Spinner height={'20px'} width={'20px'} ml={1} />}
      </Flex>
    </Flex>
  )
}
