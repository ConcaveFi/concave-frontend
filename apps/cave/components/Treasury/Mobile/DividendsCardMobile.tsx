import { Card, Flex, Text } from '@concave/ui'
import { GlassPanel } from '../TreasuryManagementCard'

export default function DividendsCardMobile() {
  return (
    <Card
      width={'340px'}
      height="281px"
      bg={'#111c'}
      textShadow="0px 0px 27px rgba(129, 179, 255, 0.31)"
      shadow={'up'}
    >
      <Flex
        fontSize={'3xl'}
        fontWeight="bold"
        mx={6}
        justify="center"
        direction={'column'}
        flexBasis="70%"
      >
        <Text>Dividends</Text>
        <Text fontSize={'12px'} textColor="text.low">
          Dividends are distributed on a quarterly basis to the holders. You may redeem these
          dividends upon the distribution date on the My Positions page.
        </Text>
      </Flex>
      <GlassPanel
        flexBasis={'35%'}
        width="290px"
        align={'center'}
        justify={'center'}
        rounded="2xl"
        mx={'auto'}
        mb={7}
        direction="column"
      >
        <Text fontSize={'2xl'} fontWeight="bold">
          Coming Soon
        </Text>
        <Text fontSize={'16px'} fontWeight="bold" textColor="text.low">
          Next Distribution Date
        </Text>
      </GlassPanel>
    </Card>
  )
}
