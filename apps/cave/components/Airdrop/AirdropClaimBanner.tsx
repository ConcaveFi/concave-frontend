import { CloseIcon } from '@concave/icons'
import {
  Button,
  Card,
  CardProps,
  Flex,
  Heading,
  Image,
  useBreakpointValue,
  useDisclosure,
} from '@concave/ui'
import { useAirdrop } from 'contexts/AirdropContext'

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

export function AirdropClaimBanner() {
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true })
  const { onOpen } = useAirdrop()
  const isMobile = useBreakpointValue({ base: true, sm: false })
  if (!isOpen) return <></>
  return (
    <Flex pos={isMobile ? 'unset' : 'fixed'} m={isMobile ? 0 : 6} right={0} zIndex={10}>
      <Card {...airdropBanner} mx={2} minH={'90px'}>
        <Image pr="4" src="./assets/airdrop/airdrop.png" w="35px" alt="airdrop-icon" />
        <Flex flex={1} direction={'column'}>
          <Heading fontSize={'md'} fontWeight="semibold">
            NEW Airdrop is here!
          </Heading>
          <Heading fontSize={'md'} fontWeight="medium" textColor={'text.low'}>
            click to redeem now
          </Heading>
        </Flex>
        <Flex gap={3}>
          <Button onClick={onOpen} w="85px" h="38px" bg="stroke.brightGreen">
            Claim
          </Button>
          <Button
            bg="blackAlpha.700"
            border="2px solid white"
            p={1.5}
            rounded="full"
            pos="absolute"
            top="-4px"
            right="-4px"
            onClick={onClose}
          >
            <CloseIcon w="8px" h="8px" />
          </Button>
        </Flex>
      </Card>
    </Flex>
  )
}
