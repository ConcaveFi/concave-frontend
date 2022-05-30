import { SettingsIcon } from '@concave/icons'
import { IconButton } from '@concave/ui'

export const SettingsIconButton = (props) => (
  <IconButton
    onClick={(e) => e.stopPropagation()}
    px={2}
    _focus={{ transform: 'scale(1.12)', filter: 'drop-shadow(-1px 1px 2px #ffffff20)' }}
    _hover={{ transform: 'scale(1.06)', filter: 'drop-shadow(-1px 1px 2px #ffffff20)' }}
    icon={<SettingsIcon viewBox="0 0 20 25" cursor={'pointer'} />}
    aria-label="settings"
  />
)
