import { Button, ButtonProps } from '@concave/ui'

interface ChooseButtonProps {
  title: string
  onClick: () => void
  disabled?: boolean
}

export function ChooseButton({ title, onClick, ...props }: ChooseButtonProps & ButtonProps) {
  return (
    <Button
      disabled={props.disabled}
      variant={'primary'}
      onClick={() => onClick()}
      fontWeight={'bold'}
      shadow={'up'}
      size={'sm'}
      minW="120px"
      borderBottomRadius={0}
      {...props}
    >
      {title}
    </Button>
  )
}
