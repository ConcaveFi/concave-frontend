import { DAI } from '@concave/core'
import { Avatar, Card, Flex, gradientBorder, Text } from '@concave/ui'

export const TokenInfoCard = () => {
  return (
    <Card
      w="520px"
      h="336px"
      textShadow={'0px 0px 27px rgba(129, 179, 255, 0.31)'}
      variant="secondary"
      fontWeight="bold"
      px={9}
      pt={6}
    >
      <Flex align={'center'} gap={2} mb={3}>
        <Avatar
          src={`https://raw.githubusercontent.com/ConcaveFi/assets/master/blockchains/ethereum/assets/${DAI[1].address}/logo.png`}
          size="md"
        />
        <Text fontSize={'4xl'}>{DAI[1].name}</Text>
      </Flex>
      <Flex gap={4}>
        <Info label="Website" />
        <Info label="Twitter" />
        <Info label="Tokenomics" />
      </Flex>
      <Text fontSize={'14px'} mt={4}>
        Qredo is rearchitecting digital asset ownership and blockchain connectivity. A radical new
        approach to bring liquidity and capital efficiency to the blockchain economy, Qredo has
        pioneered the first decentralized trustless multi-party computation (MPC) custodial network.
        This advancement enables Qredo to offer decentralized custody, native cross-chain swaps, and
        cross-platform liquidity access.
      </Text>
    </Card>
  )
}

type Info = { label: string }
const Info: React.FC<Info> = ({ label }) => {
  return <Text fontSize={'2xl'}>{label}</Text>
}
