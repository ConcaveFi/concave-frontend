import {
  Button,
  ButtonProps,
  Card,
  CardProps,
  Flex,
  Heading,
  Image,
  useDisclosure,
} from '@concave/ui'
import { useAirdrop } from 'contexts/AirdropContext'
import { useIsMounted } from 'hooks/useIsMounted'

export function AirdropClaimBanner() {
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true })
  const isMounted = useIsMounted()
  const { onOpen } = useAirdrop()

  if (!isOpen) return <></>
  return (
    <Flex
      justify={'end'}
      pos="fixed"
      mx={'auto'}
      left={'40%'}
      transition="all .8s ease"
      opacity={isMounted ? 1 : 0}
      top={isMounted ? '3%' : '-2%'}
      zIndex={10}
    >
      <Card {...airdropBanner}>
        <Image pr="4" src="./assets/airdrop/airdrop.png" w="35px" alt="airdrop-icon" />
        <Flex flex={1} direction={'column'}>
          <Heading fontSize={'md'} fontWeight="semibold">
            Airdrop is here!
          </Heading>
          <Heading fontSize={'md'} fontWeight="medium" textColor={'text.low'}>
            click to redeem now
          </Heading>
        </Flex>
        <Flex gap={2}>
          <Button onClick={onOpen} w="70px" h="35px" bg="stroke.brightGreen">
            Claim
          </Button>
          <Button onClick={onClose} textColor="text.low">
            Dismiss
          </Button>
        </Flex>
        {/* <Button {...closeButtonProps} onClick={onClose}>
          <CloseIcon w="8px" h="8px" />
        </Button> */}
      </Card>
    </Flex>
  )
}

// Styles

const airdropBanner: CardProps = {
  variant: 'secondary',
  overflow: 'visible',
  direction: 'row',
  align: 'center',
  rounded: '2xl',
  zIndex: 10,
  w: '500px',
  h: '63px',
  px: 6,
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
