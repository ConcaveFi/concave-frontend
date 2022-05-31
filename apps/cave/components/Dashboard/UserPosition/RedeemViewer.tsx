import { Box, Button, Flex, FlexProps, Text, TextProps } from '@concave/ui'
import { BigNumber } from 'ethers'
import { formatEther } from 'ethers/lib/utils'
import { NonFungibleTokenInfo } from 'lib/ConcaveNFTMarketplaceProxy/NonFungibleToken'
import { formatFixed } from 'utils/formatFixed'

interface RedeemCardViewerProps {
  nonFungibleTokenInfo: NonFungibleTokenInfo
}
const RedeemCardViewer = ({ nonFungibleTokenInfo }: RedeemCardViewerProps) => {
  const { shares, rewardDebt, maturity, deposit, userReward } = nonFungibleTokenInfo
  console.log('nft info', nonFungibleTokenInfo)
  const curValue = BigNumber.from(userReward[3])
  const initialBal = BigNumber.from(userReward[0])
  const gainedAmt = curValue.sub(initialBal)
  return (
    <Box borderRadius="2xl" mt={{ lg: 1, md: 0 }} mb={3} mx={2} py={3} px={4}>
      <Flex justify={{ lg: 'left', md: 'center' }}>
        {/* <Info
          label="Current Value"
          width={'full'}
          valueFontSize={'lg'}
          value={utils.formatEther(userReward[3])}
          ml={{ lg: 7, md: '0px' }}
        />
        <Info label="Gained" 
          width={'full'} value={utils.formatEther(gainedAmt)} />
        <Info label="Initial"
          width={'full'} value={utils.formatEther(userReward[0])} /> */}
        <Info
          width={'full'}
          label="Current Value"
          valueFontSize={'lg'}
          value={bigNumberMask(curValue) + ' CNV'}
        />
        <Info width={'full'} label="Gained" value={bigNumberMask(gainedAmt) + ' CNV'} />
        <Info width={'full'} label="Initial" value={bigNumberMask(initialBal) + ' CNV'} />
        <Button
          size={'md'}
          minW={'160px'}
          width={'full'}
          cursor={maturity > 0 ? 'default' : 'pointer'}
          variant={maturity > 0 ? '' : 'primary'}
          shadow={maturity > 0 ? 'down' : 'up'}
          _active={maturity <= 0 && { transform: 'scale(0.9)' }}
          _focus={{}}
        >
          <Text color={maturity > 0 ? 'text.low' : 'white'} fontSize="sm">
            {maturity > 0 ? 'Not redeemable' : 'Redeem'}
          </Text>
        </Button>
      </Flex>
    </Box>
  )
}

export const bigNumberMask = (number: BigNumber) => {
  if (number.eq(0)) {
    return `0`
  }
  if (+formatEther(number) < 0.01) {
    return `<.01`
  }
  return formatFixed(number)
}
interface Info extends FlexProps {
  label: string
  value: string
  valueFontSize?: TextProps['fontSize']
}
export const Info: React.FC<Info> = ({ ...props }) => {
  return (
    <Flex width={'110px'} direction={'column'} textAlign={{ lg: 'start', md: 'center' }} {...props}>
      <Text color="text.low" fontSize="sm" lineHeight={'15px'} noOfLines={1}>
        {props.label}
      </Text>
      <Text fontSize={props.valueFontSize || 'md'} fontWeight="bold" noOfLines={1}>
        {props.value}
      </Text>
    </Flex>
  )
}
export default RedeemCardViewer
