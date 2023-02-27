import { FullScreenExitIcon, FullScreenIcon } from '@concave/icons'
import { Button, ButtonProps } from '@concave/ui'
import { Dispatch, SetStateAction } from 'react'
import { useResponsiveButton } from './ResponsiveMenuButton'

export const ToggleContentButton = ({
  isExpanded,
  handle,
  ...buttonProps
}: {
  isExpanded: boolean
  handle: Dispatch<SetStateAction<boolean>>
} & ButtonProps) => {
  const responsiveProps = useResponsiveButton({
    leftIcon: isExpanded ? <FullScreenExitIcon /> : <FullScreenIcon />,
  })

  return (
    <Button
      size={'md'}
      shadow={'Up Big'}
      onClick={() => handle((prev) => !prev)}
      {...buttonProps}
      {...responsiveProps}
    >
      {isExpanded ? 'Collapse' : 'Expand'}
    </Button>
  )
}
