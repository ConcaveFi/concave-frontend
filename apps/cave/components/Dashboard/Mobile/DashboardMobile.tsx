import { Card, Flex, FlexProps } from '@concave/ui'
import { DividendsShareMobile } from './Components/DividendsShare'
import { NftPositionViewer } from './Components/UserCard/NftPositionViewer'
import UserDashBoardCardMobile from './Components/UserDashBoardCard'

const DashboardMobile: React.FC<FlexProps> = ({ ...props }) => {
  return (
    <Flex direction={'column'} {...props}>
      <DividendsShareMobile />
      <Flex>
        <UserDashBoardCardMobile />
      </Flex>
    </Flex>
  )
}

export default DashboardMobile
