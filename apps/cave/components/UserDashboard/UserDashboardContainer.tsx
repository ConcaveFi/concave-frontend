import { Card, Flex } from '@concave/ui'
import { useRouter } from 'next/router'
import { SnapshotOptions } from './SnapshotOptions'
import { UserDashboardContent } from './UserDashboardContent'
import { UserDashboardNav } from './UserDashboardNav'
import { UserDashboardWallet } from './UserDashboardWallet'

export type UserDashboardContainerParams = { isLoading: boolean; data: { view: SnapshotOptions } }
export const UserDashboardContainer = (props: UserDashboardContainerParams) => {
  const router = useRouter()

  const onChangeSnapshot = (view: SnapshotOptions) => {
    router.push(`/user-dashboard?view=${view}`, undefined, { shallow: true })
  }

  const selectedView = props.data?.view ?? SnapshotOptions.LiquidStaking

  return (
    <Flex w={'100%'} direction={'column'} alignItems={'center'}>
      <Card
        variant={'primary'}
        w={'100%'}
        p={6}
        gap={6}
        minH={{ base: '640px', lg: '' }}
        borderRadius={{ base: '30px', lg: '60px' }}
        alignItems={'center'}
      >
        <UserDashboardWallet
          onSelectHistory={() => {
            onChangeSnapshot(SnapshotOptions.History)
          }}
        />
        <Flex
          w={'100%'}
          direction={{ base: 'column', lg: 'row' }}
          maxH={{ base: '', lg: '900px' }}
          flexGrow={1}
          gap={6}
        >
          {!props.isLoading && (
            <>
              <UserDashboardNav currentSnapshot={selectedView} changeSnapshot={onChangeSnapshot} />
              <UserDashboardContent view={selectedView} />
            </>
          )}
        </Flex>
      </Card>
    </Flex>
  )
}
