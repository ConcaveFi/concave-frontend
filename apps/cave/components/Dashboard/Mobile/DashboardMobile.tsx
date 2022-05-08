import { Box, Card, Flex, FlexProps } from '@concave/ui'
import DividendsShareMobile from './Components/DividendsShare'
import { NftPositionViewer } from './Components/UserCard/NftPositionViewer'
import UserDashBoardCardMobile from './Components/UserPositionCard'

interface DashboardMobileProps extends FlexProps {
  userContracts: any
  totalLocked: any
  statusData: {
    isLoading: boolean
    notConnected: boolean
    success: boolean
  }
}

const DashboardMobile: React.FC<DashboardMobileProps> = ({ ...props }) => {
  const { userContracts, totalLocked, statusData } = props
  const { isLoading, notConnected, success } = statusData

  return (
    <Flex direction={'column'} align="center" {...props}>
      <DividendsShareMobile statusData={statusData} totalLocked={totalLocked} />
      <Box
        maxHeight={'660px'}
        overflowY="auto"
        overflowX={'hidden'}
        position="relative"
        css={scrollBar}
        mt={3}
        borderBottom="4px solid skyblue"
        borderTop="4px solid skyblue"
        rounded={'3xl'}
        gap={4}
      >
        <Flex rounded={'3xl'} direction={'column'} gap={4} width="full" align={'center'}>
          <UserDashBoardCardMobile />
          <UserDashBoardCardMobile />
        </Flex>
      </Box>
    </Flex>
  )
}

export default DashboardMobile

const scrollBar = {
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  '&::-webkit-scrollbar-track': {
    padding: '2px',
  },
  '&::-webkit-scrollbar-thumb': {
    borderRadius: '10px',
    background: ' #0A161F ',
    margin: '2px',
  },
}
