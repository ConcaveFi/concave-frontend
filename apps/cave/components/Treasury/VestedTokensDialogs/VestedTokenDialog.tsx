import { InfoIcon } from '@concave/icons'
import { Button, Card, Collapse, Flex, Modal, Spinner, Text, Tooltip } from '@concave/ui'
import { ToggleButton } from 'components/ToggleButton'
import { VestedTokenButtonProps } from 'components/Treasury/TreasuryRedeemCard'
import { BigNumber } from 'ethers'
import { formatEther, parseEther } from 'ethers/lib/utils'
import { useState } from 'react'
import { useAccount } from 'wagmi'
import { VestedTokenInput } from './VestedTokenDialogInput'

type VestedTokenDialogProps = {
  tokenUserData: { redeemable: BigNumber; redeemed: BigNumber; balance: BigNumber }
  tokenName?: string
  isLoading: boolean
  onRedeem: (amount: BigNumber, redeemMax: boolean) => void
  status: 'default' | 'approve' | 'rejected' | 'error' | 'submitted'
  title?: string
  conversionLabel?: string
  conversionValue?: BigNumber
}
export const VestedTokenDialog: React.FC<VestedTokenButtonProps & VestedTokenDialogProps> = ({
  onClose,
  isOpen,
  tokenUserData,
  isLoading,
  onRedeem,
  status,
  title,
  tokenName,
  conversionLabel,
  conversionValue,
}) => {
  const { isConnected } = useAccount()
  const { redeemable, redeemed, balance } = tokenUserData || {}
  const [value, setValue] = useState<string>()
  const [redeemMax, setRedeemMax] = useState(true)

  const insufficientFunds = balance?.isZero() || parseEther(value || '0.0').gt(balance)
  const invalidAmount = !insufficientFunds && parseEther(value || '0.0')?.isZero() && !redeemMax
  const nothingToRedeem = (redeemable?.isZero() || redeemable?.eq(balance)) && !insufficientFunds
  const redeemableExceeded =
    !redeemMax &&
    parseEther(value || '0')?.gt(redeemable || 0) &&
    !insufficientFunds &&
    !nothingToRedeem
  const validValue = !invalidAmount && !insufficientFunds && !nothingToRedeem && !redeemableExceeded
  return (
    <>
      <Modal
        title={title}
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
            <Collapse
              in={!!conversionValue && (validValue || (redeemMax && !redeemable?.isZero()))}
            >
              {conversionValue && (
                <Info
                  title="You will receive:"
                  value={formatEther(parseEther(value || '0').mul(conversionValue)) + ' CNV'}
                />
              )}
            </Collapse>
            {conversionLabel && (
              <Text fontWeight={'bold'} opacity="0.3" fontSize={'xs'}>
                {conversionLabel}
              </Text>
            )}
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
              label={`Attempts to redeem all of your currently available ${tokenName || 'amount'}`}
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
                  {invalidAmount && 'Invalid amount'}
                  {nothingToRedeem && 'Nothing to redeem'}
                  {insufficientFunds && 'Insufficient funds'}
                  {redeemableExceeded && 'Redeemable exceeded'}
                  {validValue && redeemButtonText[status]}
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
  error: 'Ocurred an error',
}
const Info = ({ title, value }: { title: string; value: string | number }) => (
  <Flex gap={2} fontWeight={'bold'}>
    <Text textColor={'text.low'}>{title}</Text>
    <Text textColor={'text.accent'}>{value}</Text>
  </Flex>
)
