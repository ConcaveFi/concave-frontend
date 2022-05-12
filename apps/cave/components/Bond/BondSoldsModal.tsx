import { Card, Flex, Modal, ModalBody, ModalContent, ModalOverlay } from '@concave/ui'
import { Get_Accrualbondv1_Last10_SoldQuery } from 'graphql/generated/graphql'

interface BondSoldsModalProps {
  data: Get_Accrualbondv1_Last10_SoldQuery
  isOpen: boolean
  onClose: () => void
}

export default function BondSoldsModal(props: BondSoldsModalProps) {
  const { data, isOpen, onClose } = props

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={''}
      isCentered
      bodyProps={{ maxHeight: '2000px' }}
    >
      <Flex height={'500px'} width="2000px"></Flex>
    </Modal>
  )
}
