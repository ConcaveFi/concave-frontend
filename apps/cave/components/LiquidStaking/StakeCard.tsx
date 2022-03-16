import { BaseModal, Flex, Image, Stack, Text } from '@concave/ui'
import { ButtonLink } from 'components/ButtonLink'
import { Progress } from '@chakra-ui/react'

const InfoItem = ({ value, label, fontWeight, ...props }) => (
  <Stack
    spacing={0}
    fontWeight={fontWeight ? fontWeight : 'bold'}
    textAlign="center"
    px={8}
    {...props}
  >
    <Text fontSize="lg" fontFamily="heading">
      {value}
    </Text>
    <Text fontSize="sm" color="text.low">
      {label}
    </Text>
  </Stack>
)

const LiquidStakingInfo = ({ asset, vapr, stakedcnv, icon }) => {
  return (
    <BaseModal
      bgGradient={''}
      px={0}
      borderRadius={40}
      width={160}
      height={296}
      py={4}
      position="relative"
      direction="column"
      shadow="Medium Glow Up"
    >
      <Flex direction="column" gap={1}>
        <InfoItem value={''} label="Stake Period" pl={7} />
        <InfoItem value={asset.toUpperCase()} label="" pl={7} />
        <Image
          src={'/assets/12m.png'}
          alt="concave logo"
          maxWidth="180px"
          position="relative"
          background={''}
        />
        <InfoItem value={''} label="vAPR" pl={7} fontWeight={'bold'} />
        <InfoItem value={vapr.toUpperCase()} fontWeight={'bold'} label="" pl={7} />
      </Flex>
    </BaseModal>
  )
}

function StakeCard(props) {
  return (
    <div>
      <BaseModal
        w="220px"
        h="450px"
        borderWidth={0}
        borderRadius={16}
        px={6}
        py={10}
        shadow="up"
        bgGradient="linear(to-tr, secondary.150, secondary.100)"
        gap={1}
      >
        <LiquidStakingInfo asset="12 Month" icon="" vapr="6,342%" stakedcnv="83,431 CNV" />
        <Text ml={'17.5%'} color="text.low" fontSize={8}>
          Currently Staked | Staking Cap
        </Text>
        <Progress colorScheme="blue" size="lg" value={20} />

        {/* <LiquidStakingCNV stakedcnv="83,431 CNV" /> */}

        <ButtonLink
          top={'4%'}
          href="/StakeCNV12"
          fontWeight={'medium'}
          position={'relative'}
          variant="primary.outline"
          bgGradient="linear(90deg, #72639B 0%, #44B9DE 100%)"
          w="92.5%"
          h="40px"
          size="large"
          borderRadius="3xl"
        >
          Stake CNV
        </ButtonLink>
      </BaseModal>
    </div>
  )
}

export default StakeCard
