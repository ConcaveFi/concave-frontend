import { Currency, CurrencyAmount } from '@concave/core'
import { Flex, Spinner, Text } from '@concave/ui'

interface UserDividendCardProps {
  totalLocked: CurrencyAmount<Currency>
  isLoading: boolean
}
export const UserDividendCard = (props: UserDividendCardProps) => {
  const { totalLocked } = props
  return (
    <Flex direction={'column'} w="100%">
      <Text
        textAlign={'start'}
        ml={{ base: 0, lg: 6, md: 8 }}
        textColor={'text.low'}
        fontSize={'lg'}
        fontWeight={'bold'}
        my={3}
      >
        Your dividends share
      </Text>
      <Flex
        borderRadius="2xl"
        shadow={'down'}
        apply="background.metal(ALT)"
        width="full"
        py={{ base: 3, lg: 6 }}
        px={4}
        gap={4}
        overflow="hidden"
        direction={{ base: 'column', lg: 'row' }}
      >
        <Flex flex={1} justify={'space-around'}>
          <Flex
            gap={4}
            flex={{ base: '', md: 1 }}
            justify="space-around"
            direction={{ base: 'column', md: 'row' }}
          >
            <Info title="Total locked" label={totalLocked.toFixed(2, { groupSeparator: ',' })} />
            <Info title="Next dividend date" label="Coming soon" />
          </Flex>
          <Flex
            gap={4}
            flex={{ base: '', md: 1 }}
            justify="space-around"
            direction={{ base: 'column', md: 'row' }}
          >
            <Info title="Available dividends" label="0.0" />
            <Info title="Your dividends share" label="0.0" />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
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
