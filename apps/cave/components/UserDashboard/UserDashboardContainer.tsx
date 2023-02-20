import { Card, Flex, Text } from '@concave/ui'
import { BlurComponent } from 'components/BlurComponent'
import { ComingSoom } from 'components/ComingSoon'
import { useRouter } from 'next/router'
import { useAccount } from 'wagmi'
import { SnapshotOptions } from './SnapshotOptions'
import { UserDashboardContent } from './UserDashboardContent'
import { UserDashboardNav } from './UserDashboardNav'
import { UserDashboardWallet } from './UserDashboardWallet'

export type UserDashboardContainerParams = { isLoading: boolean; data: { view: SnapshotOptions } }
export const UserDashboardContainer = (props: UserDashboardContainerParams) => {
  const router = useRouter()
  const { isConnected } = useAccount()
  const onChangeSnapshot = (view: SnapshotOptions) => {
    router.push(`/user-dashboard?view=${view}`, undefined, { shallow: true })
  }

  const selectedView = props.data?.view ?? SnapshotOptions.LiquidStaking

  return (
    <Flex w={'100%'} direction={'column'} alignItems={'center'}>
      <Card variant={'primary'} w={'full'} borderRadius={{ base: '30px', lg: '60px' }}>
        <BlurComponent
          disabled={isConnected}
          overlayElement={
            <Text fontSize={'lg'} noOfLines={1} fontWeight={'bold'}>
              You are not connected
            </Text>
          }
        >
          <>
            <UserDashboardWallet
              w={'full'}
              justifyContent={'space-around'}
              pt={5}
              pb={4}
              px={{ base: 2, md: 10 }}
              onSelectHistory={() => {
                onChangeSnapshot(SnapshotOptions.History)
              }}
            />
            <Card
              variant="primary"
              w={'100%'}
              p={{ base: 2, md: 6 }}
              gap={6}
              minH={{ base: '640px', lg: '' }}
              borderRadius={{ base: '30px', lg: '60px' }}
              alignItems={'center'}
            >
              <Flex
                w={'100%'}
                direction={{ base: 'column', lg: 'row' }}
                maxH={{ base: '', lg: '900px' }}
                flexGrow={1}
                gap={6}
              >
                {!props.isLoading && (
                  <>
                    <UserDashboardNav
                      currentSnapshot={selectedView}
                      changeSnapshot={onChangeSnapshot}
                    />
                    <UserDashboardContent view={selectedView} />
                  </>
                )}
              </Flex>
            </Card>
          </>
        </BlurComponent>
      </Card>
    </Flex>
  )
}
