import { Button, Card, Flex, Image, Modal, Text } from '@concave/ui'
import { BigNumber } from 'ethers'
import { formatEther, parseEther } from 'ethers/lib/utils'
import { formatFixed } from 'utils/formatFixed'

type PCNVConfirmationModalProps = {
  redeemMax?: boolean
  isOpen?: boolean
  onClose?: VoidFunction
  onAccept: (amount: BigNumber, redeemMax: boolean) => void
  amount: BigNumber
  difference: number
}
export const PCNVConfirmationModal: React.FC<PCNVConfirmationModalProps> = ({
  isOpen,
  onClose,
  amount,
  difference,
  onAccept,
  redeemMax,
}) => {
  const convertedValue = (+formatEther(amount || 0) * difference)?.toFixed(12) || '0'
  return (
    <Modal
      isOpen={isOpen}
      title=""
      hideClose
      onClose={onClose}
      isCentered
      bluryOverlay
      motionPreset="slideInBottom"
    >
      <Flex w="300px" h="320px" rounded={'inherit'} direction="column" gap={4}>
        <ImageContainer />
        <Flex
          direction={'column'}
          fontWeight={'bold'}
          fontSize="xl"
          height={'65%'}
          w="full"
          shadow={'down'}
          rounded="inherit"
          px={10}
          justify="center"
          textAlign={'center'}
        >
          <Text color={'text.low'}>{`You sure you want to swap `}</Text>
          <Text color={'text.accent'}>{`${formatFixed(amount, { places: 5 })}  pCNV`}</Text>
          <Text color={'text.low'}>{`for`}</Text>
          <Text>{`${formatFixed(parseEther(convertedValue), { places: 5 })} CNV?`}</Text>
        </Flex>
        <Flex my={'auto'} justify="space-around">
          <Button onClick={onClose} variant={'secondary'} w={'135px'} h="40px">
            Decline
          </Button>
          <Button
            onClick={() => {
              onClose()
              onAccept(amount, redeemMax)
            }}
            variant={'primary'}
            w={'135px'}
            h="40px"
          >
            Accept
          </Button>
        </Flex>
      </Flex>
    </Modal>
  )
}
const ImageContainer = () => (
  <Card
    variant="secondary"
    w={'full'}
    h="70px"
    rounded={'inherit'}
    shadow="Down Medium"
    p={3}
    justify="center"
    gap={1}
    direction="row"
  >
    <Image src={'/assets/tokens/pcnv.svg'} alt="pcnv logo" />
    <Text my={'auto'} fontSize="2xl" fontWeight={'bold'}>
      pCNV redemption
    </Text>
  </Card>
)
