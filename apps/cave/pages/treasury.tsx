import { SpinnerIcon } from '@concave/icons'
import { Card, Flex, ScaleFade, Text } from '@concave/ui'
import { withPageTransition } from 'components/PageTransition'
import DividendsCard from 'components/Treasury/DividendsCard'
import { BondGraphics } from 'components/Treasury/GraphicsContainer'
import DividendsCardMobile from 'components/Treasury/Mobile/DividendsCardMobile'
import RedeemMobileCard from 'components/Treasury/Mobile/RedeemMobileCard'
import TreasuryManagementMobile, {
  spinAnimation,
} from 'components/Treasury/Mobile/TreasuryManagementMobile'
import TreasuryRevenueMobile from 'components/Treasury/Mobile/TreasuryRevenueMobile'
import TreasuryManagementCard from 'components/Treasury/TreasuryManagementCard'
import TreasuryRedeemCard from 'components/Treasury/TreasuryRedeemCard'
import TreasuryRevenueCard from 'components/Treasury/TreasuryRevenueCard'
import { useGet_Amm_Cnv_InfosQuery, useGet_TreasuryQuery } from 'graphql/generated/graphql'

export function Treasury() {
  const { status: treaStatus, data: treaData } = useGet_TreasuryQuery()
  const { status: cnvStatus, data: cnvData } = useGet_Amm_Cnv_InfosQuery()

  const revenueCardLoaded =
    treaStatus === 'success' && cnvStatus === 'success' && cnvData && !!treaData

  return (
    <>
      <Flex
        mt={20}
        width={'full'}
        justify="center"
        align={'center'}
        gap={4}
        direction="column"
        display={{ base: 'flex', md: 'none' }}
      >
        <TreasuryRevenueMobile cnv={cnvData} treasury={treaData} loading={!revenueCardLoaded} />
        <RedeemMobileCard />
        <BondGraphics />
        <TreasuryManagementMobile
          loading={cnvStatus !== 'success' && !cnvData}
          treaData={treaData}
        />
        <DividendsCardMobile />
      </Flex>
      <Flex
        display={{ base: 'none', md: 'flex' }}
        height={'full'}
        width="full"
        align={'center'}
        justify="center"
        position={'relative'}
      >
        <Flex direction={'column'} maxWidth={'1000px'}>
          <Flex
            direction={{ base: 'column', xl: 'row' }}
            width={'full'}
            justify={{ base: 'space-between' }}
            gap={{ base: 3, xl: 0 }}
          >
            <ScaleFade in={revenueCardLoaded}>
              {treaStatus === 'success' && cnvStatus === 'success' && cnvData && treaData && (
                <TreasuryRevenueCard cnv={cnvData} treasury={treaData} />
              )}
            </ScaleFade>
            <LoadingState
              title={'Loading revenue values'}
              mr={6}
              my={0}
              width={{ base: '510px', xl: '630px' }}
              isLoading={!revenueCardLoaded}
            />
            <TreasuryRedeemCard />
          </Flex>
          <BondGraphics />
          {/* for treasury assets  */}
          <ScaleFade in={revenueCardLoaded}>
            {cnvStatus === 'success' && cnvData && <TreasuryManagementCard assets={treaData} />}
          </ScaleFade>
          <LoadingState
            title="Loading assets"
            width={{ base: '510px', xl: '900px' }}
            isLoading={!revenueCardLoaded}
            my={6}
          />
          <DividendsCard />
        </Flex>
      </Flex>
    </>
  )
}

const LoadingState = (props) => {
  return (
    <ScaleFade in={props.isLoading}>
      <Card
        mr={props.mr}
        my={props.my}
        display={props.isLoading ? 'flex' : 'none'}
        width={props.width}
        height="330px"
        justify={'center'}
        align="center"
        variant="secondary"
        direction={'column'}
        gap={6}
      >
        <Text fontSize={'4xl'} fontWeight="700">
          {props.title}
        </Text>
        <SpinnerIcon color={'text.low'} width={'60px'} height="60px" animation={spinAnimation(3)} />
      </Card>
    </ScaleFade>
  )
}

Treasury.Meta = {
  title: 'Concave | Treasury',
  description: `Concave has treasury strategies to take advantage of yield opportunities. It is broken down into Investment Research, Delta Neutral, and Stable Farm strategies.`,
}

export default withPageTransition(Treasury)
