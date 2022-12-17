import { AirdropClaimContract } from '@concave/core'
import { Card, Flex } from '@concave/ui'
import { getAirdropClaimableAmount } from 'components/Airdrop/airdrop'
import { useStakePositions } from 'components/StakingPositions/DashboardBody/DashBoardState'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { concaveProvider } from 'lib/providers'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useAccount } from 'wagmi'
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
  const networkId = useCurrentSupportedNetworkId()
  const { address } = useAccount()
  const stakePosition = useStakePositions()
  const { userNonFungibleTokensInfo, totalLocked } = stakePosition
  const { data: claimed } = useQuery(['AirdropClaimContract', networkId], async () => {
    const airdrop = new AirdropClaimContract(concaveProvider(networkId))
    return await airdrop.claimed(address)
  })
  const airdropAmount = getAirdropClaimableAmount(address)
  const airdropTotal = 510691.11 //TODO
  const airdropShare = (airdropAmount / airdropTotal).toLocaleString(undefined, {
    maximumFractionDigits: 4,
  })
  return (
    <Flex w={'100%'} direction={'column'} gap={5} alignItems={'center'}>
      <Card
        variant={'secondary'}
        alignItems={'center'}
        borderRadius={'35px'}
        justify={'end'}
        h={'940px'}
        w={'100%'}
      >
        <UserDashboardWallet />

        <Card w="full" h="93%" rounded={'inherit'} variant="primary">
          <Flex w="full" h="51%" p={8} gap={8}>
            <UserDashboardNav currentSnapshot={currentSnapshot} changeSnapshot={changeSnapshot} />
          </Flex>
          <Flex w={'100%'} px={8} flexGrow={1} flexDirection={'row'} gap={6}>
            <UserDashboardContent />
          </Flex>
        </Card>
      </Card>
    </Flex>
  )
}
