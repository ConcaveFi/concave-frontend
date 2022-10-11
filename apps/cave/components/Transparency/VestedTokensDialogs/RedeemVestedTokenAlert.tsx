import { Flex, Modal, Text } from '@concave/ui'

interface RedeemVestedTokenAlertProps {
  onClose: () => void
  isOpen: boolean
}

export default function RedeemVestedTokenAlert(props: RedeemVestedTokenAlertProps) {
  return (
    <Modal
      preserveScrollBarGap
      onClose={props.onClose}
      title={'Error'}
      isOpen={props.isOpen}
      hideClose
      isCentered
      motionPreset="slideInBottom"
    >
      <Flex>
        <Flex height={'120px'} width="240px" direction={'column'}>
          <Flex position={'absolute'} width="85%" justify={'end'} alignSelf="start">
            <Text
              fontSize={'2xl'}
              fontWeight="bold"
              textAlign={'center'}
              textColor="text.low"
              mt={'5'}
            >
              You do not have enough balance.
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Modal>
  )
}
