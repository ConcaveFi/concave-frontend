import { SpinIcon } from '@concave/icons'
import { Card, Flex, keyframes, ScaleFade, Text } from '@concave/ui'
import { withPageTransition } from 'components/PageTransition'
import DividendsCard from 'components/Treasury/DividendsCard'
import DividendsCardMobile from 'components/Treasury/Mobile/DividendsCardMobile'
import RedeemMobileCard from 'components/Treasury/Mobile/RedeemMobileCard'
import TreasuryManagementMobile from 'components/Treasury/Mobile/TreasuryManagementMobile'
import TreasuryRevenueMobile from 'components/Treasury/Mobile/TreasuryRevenueMobile'
import TreasuryManagementCard from 'components/Treasury/TreasuryManagementCard'
import TreasuryRedeemCard from 'components/Treasury/TreasuryRedeemCard'
import TreasuryRevenueCard from 'components/Treasury/TreasuryRevenueCard'
import { useGet_TreasuryQuery, useGet_Amm_Cnv_InfosQuery } from 'graphql/generated/graphql'

export function Treasury() {
  const { status: treaStatus, data: treaData } = useGet_TreasuryQuery()
  const { status: cnvStatus, data: cnvData } = useGet_Amm_Cnv_InfosQuery()

  const revenueCardLoaded =
    treaStatus === 'success' && cnvStatus === 'success' && cnvData && !!treaData

  return (
    <Flex m={20} gap={4} direction="column">
      <TreasuryRevenueMobile cnv={cnvData} treasury={treaData} loading={!revenueCardLoaded} />
      <RedeemMobileCard />
      <TreasuryManagementMobile loading={cnvStatus !== 'success' && !cnvData} treaData={treaData} />
      <DividendsCardMobile />
    </Flex>
    // <Flex height={'full'} width="full" align={'center'} justify="center" position={'relative'}>
    //   <Flex direction={'column'} maxWidth={'1000px'}>
    //     <Flex direction="row" width={'full'} justify={{ base: 'space-between' }}>
    //       <ScaleFade in={revenueCardLoaded}>
    //         {treaStatus === 'success' && cnvStatus === 'success' && cnvData && treaData && (
    //           <TreasuryRevenueCard cnv={cnvData} treasury={treaData} />
    //         )}
    //       </ScaleFade>
    //       <LoadingState
    //         title={'Loading revenue values'}
    //         mr={6}
    //         my={0}
    //         width={'630px'}
    //         isLoading={!revenueCardLoaded}
    //       />
    //       <TreasuryRedeemCard />
    //     </Flex>
    //     {/* for treasury assets  */}
    //     <ScaleFade in={revenueCardLoaded}>
    //       {cnvStatus === 'success' && cnvData && <TreasuryManagementCard assets={treaData} />}
    //     </ScaleFade>
    //     <LoadingState
    //       title="Loading assets"
    //       width={'900px'}
    //       isLoading={!revenueCardLoaded}
    //       my={6}
    //     />
    //     <DividendsCard />
    //   </Flex>
    // </Flex>
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
        <SpinIcon css={{ animation: `${spin} 3s linear infinite` }} />
      </Card>
    </ScaleFade>
  )
}

const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
})

Treasury.Meta = {
  title: 'Concave | Treasury',
  description: `Concave has treasury strategies to take advantage of yield opportunities. It is broken down into Investment Research, Delta Neutral, and Stable Farm strategies.`,
}

export default withPageTransition(Treasury)
