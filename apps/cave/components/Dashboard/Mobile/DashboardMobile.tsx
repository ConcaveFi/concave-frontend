import { Card, Flex } from '@concave/ui'
import { DividendsShareMobile } from './Components/DividendsShare'
import { NftPositionViewer } from './Components/UserCard/NftPositionViewer'
import UserDashBoardCardMobile from './Components/UserDashBoardCard'

export default function DashboardMobile() {
  return (
    <Flex direction={'column'}>
      <DividendsShareMobile />
      <UserDashBoardCardMobile />
    </Flex>
  )
}
