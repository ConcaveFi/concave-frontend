import { Box, Flex, Image, Text } from '@chakra-ui/react'
import { AddIcon } from '@concave/icons'

type StakeInformationProps = {
  bondingEmissions: number
  baseEmissions: number
  onShow: VoidFunction
  onDisable: VoidFunction
  type: 'hover' | 'click'
}
export const StakeInformation = ({
  baseEmissions,
  bondingEmissions,
  type,
  onShow,
  onDisable,
}: StakeInformationProps) => {
  const bondEmissionsFormatted = bondingEmissions?.toFixed(2) + '%'
  const baseEmissionsFormatted = baseEmissions?.toFixed(2) + '%'
  const hasToClick = type === 'click'
  const hasToHover = type === 'hover'
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
        <Info title="Bonding emissions" info={bondEmissionsFormatted} />
        <AddIcon boxSize={'10px'} my={2} />
        <Info title="Base emissions" info={baseEmissionsFormatted} />
        <AddIcon boxSize={'10px'} my={2} />
        <Info title="Quaterly dividends" info={'Coming soon'} />
        <Image
          mt={{ base: 4, md: 4 }}
          mx="auto"
          src={`/assets/liquidstaking/modal-moreinfo-logo.svg`}
          alt="arrow down logo"
          onMouseOver={() => hasToHover && onShow()}
          onMouseLeave={() => hasToHover && onDisable()}
          onClick={() => hasToClick && onShow()}
        />
      </Flex>
    </Box>
  )
}
type InfoProps = { title: string; info: string | number }
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
