import { Box, Card, Collapse, Flex, FlexProps } from '@concave/ui'
import DividendsShareMobile from './Components/DividendsShare'
import { NftPositionViewer } from './Components/UserCard/NftPositionViewer'
import UserPositionCardMobile from './Components/UserPositionCard'

interface DashboardMobileProps extends FlexProps {
  usercontract: any
  totallocked: any
  statusdata: {
    isLoading: boolean
    notConnected: boolean
    success: boolean
  }
}

const DashboardMobile: React.FC<DashboardMobileProps> = ({ ...props }) => {
  const { usercontract, totallocked, statusdata } = props
  const { isLoading, notConnected, success } = statusdata

  const userPosComps =
    usercontract &&
    usercontract.map((contract, index) => (
      <UserPositionCardMobile key={index} contract={contract} />
    ))

  return (
    <Flex direction={'column'} align="center" {...props}>
      <DividendsShareMobile statusData={statusdata} totalLocked={totallocked} />
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
        <Collapse in={success}>
          <Flex rounded={'3xl'} direction={'column'} gap={4} width="full" align={'center'}>
            {userPosComps}
          </Flex>
        </Collapse>
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
