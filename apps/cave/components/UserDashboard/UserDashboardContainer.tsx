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
    <Flex w={'100%'} direction={'column'} gap={5} alignItems={'center'}>
      <Card
        variant={'secondary'}
        alignItems={'center'}
        borderRadius={'35px'}
        justify={'end'}
        // minH={'940px'}
        h="fit-content"
        w={'100%'}
      >
        <UserDashboardWallet />

        <Card w="full" h="100%" rounded={'inherit'} variant="primary">
          <Flex w="full" wrap={'wrap'} p={8} gap={8}>
            <UserDashboardNav currentSnapshot={currentSnapshot} changeSnapshot={changeSnapshot} />
            {/* <Flex flex={1}>Teste</Flex>
            <Flex width={'100%'}>Teste2</Flex> */}
            <UserDashboardContent />
          </Flex>
          {/* <Flex w={'100%'} px={8} id="dashboard-content" flexGrow={1} flexDirection={'row'} gap={6}>
          </Flex> */}
        </Card>
      </Card>
    </Flex>
  )
}
