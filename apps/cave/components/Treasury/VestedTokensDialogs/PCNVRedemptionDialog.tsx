import { Flex, Modal, Text } from '@concave/ui'
import { VestedTokenButtonProps } from '../TreasuryRedeemCard'

export const PCNVRedemptionDialog: React.FC<VestedTokenButtonProps> = ({ isOpen, onClose }) => {
  return (
    <Modal
      isCentered
      motionPreset="slideInBottom"
      preserveScrollBarGap
      title={''}
      hideClose
      onClose={onClose}
      isOpen={isOpen}
    >
      <Flex width={'220px'} height="140px" direction={'column'} px="3">
        <Text fontSize={'2xl'} fontWeight="bold" mx={'auto'} mt="2">
          {`pCNV`}
        </Text>
        <Text textAlign={'center'} textColor={'text.low'} fontWeight="bold" fontSize={'lg'}>
          {`We're busy mining the pCNV token, come back later.`}
        </Text>
      </Flex>
    </Modal>
  )
}
