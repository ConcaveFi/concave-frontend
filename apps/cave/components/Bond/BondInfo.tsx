import { Box, Card, Flex, Text, Image } from '@concave/ui'

export const InfoItem = ({ value, label, ...props }) => (
  <Flex
    direction="column"
    py={0.5}
    justify="space-between"
    fontWeight="bold"
    textAlign="center"
    {...props}
  >
    <Text fontSize="sm" fontFamily="heading">
      {value}
    </Text>
    <Text fontSize="sm" color="text.low">
      {label}
    </Text>
  </Flex>
)

export const BondInfo = ({ asset, roi, vestingTerm, icon }) => {
  return (
    <Card bg="none" py={3} w="100%" direction="row" shadow="Glass Up Medium">
      <Flex justify="center" pl={4} pr={7}>
        <Image src={icon} alt="" w="55px" h="55px" mr={3} />
        <InfoItem value={asset.toUpperCase()} label="Asset" />
      </Flex>
      <Box w="1px" mx={-1} my={-4} bg="stroke.primary" />
      <InfoItem value={roi} label="ROI" flexGrow={1} />
      <Box w="1px" mx={-1} my={-4} bg="stroke.primary" />
      <InfoItem value={vestingTerm} label="Vesting Term" px={5} />
    </Card>
  )
}

export const UserBondPositionInfo = (bondSigma) => {
  const parse = bondSigma?.bondSigma
  const oldestBond = parse?.parseOldest
  const totalOwed = parse?.totalOwed.toFixed(2)
  const totalPending = parse?.totalPending.toFixed(2)

  return (
    <>
      {parse ? (
        <Card bg="none" py={3} w="100%" direction="row" shadow="Glass Up Medium">
          <Flex justify="center" pl={4} pr={7}>
            <InfoItem
              value={totalOwed > 0 ? oldestBond : 'N/A'}
              label={oldestBond ? 'Fully Vested' : ''}
            />
          </Flex>
          <Box w="1px" mx={-1} my={-4} bg="stroke.primary" />
          <InfoItem
            value={totalOwed}
            label={totalOwed ? 'Purchased' : 'No Bonds to Claim'}
            flexGrow={1}
          />
          <Box w="1px" mx={-1} my={-4} bg="stroke.primary" />
          <InfoItem value={totalPending} label={totalPending ? 'Redeemed' : ''} px={5} />
        </Card>
      ) : (
        ''
      )}
    </>
  )
}
