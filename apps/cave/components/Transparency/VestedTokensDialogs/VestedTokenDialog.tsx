import { CloseButton, Modal, ModalContent, ModalOverlay } from '@chakra-ui/react'
import { Token } from '@concave/core'
import { InfoIcon } from '@concave/icons'
import { Button, Card, Flex, Spinner, Text } from '@concave/ui'
import { ConcaveTooltip } from 'components/ConcaveTooltip/ConcaveTooltip'
import { ToggleButton } from 'components/ToggleButton'
import { VestedTokenButtonProps } from 'components/Transparency/TreasuryRedeemCard'
import { BigNumber } from 'ethers'
import { formatEther, parseEther } from 'ethers/lib/utils'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { VestedTokenInput } from './VestedTokenDialogInput'

type VestedTokenDialogProps = {
  tokenUserData: { redeemable: BigNumber; redeemed: BigNumber; balance: BigNumber }
  isLoading: boolean
  onRedeem: (amount: BigNumber, redeemMax: boolean) => void
  onChangeValue?: (value: BigNumber) => void
  status?: 'default' | 'approve' | 'rejected' | 'error' | 'submitted'
  children?: JSX.Element | JSX.Element[]
  token: Token
}
export const VestedTokenDialog: React.FC<VestedTokenButtonProps & VestedTokenDialogProps> = ({
  onClose,
  onRedeem,
  onChangeValue,
  isOpen,
  tokenUserData,
  isLoading,
  status,
  token,
  children,
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
  useEffect(() => (onChangeValue ? onChangeValue(currentValue) : undefined), [redeemMax, value])

  return (
    <>
      <Modal
        preserveScrollBarGap
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        motionPreset="slideInBottom"
        closeOnOverlayClick
      >
        <ModalOverlay backdropBlur={'8px'} />4
        <ModalContent>
          <Card
            overflow={'visible'}
            width={'340px'}
            minW="280px"
            variant="primary"
            px={6}
            gap={2}
            justify="center"
            py={6}
          >
            <Flex position={'relative'} align="start" justify={'end'}>
              <Text fontSize={'2xl'} fontWeight={'bold'} mx="auto">
                Redeem {token?.symbol}
              </Text>
              <CloseButton
                onClick={onClose}
                color={'text.small'}
                mt={-5}
                mr={-5}
                position={'absolute'}
                size="md"
              />
            </Flex>
            <VestedTokenInput
              redeemable={redeemable}
              redeemMax={redeemMax}
              balance={balance}
              onChangeValue={setValue}
              value={value}
            />
            <Flex zIndex={2} direction={'column'} fontSize="14px" px={2}>
              <Info
                title="Redeemable:"
                value={isLoading ? 'Loading...' : formatEther(redeemable || '0')}
              />
              <Info
                title="Redeemed:"
                value={isLoading ? 'Loading...' : formatEther(redeemed || '0')}
              />
              {children}
              <Text
                fontWeight={'bold'}
                textColor="text.accent"
                opacity="0.5"
                fontSize={'xs'}
              ></Text>
            </Flex>
            <Flex gap={2} fontWeight={'bold'} pl={2} align="center" zIndex={1}>
              <Text textColor={'gray.200'}>Redeem max</Text>
              <ToggleButton enabled={redeemMax} onToggle={setRedeemMax} />
              <ConcaveTooltip
                label={`Attempts to redeem all of your currently available ${
                  token?.symbol || 'amount'
                }`}
                icon={<InfoIcon color={'text.low'} cursor="pointer" />}
              />
            </Flex>

            <Button
              zIndex={0}
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
        </ModalContent>
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
