import { keyframes } from '@chakra-ui/system'
import { SpinIcon } from '@concave/icons'
import { Box, Card, Flex, Image, Spinner, Text } from '@concave/ui'
import { utils } from 'ethers'
import { useCNVPrice } from 'hooks/useCNVPrice'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { useQuery } from 'react-query'
import { getRoiWarnColor } from 'utils/getRoiWarnColor'
import { chainId } from 'wagmi'
import { getBondSpotPrice, getBondTermLength } from './BondState'
const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
})

export const InfoItem = ({ value, isLoading = false, label, ...props }) => (
  <Flex
    direction="column"
    py={0.5}
    justify="center"
    fontWeight="bold"
    textAlign="center"
    {...props}
  >
    <Text fontSize="sm" fontFamily="heading">
     { isLoading ? <Spinner size={'xs'}></Spinner> : value }
    </Text>
    <Text fontSize="sm" color="text.low" userSelect={'none'}>
      {label}
    </Text>
  </Flex>
)

const useBondTerm = () => {
  const chainId = useCurrentSupportedNetworkId()
  const enabled = chainId != undefined;
  return useQuery(['useBondTerm', chainId], () => 
    getBondTermLength(chainId), { enabled }
  )
}
const useBondSpotPrice = () => {
  const chainId = useCurrentSupportedNetworkId()
  return useQuery(['getBondSpotPrice', chainId], () => {
    return getBondSpotPrice(chainId)
  }, {
    refetchInterval: 50000,
    enabled: chainId != undefined
  });  
}

export const useRoi = () => {
  const bondSpotPrice = useBondSpotPrice();
  const cnvPrice = useCNVPrice()
  return useQuery(['CNV','ROI',chainId], () => {
    const roi = (1 - +(bondSpotPrice.data || 0) / +cnvPrice.price?.toSignificant(8)) * 100
    return roi
  }, { 
    cacheTime: 50000,
    enabled: cnvPrice.isSuccess && bondSpotPrice.isSuccess
  })
}

export const BondInfo = ({ asset, icon }) => {
  const termLength = useBondTerm()
  const vestingTerm = `${termLength.data} Days`;
  const roi = useRoi()
  return (
    <Card bg="none" h="80px" w="100%" direction="row" shadow="Glass Up Medium">
      <Flex justify="center" flexBasis="40%" alignItems={'center'}>
        <Image src={icon} alt="" w="55px" h="55px" mr={3} />
        <InfoItem isLoading={false} value={asset.toUpperCase()} label="Asset" />
      </Flex>
      <Box w="1px" mx={0} my={-4} bg="stroke.primary" />
      <InfoItem
        value={roi.data?.toFixed(2) + '%'}
        label="ROI"
        isLoading={!roi.data}
        flexGrow={1}
        pl={3}
        pr={3}
        flexBasis="25%"
        color={getRoiWarnColor(roi.data)}
      />
      <Box w="1px" mx={0} my={-4} bg="stroke.primary" />
      <InfoItem isLoading={termLength.isFetching} value={vestingTerm} label="Vesting term" px={5} flexBasis="35%" />
    </Card>
  )
}

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
        <Card bg="none" w="100%" maxH="120px" flex={1} shadow="Glass Up Medium">
          <Text fontWeight={'semibold'} textColor={'text.bright'} m="auto" opacity={0.6}>
            No current bond positions
          </Text>
        </Card>
      ) : totalOwed ? (
        <Card bg="none" py={4} w="100%" direction="row" shadow="Glass Up Medium">
          <Flex justify="center" flexBasis="40%">
            <InfoItem
              value={totalOwed ? oldestBond.replace('2022', '') : 'N/A'}
              label={oldestBond ? 'Fully vested' : ''}
            />
          </Flex>
          <Box w="1px" mx={0} my={-4} bg="stroke.primary" />
          <InfoItem
            value={(totalOwed - totalPending).toFixed(2)}
            label={totalOwed ? 'Pending' : 'No bonds to claim'}
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
