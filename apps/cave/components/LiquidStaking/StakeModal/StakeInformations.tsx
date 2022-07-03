import { Box, Flex, Image, Text, useBreakpointValue } from '@chakra-ui/react'

type StakeInformationsProps = {
  bondingEmissions: string
  baseEmissions: string
  onShow: VoidFunction
  onDisable: VoidFunction
}
export const StakeInformations = ({
  baseEmissions,
  bondingEmissions,
  onShow,
  onDisable,
}: StakeInformationsProps) => {
  const mobileUI = useBreakpointValue({ base: true, xl: false })
  return (
    <Box
      borderTopRadius="xl"
      borderBottomRadius="full"
      mt={{ base: '8', md: '' }}
      pt={4}
      pb={{ base: 0, md: 10 }}
      px={{ base: 0, md: 3 }}
      mx="auto"
      filter="drop-shadow(0px 0px 27px #81b3ff4f)"
    >
      <Flex textAlign={'center'} direction={'column'} justify={'center'} align="center">
        <Info title="Bonding emissions" info={bondingEmissions} />
        <PlusSign />
        <Info title="Base emissions" info={baseEmissions} />
        <PlusSign />
        <Info title="Quaterly dividends" info={'Coming soon'} />
        <Image
          mt={{ base: 4, md: 4 }}
          mx="auto"
          src={`/assets/liquidstaking/modal-moreinfo-logo.svg`}
          alt="arrow down logo"
          onMouseOver={() => !mobileUI && onShow()}
          onMouseLeave={() => !mobileUI && onDisable()}
          onClick={() => mobileUI && onShow()}
        />
      </Flex>
    </Box>
  )
}

const PlusSign = () => (
  <Text mx={{ base: '', sm: 'auto' }} color="text.low" fontSize="sm">
    +
  </Text>
)

type InfoProps = { title: string; info: string }
const Info = ({ title, info }: InfoProps) => (
  <>
    <Text color="text.low" fontSize="sm">
      {title}
    </Text>
    <Text fontSize={{ base: 'md', md: 'lg' }} fontWeight="bold">
      {info}
    </Text>
  </>
)
