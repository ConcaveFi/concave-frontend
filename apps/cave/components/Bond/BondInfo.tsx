import { Box, Card, Flex, Text, Image } from '@concave/ui'
import { SpinIcon } from '@concave/icons'
import { keyframes } from '@chakra-ui/system'
const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
})
import { utils } from 'ethers'

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
// commit
export const UserBondPositionInfo = (bondSigma, userAddress) => {
  const spinnerStyles = { animation: `${spin} 2s linear infinite`, size: 'sm' }
  const parse = bondSigma?.bondSigma
  const oldestBond = parse?.parseOldest
  const claimed = parse?.claimed
  const redeemable = parse?.parseRedeemable
  const totalOwed = parse?.totalOwed.toFixed(2)
  const totalPending = parse?.totalPending.toFixed(2)
  const formatRedeemable = redeemable ? (+utils.formatEther(redeemable.toString())).toFixed(2) : 0

  return (
    <>
      {claimed ? (
        'You have no open positions'
      ) : totalOwed ? (
        <Card bg="none" py={4} w="100%" direction="row" shadow="Glass Up Medium">
          <Flex justify="center" pl={4} mx={2.5}>
            <InfoItem
              value={totalOwed ? oldestBond.replace('2022', '') : 'N/A'}
              label={oldestBond ? 'Fully Vested' : ''}
            />
          </Flex>
          <Box w="1px" mx={30} my={-4} bg="stroke.primary" />
          <InfoItem
            value={(totalOwed - totalPending).toFixed(2)}
            label={totalOwed ? 'Pending' : 'No Bonds to Claim'}
            flexGrow={1}
          />
          <Box w="1px" mx={30} my={-4} bg="stroke.primary" />
          <InfoItem value={formatRedeemable} label={'Available'} px={5} pl={2} />
        </Card>
      ) : !!userAddress ? (
        <>
          Checking wallet...
          <SpinIcon __css={spinnerStyles} width={'10'} height={'10'} />
        </>
      ) : (
        ''
      )}
    </>
  )
}
