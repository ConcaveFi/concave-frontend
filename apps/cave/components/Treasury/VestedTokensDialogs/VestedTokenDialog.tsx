import { Token } from '@concave/core'
import { InfoIcon } from '@concave/icons'
import { Button, Card, Collapse, Flex, Modal, Spinner, Text, Tooltip } from '@concave/ui'
import { ToggleButton } from 'components/ToggleButton'
import { VestedTokenButtonProps } from 'components/Treasury/TreasuryRedeemCard'
import { BigNumber } from 'ethers'
import { formatEther, parseEther } from 'ethers/lib/utils'
import { useState } from 'react'
import { formatFixed } from 'utils/formatFixed'
import { useAccount } from 'wagmi'
import { VestedTokenInput } from './VestedTokenDialogInput'

type VestedTokenDialogProps = {
  tokenUserData: { redeemable: BigNumber; redeemed: BigNumber; balance: BigNumber }
  isLoading: boolean
  onRedeem: (amount: BigNumber, redeemMax: boolean) => void
  status: 'default' | 'approve' | 'rejected' | 'error' | 'submitted'
  token: Token
  conversionToCNV?: number
}
export const VestedTokenDialog: React.FC<VestedTokenButtonProps & VestedTokenDialogProps> = ({
  onClose,
  isOpen,
  tokenUserData,
  isLoading,
  onRedeem,
  status,
  token,
  conversionToCNV,
}) => {
  const { isConnected } = useAccount()
  const { redeemable, redeemed, balance } = tokenUserData || {}
  const [value, setValue] = useState<string>()
  const [redeemMax, setRedeemMax] = useState(true)
  const currentValue = redeemMax ? redeemable : parseEther(value || '0')

  const insufficientFunds = balance?.isZero() || parseEther(value || '0.0').gt(balance)
  const invalidAmount = !insufficientFunds && currentValue?.isZero()
  const nothingToRedeem = (redeemable?.isZero() || redeemable?.eq(balance)) && !insufficientFunds
  const redeemableExceeded =
    !redeemMax &&
    parseEther(value || '0')?.gt(redeemable || 0) &&
    !insufficientFunds &&
    !nothingToRedeem
  const validValue = !invalidAmount && !insufficientFunds && !nothingToRedeem && !redeemableExceeded
  const convertedValue = (+formatEther(currentValue || 0) * conversionToCNV)?.toFixed(12) || '0'
  const CNVAmount = formatFixed(parseEther(conversionToCNV?.toFixed(12) || '0'), { places: 5 })
  return (
    <>
      <Modal
        title={`Redeem ${token?.symbol}`}
        bluryOverlay
        preserveScrollBarGap
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        motionPreset="slideInBottom"
      >
        <Card width={'340px'} minW="280px" m={-6} px={6} gap={2} justify="center" py={6}>
          <VestedTokenInput
            redeemable={redeemable}
            redeemMax={redeemMax}
            balance={balance}
            onChangeValue={setValue}
            value={value}
          />
          <Flex direction={'column'} fontSize="14px" px={2}>
            <Info
              title="Redeemable:"
              value={isLoading ? 'Loading...' : formatEther(redeemable || '0')}
            />
            <Info
              title="Redeemed:"
              value={isLoading ? 'Loading...' : formatEther(redeemed || '0')}
            />
            <Collapse in={validValue || (redeemMax && !redeemable?.isZero())}>
              {conversionToCNV && (
                <Info
                  title="You will receive:"
                  value={formatFixed(parseEther(convertedValue), { places: 5 }) + ' CNV'}
                />
              )}
            </Collapse>
            {conversionToCNV && (
              <Text
                color={'text.accent'}
                fontWeight="bold"
                opacity={0.5}
              >{`1 ${token?.symbol} = ${CNVAmount} CNV`}</Text>
            )}
            <Text fontWeight={'bold'} textColor="text.accent" opacity="0.5" fontSize={'xs'}></Text>
          </Flex>
          <Flex gap={2} fontWeight={'bold'} pl={2} align="center">
            <Text textColor={'gray.200'}>Redeem max</Text>
            <ToggleButton enabled={redeemMax} onToggle={setRedeemMax} />
            <Tooltip
              textColor={'white'}
              bg="text.low"
              textShadow={'0px 0px 10px #333'}
              fontWeight={'bold'}
              fontSize="13px"
              textAlign="center"
              label={`Attempts to redeem all of your currently available ${
                token?.symbol || 'amount'
              }`}
            >
              <InfoIcon color={'text.low'} cursor="pointer" />
            </Tooltip>
          </Flex>

          <Button
            height={'55px'}
            width="full"
            {...redeemButtonProps(validValue, status)}
            onClick={() => onRedeem(redeemMax ? redeemable : parseEther(value || '0'), redeemMax)}
            gap={4}
          >
            {(status === 'approve' || isLoading) && <Spinner color="text.low" />}
            {isConnected && !isLoading && (
              <>
                <Text>
                  {nothingToRedeem && 'Nothing to redeem'}
                  {insufficientFunds && 'Insufficient funds'}
                  {redeemableExceeded && 'Redeemable exceeded'}
                  {(invalidAmount || validValue) && redeemButtonText[status]}
                </Text>
              </>
            )}
            {isConnected && isLoading && 'Loading...'}
            {!isConnected && 'Not connected'}
          </Button>
        </Card>
      </Modal>
    </>
  )
}
const redeemButtonProps = (validValue: boolean, status) => {
  const defaultProps = {
    variant: 'secondary',
    fontSize: 20,
    shadow: 'Up Small',
    cursor: !validValue && 'default',
    textColor: !validValue && 'text.low',
    _active: validValue && { transform: 'scale(0.9)' },
    _hover: validValue && { shadow: 'up' },
    _focus: {},
  }
  const disabledProps = { ...defaultProps, disabled: true, _hover: {}, variant: 'primary.outline' }
  if (status === 'default') return { ...defaultProps }
  return { ...disabledProps }
}

const redeemButtonText = {
  default: 'Redeem',
  approve: 'Approve in your wallet...',
  rejected: 'Transaction rejected',
  error: 'An error occurred',
}
const Info = ({ title, value }: { title: string; value: string | number }) => (
  <Flex gap={2} fontWeight={'bold'}>
    <Text textColor={'text.low'}>{title}</Text>
    <Text textColor={'text.accent'}>{value}</Text>
  </Flex>
)
