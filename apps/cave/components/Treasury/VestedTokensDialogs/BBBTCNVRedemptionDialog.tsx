import { Box, Button, Card, Flex, Modal, Text, Input, NumericInput } from '@concave/ui'
import { useState } from 'react'
import useBBTCNVRedeemable from '../Hooks/useBBTCNVRedeemable'
import { GlassPanel } from '../TreasuryManagementCard'

interface BBBTCNVRedemptionDialogProps {
  onClose: () => void
  isOpen: boolean
}

export default function BBBTCNVRedemptionDialog(props: BBBTCNVRedemptionDialogProps) {
  const { onClose, isOpen } = props
  const [value, setValue] = useState(0)

  const balance = 70
  const redeemable = 120

  const redeemableExceeded = value > redeemable && value <= balance
  const insufficientValue = value > balance
  const invalidValue = !value
  const validValue = !insufficientValue && !invalidValue && !redeemableExceeded

  const { data: redeemableValue, isLoading } = useBBTCNVRedeemable()

  return (
    <>
      <Modal
        title="Redeem bbtCNV"
        bluryOverlay
        preserveScrollBarGap
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        motionPreset="slideInBottom"
      >
        <Card width={'300px'} height="200px" m={-6}>
          {/* Input Container */}
          <Flex
            mt={4}
            width={'270px'}
            height="74px"
            shadow={'Down Medium'}
            rounded="2xl"
            mx={'auto'}
            direction="column"
            py={2}
            px={4}
            gap={2}
          >
            <Flex>
              <NumericInput
                value={value}
                onChange={(e) => setValue(parseFloat(e.target.value.replaceAll(',', '')))}
              />
              <Button
                _focus={{}}
                onClick={() => setValue(redeemable)}
                variant={'primary.outline'}
                width="110px"
              >
                Max
              </Button>
            </Flex>
            <Flex
              width={'fit-content'}
              gap={1}
              textColor="text.low"
              cursor={'pointer'}
              fontSize={'13'}
              transition="all .2s"
              _hover={{ transform: 'scale(1.1)', textColor: 'white' }}
              userSelect="none"
              onClick={() => setValue(balance)}
            >
              <Text onClick={() => {}} fontWeight="bold">
                Balance: ${balance.toFixed(2)}
              </Text>
              <Text textColor={'text.accent'} fontWeight="bold">
                Max
              </Text>
            </Flex>
          </Flex>
          <Flex width={'270px'} px={4} mx={'auto'} mt={1} gap={1}>
            <Text textColor={'text.low'} fontSize={'15'} fontWeight="bold">
              Redeemable:
            </Text>
            <Text textColor={'text.accent'} fontSize={'15'} fontWeight="bold">
              ${redeemable.toFixed(2)}
            </Text>
          </Flex>
          <Button
            shadow={validValue ? 'up' : 'down'}
            fontSize={'20'}
            height={'55px'}
            width="270px"
            mx={'auto'}
            variant="primary.outline"
            my={4}
            textColor={!validValue && 'text.low'}
          >
            {redeemableExceeded && 'Redeemable Exceeded'}
            {invalidValue && 'Invalid value'}
            {validValue && 'Redeem'}
            {insufficientValue && 'Insufficient Value'}
          </Button>
        </Card>
      </Modal>
    </>
  )
}
