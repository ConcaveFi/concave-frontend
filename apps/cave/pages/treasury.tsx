import { Box, Card, Container, Flex, Heading, Image, Spinner, Stack, Text } from '@concave/ui'
import { fetchPortfolio } from 'lib/debank'
import { useQuery } from 'react-query'

const TREASURY_ADDRESS = '0x226e7AF139a0F34c6771DeB252F9988876ac1Ced'

const makeCurrencyFormat = (language, currency) =>
  new Intl.NumberFormat(language, {
    style: 'currency',
    currency,
    currencyDisplay: 'narrowSymbol',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

const formatUsd = (value) => makeCurrencyFormat('en-US', 'USD').format(value)

const Token = ({ img, name, value, balance = null, children = null }) => {
  return (
    <Card
      variant="secondary"
      borderGradient="secondary"
      borderWidth={3}
      p={4}
      width={['100%', '400px', '450px']}
      shadow="Up Big"
      gap={4}
    >
      <Stack direction="row" justify="space-between" w="100%">
        <Stack direction="row" align="center">
          <Image src={img} maxW="28px" maxH="28px" alt="" />
          <Text fontWeight="bold">{name}</Text>
        </Stack>
        <Stack spacing={0} align="end">
          <Text fontWeight="bold">{value}</Text>
          {balance && <Text color="text.low">{balance}</Text>}
        </Stack>
      </Stack>
      {children}
    </Card>
  )
}

export default function Treasury() {
  const { data: treasury, isSuccess } = useQuery(['portfolio', TREASURY_ADDRESS], () =>
    fetchPortfolio(TREASURY_ADDRESS),
  )
  if (!isSuccess)
    return (
      <Container maxWidth="container.lg" pt={16}>
        <Stack my={8} align="center">
          <Heading as="h1">Concave Treasury</Heading>
          <Spinner />
        </Stack>
      </Container>
    )

  return (
    <Container maxWidth="container.lg" pt={16}>
      <Stack w="100%" my={8} align="center" spacing={4}>
        <Heading as="h1">Concave Treasury</Heading>
        <Heading as="h2" py={4} fontSize="2xl">
          Total Value {formatUsd(treasury.totalUsd)}
        </Heading>
        <Heading as="h3" py={4} fontSize="2xl">
          Protocols
        </Heading>
        {treasury.protocols.map((protocol) => (
          <Token
            key={protocol.id}
            img={protocol.logo_url}
            name={protocol.name}
            value={formatUsd(protocol.total_net_usd_value)}
          >
            {protocol.portfolio_item_list.map(
              (item) =>
                Number(item.stats.net_usd_value.toFixed(2)) > 0 && (
                  <Stack align="row" key={item.name}>
                    <Text fontWeight="bold">{item.name}</Text>
                    {item.detail.supply_token_list.map((token) => (
                      <Stack key={token.id} spacing={0}>
                        <Flex>
                          <Text fontWeight="bold">{token.symbol}:</Text>
                          <Text ml={1}>{formatUsd(token.amount * token.price)}</Text>
                        </Flex>
                        <Text ml={2} color="text.low">
                          {token.amount.toFixed(2)}
                        </Text>
                      </Stack>
                    ))}
                  </Stack>
                ),
            )}
          </Token>
        ))}
        <Heading as="h3" py={4} fontSize="2xl">
          Tokens
        </Heading>
        {treasury.tokens.map(
          (token) =>
            Number(token.amount.toFixed(2)) > 0 && (
              <Token
                key={token.id}
                img={token.logo_url}
                name={token.name}
                value={formatUsd(token.amount * token.price)}
                balance={token.amount.toFixed(2)}
              />
            ),
        )}
      </Stack>
    </Container>
  )
}
