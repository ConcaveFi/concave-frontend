import { Box, Flex, Image, Spinner, Stack, Text } from '@chakra-ui/react'
import { StakingV1Contract } from '@concave/marketplace'
import { Card } from '@concave/ui'
import { ethers, utils } from 'ethers'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { concaveProvider } from 'lib/providers'
import { POOL_ID_TO_DAYS } from 'utils/contants'
import { truncateNumber } from 'utils/truncateNumber'
import { StakeData } from './hooks/useLiquidStakeData'
import { useLiquidValues } from './hooks/useLiquidValues'
import { usePools, useViewStakingCap } from './StakeCard_old'

type StakeCardProps = { props: StakeData }
export const StakeCard = (props: StakeCardProps) => {
  const chainId = useCurrentSupportedNetworkId()
  const { poolId, baseEmissions, bondEmissions, totalVAPR } = props.props

  const { data } = useLiquidValues(chainId, poolId)
  const { stakingV1Pools, stakingV1Cap } = data || {}

  return (
    <Card
      variant="primary"
      px={4}
      py={6}
      shadow="up"
      textAlign={'center'}
      maxW={{ base: '160px', md: '200px' }}
    >
      <Box py={5} h={{ base: '290px', md: '333px' }} shadow="down" borderRadius="100px/90px">
        <Info title="StakePool" label={POOL_ID_TO_DAYS[poolId] + ' days'} />
        <Image
          userSelect={'none'}
          src={`/assets/liquidstaking/${POOL_ID_TO_DAYS[poolId]}d-logo.svg`}
          alt="stake period logo"
        />
        <Info title="Total vAPR" label={totalVAPR?.toFixed(2) + '%'} />
      </Box>
      <Stack color="text.low" fontSize={12} isInline justify="space-between" mt={3}>
        <Text fontWeight={'bold'}>Currently Staked</Text>
        <Text fontWeight={'bold'}>Staking Cap</Text>
      </Stack>
      <Flex>
        <Box width={'full'} height="28px" shadow={'down'} rounded="2xl" my={2} p={1}>
          <Box width={'50%'} height="full" apply={'background.metalBrighter'} rounded="full" />
          <Flex fontWeight={'bold'} fontSize={'14px'} justify="space-between" px={1} mt="-18px">
            <Text fontSize={'14px'}>{truncateNumber(stakingV1Pools?.balance || 0)}</Text>
            <Text>{truncateNumber(stakingV1Pools?.balance?.add(stakingV1Cap) || 0)}</Text>
          </Flex>
        </Box>
      </Flex>
    </Card>
  )
}

type InfoProps = { title: string; label: string }
const Info = ({ title, label }: InfoProps) => (
  <>
    <Text color="text.low" fontSize="sm">
      {title}
    </Text>
    <Text fontSize="lg" fontWeight="bold">
      {label}
    </Text>
  </>
)
{
  /* 
        <Stack>
          <Stack color="text.low" fontSize={12} isInline justify="space-between" mt={3}>
            <Text>Currently Staked</Text>
            <Text>Staking Cap</Text>
          </Stack>

          <Box
            height={'30px'}
            width={{ base: '130px', md: '170px' }}
            shadow="down"
            borderRadius="2xl"
            position="relative"
          >
            <Box
              position={'absolute'}
              width="100%"
              height={'78%'}
              rounded={'2xl'}
              my={'4px'}
              ml="5px"
              zIndex={-1}
            >
              <Flex
                transition={'all 1.3s'}
                height={'full'}
                maxW={!percent ? 'full' : `${percent}%`}
                overflow={'hidden'}
                position="relative"
              >
                <Box
                  position={'absolute'}
                  bg={'secondary.50'}
                  width={{ base: '120px', md: '160px' }}
                  height={'full'}
                  rounded="2xl"
                />
              </Flex>
            </Box>
            <Flex height="full" mx="3" justify={'space-between'} align="center" fontSize="14px">
              {isLoadingPools || isLoadingStakings ? (
                <Flex justify={'center'} width="full" align={'center'} gap={2} color="text.low">
                  <Text fontWeight={700}>Fetching</Text>
                  <Spinner transition={'all 2s'} size="sm" />
                </Flex>
              ) : (
                <>
                  <Text>{currentlyStaked}</Text>
                  <Text>{currentlyStakingCap}</Text>
                </>
              )}
            </Flex>
          </Box>
        </Stack>

        <Button
          mt={5}
          onClick={onOpen}
          fontWeight="bold"
          fontSize="md"
          variant="primary"
          bgGradient="linear(90deg, #72639B 0%, #44B9DE 100%)"
          w="92.5%"
          h="40px"
          size="large"
          mx="auto"
          disabled={!userAddress}
        >
          Stake
        </Button> */
}
