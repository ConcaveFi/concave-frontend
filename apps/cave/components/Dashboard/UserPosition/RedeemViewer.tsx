import { Button, Flex, FlexProps, Text } from '@concave/ui'
import { utils } from 'ethers'
import { NonFungibleTokenInfo } from 'lib/ConcaveNFTMarketplaceProxy/NonFungibleToken'
import { truncateNumber } from 'utils/truncateNumber'

interface RedeemCardViewerProps {
  nonFungibleTokenInfo: NonFungibleTokenInfo
}
const RedeemCardViewer = ({ nonFungibleTokenInfo }: RedeemCardViewerProps) => {
  const { shares, rewardDebt, maturity } = nonFungibleTokenInfo

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
        <Info label="Current Value" value={utils.formatEther(nonFungibleTokenInfo.currentValue)} />
        <Info label="Gained" value={utils.formatEther(nonFungibleTokenInfo.rewardDebt)} />
        <Info label="Initial" value={utils.formatEther(nonFungibleTokenInfo.initialValue)} />
      </Flex>
      <Button
        w={{ lg: '140px', md: '170px' }}
        h={{ lg: '40px', md: '36px' }}
        fontWeight="bold"
        mx="auto"
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
        {+props.value >= 0.01 ? truncateNumber(+props.value * 10 ** 18) : '<.01'} CNV
      </Text>
    </Flex>
  )
}

export default RedeemCardViewer
