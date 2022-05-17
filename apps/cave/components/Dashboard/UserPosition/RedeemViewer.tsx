import { Button, Flex, FlexProps, Text } from '@concave/ui'
import { BigNumber, ethers } from 'ethers'

interface RedeemCardViewerProps {
  initial: BigNumber
  gained: BigNumber
  redeemIn: number
}
const RedeemCardViewer = (props: RedeemCardViewerProps) => {
  const { initial, gained, redeemIn } = props
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
        <Info label="Current Value" value={ethers.utils.formatEther(initial.add(gained))} />
        <Info label="Gained" value={ethers.utils.formatEther(gained)} />
        <Info label="Initial" value={ethers.utils.formatEther(initial)} />
      </Flex>
      <Button
        w={{ lg: '140px', md: '170px' }}
        h={{ lg: '40px', md: '36px' }}
        mx="auto"
        cursor={redeemIn > 0 ? 'default' : 'pointer'}
        variant={redeemIn > 0 ? '' : 'primary'}
        shadow={redeemIn > 0 ? 'down' : 'up'}
        _active={redeemIn <= 0 && { transform: 'scale(0.9)' }}
        _focus={{}}
        rounded="2xl"
      >
        <Text color={redeemIn > 0 ? 'text.low' : 'white'} fontSize="sm">
          {redeemIn > 0 ? 'Not redeemable' : 'Redeem'}
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
        {parseFloat(props.value).toFixed(1)} CNV
      </Text>
    </Flex>
  )
}

export default RedeemCardViewer
