import { Box, Card, Flex } from '@concave/ui'
import { useEffect, useState } from 'react'
import UserPositionCard from './UserPositionCard'
import UserDividendCard from './UserDividendCard'
import { ButtonLink } from 'components/ButtonLink'
import UserListPositionCard from './UserListPositionCard'
import { getUserPositions } from 'contracts/DashBoard/DashBoardState'
import { useAccount } from 'wagmi'

const UserDashboardCard = (props: any) => {
  const [{ data: account }] = useAccount()
  const [userContracts, setUserContracts] = useState(null)

  useEffect(() => {
    setTimeout(() => {
      if (account?.address && userContracts === null)
        getUserPositions(account.address).then(setUserContracts)
    }, 2500)
  }, [account])

  const userPosComps =
    userContracts !== null
      ? userContracts.map((contract, index) => <UserPositionCard key={index} contract={contract} />)
      : ''

  if (userContracts) console.log(userContracts)

  return (
    <Card p={3} gap={2} variant="primary" h="945px" shadow="down" w="780px">
      <Flex justify="center">
        <Box
          pos="relative"
          h="fit-content"
          px={4}
          pb="4"
          pt="1"
          overflowY={'auto'}
          maxHeight={'500px'}
        >
          <ButtonLink href="/treasury" variant="primary.outline" size="large" w="full">
            View Treasury
          </ButtonLink>
          <Flex direction="row" gap={4} position="relative" mt={4}>
            {/* here iam */}

            <UserDividendCard />
            {/* {filters.map((e, k) => {
              return <SearchFilterCard key={k} title={e.title} icon={e.icon} />
            })} */}
          </Flex>
        </Box>
      </Flex>
      <Box
        pos="relative"
        h="100%"
        overflowY={'auto'}
        maxHeight={'100%'}
        width="fit-content"
        borderRadius="12px"
        px={'0.5rem'}
        py={'0.5rem'}
        css={{
          background: 'rgba(113, 113, 113, 0.01)',
        }}
        shadow="down"
        __css={{
          '&::-webkit-scrollbar': {
            width: '20px',
            boxShadow: `-1px 1px 3px rgba(126, 162, 255, 0.26), inset 0px -5px 5px rgba(255, 255, 255, 0.02), inset -9px 12px 24px rgba(13, 17, 23, 0.49)`,
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'linear-gradient(239.18deg, #19394C 27.18%, #0A161F 96.11%)',
            boxShadow:
              '0px 5px 14px rgba(0, 0, 0, 0.47), 4px -7px 15px rgba(174, 177, 255, 0.13), inset -1px 1px 2px rgba(128, 186, 255, 0.24)',
            rounded: 'lg',
          },
        }}
      >
        {userPosComps}
      </Box>
    </Card>
  )
}

export default UserDashboardCard
