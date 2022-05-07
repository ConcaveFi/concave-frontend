import { Box, Card, Flex, FlexProps } from '@concave/ui'
import { DividendsShareMobile } from './Components/DividendsShare'
import { NftPositionViewer } from './Components/UserCard/NftPositionViewer'
import UserDashBoardCardMobile from './Components/UserPositionCard'

const DashboardMobile: React.FC<FlexProps> = ({ ...props }) => {
  return (
    <Flex direction={'column'} align="center" {...props}>
      <DividendsShareMobile />
      <Box
        // width={'390px'}
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
        <Flex direction={'column'} gap={4} width="full" align={'center'}>
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
    // width: '10px',
    // boxShadow: `Up`,
    // borderRadius: '10px',
    // background: '#19394C',
  },
  '&::-webkit-scrollbar-track': {
    padding: '2px',
  },
  '&::-webkit-scrollbar-thumb': {
    borderRadius: '10px',
    background: ' #0A161F ',
    margin: '2px',
    // background: 'linear-gradient(239.18deg, #19394C 27.18%, #0A161F 96.11%)',
  },
}
