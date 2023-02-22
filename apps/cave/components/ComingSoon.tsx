import { Text } from '@concave/ui'
import { BlurComponent } from './BlurComponent'

const Message = () => (
  <Text fontSize={'lg'} noOfLines={1} fontWeight={'bold'}>
    Coming Soon
  </Text>
)
export const ComingSoom = ({ children = <></> }: { children: JSX.Element }) => {
  return <BlurComponent overlayElement={Message()}>{children}</BlurComponent>
}
