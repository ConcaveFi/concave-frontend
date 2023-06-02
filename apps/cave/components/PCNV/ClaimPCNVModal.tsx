import { WithdrawIcon } from '@concave/icons'
import { Button, Flex, Heading, Image, Modal, Text } from '@concave/ui'
import { useRouter } from 'next/router'

export function ClaimPCNVModal(props: { isOpen: boolean; onClose: VoidFunction }) {
  return (
    <Modal
      {...props}
      hideClose
      title=""
      bluryOverlay
      isCentered
      bodyProps={{
        height: 'fit',
        align: 'center',
        variant: 'primary',
        borderGradient: '',
        boxShadow: 'up',
        width: '360px',
        gap: 4,
      }}
    >
      <Image width={'190px'} h={'200px'} src="/assets/airdrop/cube.png" />
      <Heading
        textShadow={'0px 0px 27px rgba(129, 179, 255, 0.31)'}
        fontWeight={'bold'}
        fontSize={'3xl'}
      >
        Got pCNV tokens?
      </Heading>
      <Text textAlign={'center'} fontSize={'sm'} fontWeight={'medium'}>
        Press "Claim" below to redeem them for CNV! &nbsp; See the exact conversion using the
        calculations bellow. Remember, it's a one-time deal and your pCNV won't be redeemable
        afterwards.
      </Text>
      <Text color={'text.bright'}>Read the doc for more info</Text>
      <Flex w={'full'} p={4} gap={2} flexDirection={'column'} rounded={'xl'} shadow={'down'}>
        <Flex gap="2">
          <Text color={'text.bright'} fontSize={'sm'}>
            You have:
          </Text>
          <Text fontSize={'sm'} fontWeight={'bold'}>
            343.43.43.4 pCNV
          </Text>
        </Flex>
        <Flex gap="2">
          <Text color={'text.bright'} fontSize={'sm'}>
            You receive:
          </Text>
          <Text fontSize={'sm'} fontWeight={'bold'}>
            343.43.43.4 pCNV
          </Text>
        </Flex>
      </Flex>
      <Button variant="primary" py={2} w="full">
        <WithdrawIcon boxSize={'30px'} />
        Claim pCNV
      </Button>
    </Modal>
  )
}
