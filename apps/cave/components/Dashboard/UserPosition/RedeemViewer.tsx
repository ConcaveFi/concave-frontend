import { Button, Flex, FlexProps, Text } from '@concave/ui'
import { BigNumber } from 'ethers'
import { formatEther } from 'ethers/lib/utils'
import { NonFungibleTokenInfo } from 'lib/ConcaveNFTMarketplaceProxy/NonFungibleToken'
import { formatFixed } from 'utils/formatFixed'

interface RedeemCardViewerProps {
  nonFungibleTokenInfo: NonFungibleTokenInfo
}
const RedeemCardViewer = ({ nonFungibleTokenInfo }: RedeemCardViewerProps) => {
  const { maturity, userReward } = nonFungibleTokenInfo
  const curValue = userReward.totalRewards
  const initialBal = userReward.amountDeposited
  const gainedAmt = curValue.sub(initialBal)
  return (
    <Flex
      flex={1}
      height={{ lg: '50px', md: '90px' }}
      maxHeight="100px"
      direction={{ lg: 'row', md: 'column' }}
      alignItems="center"
      justify="center"
      my={3}
      gap={{ lg: 0, md: 2 }}
    >
      <Flex gap={{ lg: 0, md: 4 }}>
        <Info
          label="Current Value"
          value={bigNumberMask(curValue) + ' CNV'}
          ml={{ lg: 7, md: '0px' }}
        />
        <Info label="Gained" value={bigNumberMask(gainedAmt) + ' CNV'} />
        <Info label="Initial" value={bigNumberMask(initialBal) + ' CNV'} />
      </Flex>
      <Button
        w={{ lg: '140px', md: '170px' }}
        h={{ lg: '40px', md: '36px' }}
        fontWeight="bold"
        mx="auto"
        mr={{ lg: 3, md: 'auto' }}
        cursor={maturity > 0 ? 'default' : 'pointer'}
        variant={maturity > 0 ? '' : 'primary'}
        shadow={maturity > 0 ? 'down' : 'up'}
        _active={maturity <= 0 && { transform: 'scale(0.9)' }}
        _focus={{}}
        rounded="2xl"
      >
        <Text color={maturity > 0 ? 'text.low' : 'white'} fontSize="sm">
          {maturity > 0 ? 'Not redeemable' : 'Redeem'}
        </Text>
      </Button>
    </Flex>
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
}
const Info: React.FC<Info> = ({ ...props }) => {
  return (
    <Flex
      width={'110px'}
      direction={'column'}
      textAlign={{ lg: 'start', md: 'center' }}
      ml={{ lg: 3, md: '0px' }}
      {...props}
    >
      <Text color="text.low" fontSize="sm" lineHeight={'15px'} noOfLines={1}>
        {props.label}
      </Text>
      <Text fontSize="md" fontWeight="bold" noOfLines={1}>
        {props.value}
      </Text>
    </Flex>
  )
}

export default RedeemCardViewer
