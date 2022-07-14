import { StakingPosition, StakingV1Contract } from '@concave/marketplace'
import { Box, Button, Flex, FlexProps, Spinner, Text, TextProps } from '@concave/ui'
import { BigNumber } from 'ethers'
import { formatEther } from 'ethers/lib/utils'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { concaveProvider } from 'lib/providers'
import { useState } from 'react'
import { formatFixed } from 'utils/formatFixed'
import { useAccount, useSigner } from 'wagmi'

const bigNumberMask = (number: BigNumber) => {
  if (number.eq(0)) {
    return `0`
  }
  if (+formatEther(number) < 0.01) {
    return `<.01`
  }
  return formatFixed(number)
}

interface RedeemCardViewerProps {
  stakingPosition: StakingPosition
}
export const RedeemCardViewer = ({ stakingPosition }: RedeemCardViewerProps) => {
  const [status, setStatus] = useState<'default' | 'approve'>('default')
  const readyForReedem = stakingPosition.maturity <= Date.now() / 1000
  const chaindID = useCurrentSupportedNetworkId()
  const { data: signer } = useSigner()
  const { address } = useAccount()
  const redeem = () => {
    const stakingContract = new StakingV1Contract(concaveProvider(chaindID))
    setStatus('approve')
    stakingContract
      .unlock(signer, address, stakingPosition.tokenId)
      .finally(() => setStatus('default'))
  }
  return (
    <Box
      borderRadius="2xl"
      mt={{ lg: 1, md: 3 }}
      mb={3}
      mx={{ base: 0, md: '0px', lg: 2 }}
      pt={{ base: 6, md: 3 }}
      px={{ base: 0, md: 0 }}
      maxW={{ base: '353px', md: '500px', lg: '720px' }}
    >
      <Flex gap={3} flex={1} direction={{ base: 'column', md: 'row' }}>
        <Flex ml={{ lg: 7 }} mx="auto">
          <Info
            label="Current value"
            valueFontSize={{ base: 'sm', md: 'lg' }}
            value={bigNumberMask(stakingPosition.currentValue) + ' CNV'}
          />
          <Info
            label="Gained"
            valueFontSize={{ base: 'sm', md: 'lg' }}
            value={bigNumberMask(stakingPosition.totalRewards) + ' CNV'}
          />
          <Info
            label="Initial"
            valueFontSize={{ base: 'sm', md: 'lg' }}
            value={bigNumberMask(stakingPosition.initialValue) + ' CNV'}
          />
        </Flex>
        <Button onClick={redeem} {...getRedeemButtonProps(readyForReedem)[status]} />
      </Flex>
    </Box>
  )
}

interface Info extends FlexProps {
  label: string
  value: string
  valueFontSize?: TextProps['fontSize']
}
export const Info: React.FC<Info> = ({ ...props }) => {
  return (
    <Flex width={'110px'} direction={'column'} textAlign={{ lg: 'start', md: 'center' }} {...props}>
      <Text color="text.low" fontSize="sm" lineHeight={'12px'} noOfLines={1}>
        {props.label}
      </Text>
      <Text fontSize={props.valueFontSize || 'md'} fontWeight="bold" noOfLines={1}>
        {props.value}
      </Text>
    </Flex>
  )
}
const getRedeemButtonProps = (readyForRedeem?: boolean) => {
  const defaultProps = {
    children: !readyForRedeem ? 'Not redeemable' : 'Redeem',
    variant: 'primary',
    size: 'md',
    minW: { base: '280px', md: '160px' },
    m: 'auto',
    mt: '2px',
  }
  return {
    default: { ...defaultProps, disabled: !readyForRedeem },
    approve: {
      ...defaultProps,
      disabled: true,
      children: (
        <Flex gap={2}>
          <Spinner />
          <Text>{'Approve in your wallet...'}</Text>
        </Flex>
      ),
    },
  }
}
