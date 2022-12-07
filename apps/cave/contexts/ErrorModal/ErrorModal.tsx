import { Box, Button, HStack, Modal, Text, VStack } from '@concave/ui'
import { useErrorModal } from './useErrorModal'

export const ReportErrorModal = () => {
  const { infos, isOpen, onClose, onConfirm } = useErrorModal()
  return (
    <Modal
      bluryOverlay={true}
      title="Report Error"
      titleAlign="center"
      isOpen={isOpen}
      onClose={onClose}
      bodyProps={{ w: '450px', gap: 3, textAlign: 'center' }}
    >
      <VStack>
        <Text fontWeight={'bold'} size={'md'}>
          Do you want to report this?
        </Text>
        <Text as="i" fontSize={'sm'}>
          We will send your address and wallet name (MetaMask, Brave Wallet), error, browser and
          System Operation info
        </Text>
        <Box p={2} borderRadius={'2xl'} shadow={'Down Big'}>
          {Object.entries(infos).map((i) => {
            return (
              <HStack key={i[0]} maxW={'full'}>
                {' '}
                <Text fontWeight={'bold'}>{i[0]}:</Text>
                <Text fontSize={'sm'}>{i[1]}</Text>
              </HStack>
            )
          })}
        </Box>
        <Box p={2}></Box>
        <HStack w={'full'}>
          <Button
            w={'full'}
            onClick={() =>
              onConfirm({
                userDescription: '',
                extra: infos,
              })
            }
            p={2}
            variant={'primary'}
          >
            Yes
          </Button>
          <Button w={'full'} onClick={onClose} p={2} variant={'secondary'}>
            No
          </Button>
        </HStack>
      </VStack>
    </Modal>
  )
}
