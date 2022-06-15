import { Button, ButtonProps, Flex, Text, TextProps, VStack } from '@concave/ui'
import { bigNumberMask } from 'components/Dashboard/UserPosition/RedeemViewer'
import { NonFungibleTokenInfo } from 'lib/ConcaveNFTMarketplaceProxy/NonFungibleToken'

interface RedeemCardViewerProps {
  nonFungibleTokenInfo: NonFungibleTokenInfo
}
const RedeemContainer = (props: RedeemCardViewerProps) => {
  const { userReward } = props.nonFungibleTokenInfo

  const curValue = userReward.totalRewards
  const initialBal = userReward.amountDeposited
  const gainedAmt = curValue.sub(initialBal)

  return (
    <Flex height={'127px'} width="358px" direction="column">
      <Flex height={'70px'} maxH="70px" align={'center'}>
        <VStack spacing={0} justify="center" flex={1}>
          <LowText>Current value</LowText>
          <HighText>{bigNumberMask(curValue)} CNV</HighText>
        </VStack>
        <VStack justify={'center'} spacing={0} flex={1}>
          <LowText>Gained</LowText>
          <HighText>{bigNumberMask(gainedAmt)} CNV</HighText>
        </VStack>
        <VStack justify={'center'} spacing={0} flex={1}>
          <LowText>Initial</LowText>
          <HighText>{bigNumberMask(initialBal)} CNV</HighText>
        </VStack>
      </Flex>
      <RedeemButton />
    </Flex>
  )
}

export default RedeemContainer

const RedeemButton = ({ onClick, active }: { onClick?: () => void; active?: boolean }) => {
  return (
    <Button
      onClick={onClick}
      variant={active ? 'primary' : 'primary.outline'}
      rounded={'2xl'}
      height="48px"
      mx={10}
      _hover={{}}
      _active={active && { transform: 'scale(0.92)' }}
      _focus={{}}
      shadow="Down Big"
      cursor={active ? 'pointer' : 'default'}
    >
      {active ? (
        <HighText fontSize={'20px'}>Redeem</HighText>
      ) : (
        <LowText fontSize={'20px'}>Not Redeemable</LowText>
      )}
    </Button>
  )
}

const LowText: React.FC<TextProps> = ({ ...props }) => {
  return <Text textColor={'text.low'} fontSize="12px" fontWeight={'700'} {...props}></Text>
}

const HighText: React.FC<TextProps> = ({ ...props }) => {
  return <Text textColor={'text.high'} fontSize="15px" fontWeight={'700'} {...props}></Text>
}