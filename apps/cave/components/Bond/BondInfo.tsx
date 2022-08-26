import { keyframes } from '@chakra-ui/system'
import { SpinIcon } from '@concave/icons'
import { Box, Card, Flex, Image, Text } from '@concave/ui'
import { utils } from 'ethers'
const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
})

export const InfoItem = ({ value, label, ...props }) => (
  <Flex
    direction="column"
    py={0.5}
    justify="center"
    fontWeight="bold"
    textAlign="center"
    {...props}
  >
    <Text fontSize="sm" fontFamily="heading">
      {value}
    </Text>
    <Text fontSize="sm" color="text.low" userSelect={'none'}>
      {label}
    </Text>
  </Flex>
)

export const BondInfo = ({ asset, roi, vestingTerm, icon }) => {
  return (
    <Card bg="none" py={3} w="100%" direction="row" shadow="Glass Up Medium">
      <Flex justify="center" flexBasis="40%" alignItems={'center'}>
        <Image src={icon} alt="" width="55px" height="55px" mr={3} />
        <InfoItem value={asset.toUpperCase()} label="Asset" />
      </Flex>
      <Box w="1px" mx={0} my={-4} bg="stroke.primary" />
      <InfoItem value={roi} label="ROI" flexGrow={1} pl={3} pr={3} flexBasis="25%" />
      <Box w="1px" mx={0} my={-4} bg="stroke.primary" />
      <InfoItem value={vestingTerm} label="Vesting Term" px={5} flexBasis="35%" />
    </Card>
  )
}
// commi
export const UserBondPositionInfo = (props) => {
  const spinnerStyles = { animation: `${spin} 2s linear infinite`, size: 'sm' }
  const parse = props?.bondSigma
  const oldestBond = parse?.parseOldest
  const claimed = parse?.claimed
  const redeemable = parse?.parseRedeemable
  const totalOwed = parse?.totalOwed.toFixed(2)
  const totalPending = parse?.totalPending.toFixed(2)
  const formatRedeemable =
    Math.sign(parseInt(redeemable)) === 1
      ? (+utils.formatEther(BigInt(parseInt(redeemable)))).toFixed(2)
      : 0

  return (
    <>
      {claimed ? (
        <Card bg="none" py={4} w="100%" h="79px" direction="row" shadow="Glass Up Medium">
          <Flex justify="center" flexBasis="100%">
            <InfoItem value={'No Current Bond Positions'} label={''} />
          </Flex>
        </Card>
      ) : totalOwed ? (
        <Card bg="none" py={4} w="100%" direction="row" shadow="Glass Up Medium">
          <Flex justify="center" flexBasis="40%">
            <InfoItem
              value={totalOwed ? oldestBond.replace('2022', '') : 'N/A'}
              label={oldestBond ? 'Fully Vested' : ''}
            />
          </Flex>
          <Box w="1px" mx={0} my={-4} bg="stroke.primary" />
          <InfoItem
            value={(totalOwed - totalPending).toFixed(2)}
            label={totalOwed ? 'Pending' : 'No Bonds to Claim'}
            flexGrow={1}
            pl={3}
            pr={3}
            flexBasis="25%"
          />
          <Box w="1px" mx={0} my={-4} bg="stroke.primary" />
          <InfoItem value={formatRedeemable} label={'Redeemable'} px={5} pl={2} flexBasis="35%" />
        </Card>
      ) : !!props.userAddress ? (
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
