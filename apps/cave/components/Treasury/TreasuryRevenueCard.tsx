import { Box, Button, Card, Flex, Image, Text } from '@concave/ui'
import { InfoItem } from 'components/Bond/BondInfo'

interface TreasuryRevenueCardProps {}
export const TreasuryInfoItem = ({ value, label, ...props }) => (
  <Flex
    direction="column"
    py={0.5}
    justify="center"
    fontWeight="bold"
    textAlign="center"
    {...props}
  >
    <Text fontSize="sm" color="text.low">
      {value}
    </Text>
    <Text fontSize="sm" fontFamily="heading">
      {label}
    </Text>
  </Flex>
)

export const TreasuryInfo = ({ box1, box2, box3 }) => {
  return (
    <Card
      variant="secondary"
      bg="none"
      py={3}
      w="599px"
      h="100px"
      direction="row"
      shadow="Glass Up Medium"
    >
      <Flex justify="center" flexBasis="40%">
        <TreasuryInfoItem value="Market Cap" label="Asset" />
      </Flex>
      <Box w="1px" mx={0} my={-4} bg="stroke.primary" />
      <TreasuryInfoItem value="CNV Price" label="ROI" flexGrow={1} pl={3} pr={3} flexBasis="25%" />
      <Box w="1px" mx={0} my={-4} bg="stroke.primary" />
      <TreasuryInfoItem
        value="Treasury value per CNV"
        label="Vesting Term"
        px={5}
        flexBasis="35%"
      />
    </Card>
  )
}

export default function TreasuryRevenueCard(props: TreasuryRevenueCardProps) {
  return (
    <Card
      direction={'column'}
      width={'600px'}
      height="330px"
      bg={'#111e'}
      shadow={'0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 0px 20px rgba(87, 124, 255, 0.3)'}
    >
      <Flex direction={'row'} flex={1} alignItems="start" gap={5}>
        <Flex direction={'column'} gap={5}>
          <TreasuryInfo box1="" box2="" box3={``} />
          <TreasuryInfo box1="" box2="" box3={``} />
        </Flex>
      </Flex>
    </Card>
  )
}
