import { AirdropIcon, CloseIcon } from '@concave/icons'
import { Button, ButtonProps, Card, CardProps, Flex, Heading, useDisclosure } from '@concave/ui'
import { AirdropClaimModal } from './ClaimModal/AirdropClaimModal'

export function AirdropClaimBanner() {
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true })
  const claimModal = useDisclosure()

  if (!isOpen) return <></>
  return (
    <Flex
      pt={{ base: 9, md: 5 }}
      justify={'end'}
      pos="absolute"
      mx={'auto'}
      w="full"
      left={0}
      px={7}
    >
      <Card {...airdropBanner}>
        {/* Icon */}
        <AirdropIcon w={'50px'} h={'50px'} fill={'text.bright'} mx={6} />

        {/* Content */}
        <Flex flex={1} direction={'column'} gap={2}>
          <Heading color={'text.low'} fontWeight="semibold">
            Airdrop
          </Heading>
          <Button onClick={claimModal.onOpen} size={'sm'} rounded="full" variant={'primary'}>
            Claim rewards
          </Button>
        </Flex>
        <Button {...closeButtonProps} onClick={onClose}>
          <CloseIcon w="8px" h="8px" />
        </Button>
      </Card>
      <AirdropClaimModal isOpen={claimModal.isOpen} onClose={claimModal.onClose} />
    </Flex>
  )
}

// Styles

const airdropBanner: CardProps = {
  variant: 'secondary',
  overflow: 'visible',
  direction: 'row',
  align: 'center',
  rounded: '3xl',
  zIndex: 10,
  w: '300px',
  h: '90px',
  pr: 8,
}

const closeButtonProps: ButtonProps = {
  border: '2px solid',
  rounded: 'full',
  pos: 'absolute',
  bg: '#0009',
  left: '94%',
  top: '-5%',
  p: '6px',
}
