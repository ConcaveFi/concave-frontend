import { Button, ButtonProps } from '@concave/ui'

interface ChooseButtonProps {
  title: string
  onClick: () => void
  disabled?: boolean
  backgroundType?: 'default' | 'blue'
}

export function ChooseButton({
  title,
  backgroundType,
  onClick,
  ...props
}: ChooseButtonProps & ButtonProps) {
  const background =
    backgroundType == 'blue' ? 'linear-gradient(90deg, #72639B 0%, #44B9DE 100%)' : ''
  return (
    <Button
      disabled={props.disabled}
      onClick={() => onClick()}
      background={background}
      fontWeight={'bold'}
      shadow={'up'}
      size={'sm'}
      width="120px"
      borderBottomRadius={0}
      {...props}
    >
      {title}
    </Button>
  )
}
