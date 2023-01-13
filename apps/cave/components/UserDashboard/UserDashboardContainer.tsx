import { Card, Flex } from '@concave/ui'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { SnapshotOptions } from './SnapshotOptions'
import { UserDashboardContent } from './UserDashboardContent'
import { UserDashboardNav } from './UserDashboardNav'
import { UserDashboardWallet } from './UserDashboardWallet'

export const UserDashboardContainer = () => {
  const router = useRouter()
  const [currentSnapshot, setSnapshot] = useState<SnapshotOptions>(SnapshotOptions.Global)
  const [isLoading, setIsLoading] = useState(true)

  const changeSnapshot = (snapshotSelected: SnapshotOptions) => {
    if (snapshotSelected === currentSnapshot) {
      setSnapshot(SnapshotOptions.Global)
    } else {
      setSnapshot(snapshotSelected)
    }
  }

  useEffect(() => {
    router.push(`/user-dashboard?view=${currentSnapshot}`, undefined, { shallow: true })
  }, [currentSnapshot])

  return (
    <Flex w={'100%'} direction={'column'} alignItems={'center'}>
      <Card
        variant={'primary'}
        w={'100%'}
        p={6}
        gap={6}
        h={'940px'}
        borderRadius={'60px'}
        alignItems={'center'}
      >
        <UserDashboardWallet />
        <Flex w={'100%'} maxH={'900px'} flexGrow={1} flexDirection={'row'} gap={6}>
          <UserDashboardNav currentSnapshot={currentSnapshot} changeSnapshot={changeSnapshot} />
          <UserDashboardContent />
        </Flex>
      </Card>
    </Flex>
  )
}
