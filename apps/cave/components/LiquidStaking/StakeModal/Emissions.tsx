import { Box, Flex, Image, Text, useBreakpointValue } from '@concave/ui'
function Emissions(props: any) {
  const mobileUI = useBreakpointValue({ base: true, xl: false })
  const Informations = ({
    onClick,
    onClose,
    display,
  }: {
    onClick: () => void
    onClose: () => void
    display: any
  }) => {
    return (
      <Box
        // shadow="down"
        display={display}
        borderTopRadius="xl"
        borderBottomRadius="full"
        w="80%"
        pt={4}
        pb={{ base: 0, md: 10 }}
        px={{ base: 0, md: 3 }}
        mx="auto"
        filter="drop-shadow(0px 0px 27px #81b3ff4f)"
      >
        <Flex textAlign={'center'} direction={'column'} justify={'center'} align="center">
          <Text mx={{ base: '', sm: 'auto' }} color="text.low" fontSize="sm">
            Bonding Emissions:
          </Text>
          <Text mx={{ base: '', sm: 'auto' }} fontSize="sm" fontWeight="bold">
            {props.baseVAPR && props.baseVAPR}
          </Text>
          <Text mx={{ base: '', sm: 'auto' }} color="text.low" fontSize="sm">
            +
          </Text>
          <Text mx={{ base: '', sm: 'auto' }} color="text.low" fontSize="sm">
            Base Emissions:
          </Text>
          <Text mx={{ base: '', sm: 'auto' }} fontSize="sm" fontWeight="bold">
            {Math.sign(props?.vapr) === 0 ? 'Calculating' : props.vapr}
          </Text>
          <Text mx={{ base: '', sm: 'auto' }} color="text.low" fontSize="sm">
            +
          </Text>
          <Text mx={{ base: '', sm: 'auto' }} color="text.low" fontSize="sm">
            Quarterly Dividends:
          </Text>
          <Text mx={{ base: '', sm: 'auto' }} fontSize="md" fontWeight="bold">
            Coming Soon
          </Text>
          <Image
            mt={4}
            mx="auto"
            src={`/assets/liquidstaking/modal-moreinfo-logo.svg`}
            alt="arrow down logo"
            onMouseOver={() => {
              if (!mobileUI) props.onShow()
            }}
            onMouseLeave={() => {
              if (!mobileUI) props.onDisable()
            }}
            onClick={() => {
              if (mobileUI) props.onToggle()
            }}
          />
        </Flex>
      </Box>
    )
  }

  return (
    <Flex direction={'column'} py={2} px={5} maxW={{ base: '90px', sm: 'full' }}>
      <Flex direction={'row'} maxW={{ base: '100px', sm: '260px' }}>
        <Flex
          mx="auto"
          pt={5}
          pb={3}
          w="240px"
          h="full"
          minW={'150px'}
          minHeight={'300px'}
          shadow="down"
          borderRadius="full"
          textAlign="center"
          direction={'column'}
          ml={{ base: -4, sm: -1 }}
        >
          <Text color="text.low" fontSize="sm">
            Stake period
          </Text>
          <Text fontSize="lg" fontWeight="bold">
            {props.period}
          </Text>
          <Image
            mx="auto"
            src={`/assets/liquidstaking/${props.icon}-logo.svg`}
            alt="stake period logo"
          />
          <Text color="text.low" fontSize="sm">
            Total vAPR
          </Text>
          <Text mx={{ base: '', sm: 'auto' }} fontSize="md" fontWeight="bold">
            {props.totalVAPR}
          </Text>
          <Text fontSize="lg" fontWeight="bold" mb="2"></Text>
          <Image
            mx="auto"
            src={`/assets/liquidstaking/modal-moreinfo-logo.svg`}
            alt="arrow down logo"
            onMouseOver={() => {
              if (!mobileUI) props.onShow()
            }}
            onMouseLeave={() => {
              if (!mobileUI) props.onDisable()
            }}
            onClick={() => {
              if (mobileUI) props.onToggle()
            }}
          />
          <Image
            display={{ base: 'none', md: 'flex' }}
            mx="auto"
            src={`/assets/liquidstaking/modal-arrow-logo.svg`}
            alt="arrow down logo"
          />
          <Informations
            onClick={() => props.onToggle()}
            onClose={() => props.onToggle()}
            display={{ base: 'none', md: 'block' }}
          />
        </Flex>

        <Image
          mr={3}
          display={{ base: 'block', md: 'none' }}
          src={`/assets/liquidstaking/modal-arrow-logo.svg`}
          width="60px"
          alt="arrow down logo"
          transform={'rotate(-90deg)'}
        />
        <Informations
          onClick={() => props.onToggle()}
          onClose={() => props.onToggle()}
          display={{ base: 'block', md: 'none' }}
        />
      </Flex>
    </Flex>
  )
}

export default Emissions
