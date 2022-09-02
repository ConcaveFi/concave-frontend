import { isMobile } from 'utils/isMobile'
import { DesktopConnect } from './ConnectWalletDesktop'
import { MobileConnect } from './ConnectWalletMobile'

export const ConnectWalletModal = isMobile() ? MobileConnect : DesktopConnect
