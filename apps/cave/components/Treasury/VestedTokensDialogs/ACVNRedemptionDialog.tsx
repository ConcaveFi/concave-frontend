import { Modal, Card, Text, Flex, Button } from '@concave/ui'
import { Contract } from 'ethers'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { aCNVredeemabi } from 'lib/contractoABI'
import { concaveProvider as provider } from 'lib/providers'
import { MdOutlineRedeem } from 'react-icons/md'

interface ACVNRedemptionDialogProps {
  onRedeem: () => void
  onClose: () => void
  isOpen: boolean
}

export default function ACVNRedemptionDialog(props: ACVNRedemptionDialogProps) {
  const { onRedeem, onClose, isOpen } = props
  const networkdId = useCurrentSupportedNetworkId()
  const aCNVContract = new Contract(
    '0x38baBedCb1f226B49b2089DA0b84e52b6181Ca59',
    aCNVredeemabi,
    provider(networkdId),
  )

  return (
    <Modal
      bluryOverlay
      title="Redeem aCVN"
      motionPreset="slideInBottom"
      isOpen={isOpen}
      onClose={onClose}
      preserveScrollBarGap
      isCentered
    >
      <Card gap={4} width={'300px'} height="240px" m={-6} justify="center" align={'center'}>
        <Flex
          direction={'column'}
          shadow={'Down Medium'}
          rounded="2xl"
          align={'center'}
          height={'100px'}
          px="5"
          justify={'center'}
        >
          <Text fontSize={'22'} fontWeight="bold">
            Current balance:
          </Text>
          <Text textColor={'text.low'} fontWeight="bold" fontSize={'18'}>
            $0,450.00
          </Text>
        </Flex>
        <Button onClick={onRedeem} py={2} fontSize="22" variant={'primary.outline'} width="210px">
          Redeem
        </Button>
      </Card>
    </Modal>
  )
}
