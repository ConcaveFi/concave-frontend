import { Icon, IconProps } from '@chakra-ui/icons'
import { MdPerson, MdFullscreen, MdFullscreenExit, MdSell } from 'react-icons/md'
import { MdFilterList } from 'react-icons/md'
import { MdOutlineDashboard } from 'react-icons/md'
import { MdSort } from 'react-icons/md'

export const SortIcon = (props: IconProps) => <Icon as={MdSort} {...props} />
export const FilterIcon = (props: IconProps) => <Icon as={MdFilterList} {...props} />
export const DashboardIcon = (props: IconProps) => <Icon as={MdPerson} {...props} />
export const FullScreenIcon = (props: IconProps) => <Icon as={MdFullscreen} {...props} />
export const FullScreenExitIcon = (props: IconProps) => <Icon as={MdFullscreenExit} {...props} />
export const SellIcon = (props: IconProps) => <Icon as={MdSell} {...props} />
export const TransparencyIcon = (props: IconProps) => <Icon as={MdOutlineDashboard} {...props} />
