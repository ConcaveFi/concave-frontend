import { Flex, Image, Link, Text } from '@concave/ui'
import { useAirdropSeason } from 'hooks/useAirdropSeason'
import { AirdropClaimButton } from './AirdropClaimButton'

export function AirdropClaimCard() {
  const Q4 = useAirdropSeason('Q4')

  return (
    <Flex
      w={'full'}
      direction={{ base: 'column', md: 'row' }}
      gap={{ base: 2, sm: 4 }}
      px={{ base: 0, sm: 4 }}
    >
      <Flex flex={1}>
        <Flex direction={'column'} flex={1} align={'center'}>
          <Text pb="6" textAlign={'center'} mt={2} color="text.low">
            Q4 airdrop is up! <br />
            <Link
              pr={1}
              color={'text.bright'}
              href="https://concave.lol/blog/concave-q4-airdrop-is-here/"
              isExternal
            >
              Click here
            </Link>
            for more info
          </Text>
          <ItemInfo info={`${Q4.redeemable || 0} USDC`} title="Redeemable amount" />
          <AirdropClaimButton {...Q4} season="Q4" />
        </Flex>
      </Flex>
    </Flex>
  )
}
interface ItemInfoProps {
  title: string
  info: string
}
function ItemInfo(props: ItemInfoProps) {
  const { info, title } = props
  return (
    <Flex direction={'column'} align="center">
      <Text textColor={'text.low'} fontWeight="500">
        {title}
      </Text>
      <Flex align={'center'} fontWeight="semibold" gap={1}>
        <Text>{info}</Text>
        <Image src="/assets/tokens/usdc-logo.webp" boxSize={'22px'} alt="usdc token icon" />
      </Flex>
    </Flex>
  )
}
