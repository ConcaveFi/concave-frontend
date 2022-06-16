import { Button } from '@concave/ui'

interface ChooseButtonProps {
  title: string
  onClick: () => void
  disabled?: boolean
  backgroundType?: 'default' | 'blue'
}

export function ChooseButton(props: ChooseButtonProps) {
  const { title, backgroundType } = props
  const background =
    backgroundType == 'blue' ? 'linear-gradient(90deg, #72639B 0%, #44B9DE 100%)' : ''
  return (
    <Button
      disabled={props.disabled}
      onClick={() => props.onClick()}
      background={background}
      fontWeight={'bold'}
      shadow={'up'}
      size={'sm'}
      width="120px"
      borderBottomRadius={0}
    >
      {title}
    </Button>
  )
}
