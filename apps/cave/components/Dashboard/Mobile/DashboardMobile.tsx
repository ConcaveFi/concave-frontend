import { Card, Flex } from '@concave/ui'
import { DividendsShareMobile } from './Components/DividendsShare'
import { NftPositionViewer } from './Components/UserDashBoardCard/NftPositionViewer'

export default function DashboardMobile() {
  return (
    <Flex direction={'column'}>
      <DividendsShareMobile />
      <NftPositionViewer />
    </Flex>
  )
}
