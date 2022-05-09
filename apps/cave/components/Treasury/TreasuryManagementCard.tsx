import { Button, Card, Flex, FlexProps, Text } from '@concave/ui'

interface TreasuryCardProps {
  onChange: () => void
}
export default function TreasuryManagementCard(props: TreasuryCardProps) {
  return (
    <Card
      direction={'column'}
      width={'900px'}
      height="330px"
      bg={'#111e'}
      shadow={'0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 0px 20px rgba(87, 124, 255, 0.3)'}
    >
      <Flex width={'full'} justify="center">
        <TreasyAssetsTitle />
      </Flex>
      <FarmingViewer />
    </Card>
  )
}

const FarmingViewer = () => {
  return (
    <GlassPanel width={'477px'} height="157px" rounded={'2xl'}>
      <Flex>
        <GlassPanel my="auto" minWidth={'244px'} height="131px" rounded={'2xl'}></GlassPanel>
        <Flex
          direction={'column'}
          my="auto"
          width={'160px'}
          height="131px"
          justify={'center'}
          align="start"
          ml={10}
        >
          <Text fontWeight={'700'} fontSize="18px">
            Farming:
          </Text>
          <Text fontWeight={'700'} fontSize="16px">
            UST: $6,527,873
          </Text>
          <Text fontWeight={'700'} fontSize="16px">
            3Crv: $5,237,468
          </Text>
        </Flex>
      </Flex>
    </GlassPanel>
  )
}

const TreasyAssetsTitle = () => {
  return (
    <GlassPanel width={'397px'} minH="62px" rounded={'0px 0px 16px 16px'}>
      <Text fontSize={'20px'} fontWeight="700">
        Treasury Asstets and Activity
      </Text>
    </GlassPanel>
  )
}

const GlassPanel: React.FC<FlexProps> = ({ ...props }) => {
  return (
    <Flex bg={'linear-gradient(90deg, #72639B 0%, #44B9DE 100%)'} boxShadow={'up'} {...props}>
      <Flex
        flex={1}
        boxShadow={'down'}
        m={'1px'}
        bg="url(assets/textures/glass.jpg)"
        bgSize={'100%'}
        bgPos="center"
        rounded="inherit"
      >
        <Flex
          rounded="inherit"
          justify={'center'}
          align="center"
          bg={'#21293077'}
          width="full"
          direction={'column'}
        >
          {props.children}
        </Flex>
      </Flex>
    </Flex>
  )
}
