import { BlurComponent } from './BlurComponent'

export const ComingSoom = ({ children = <></> }: { children: JSX.Element }) => {
  return <BlurComponent message="Coming Soon">{children}</BlurComponent>
}
