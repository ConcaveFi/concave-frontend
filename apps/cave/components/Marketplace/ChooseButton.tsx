import { Flex, FlexProps } from '@concave/ui'

interface ChooseButtonProps {
  title: string
  onClick: () => void
  backgroundType?: 'default' | 'blue'
}

export function ChooseButton({
  title,
  backgroundType,
  onClick,
  ...props
}: ChooseButtonProps & FlexProps) {
  const background =
    backgroundType == 'blue' ? 'linear-gradient(90deg, #72639B 0%, #44B9DE 100%)' : ''
  return (
    <Flex
      onClick={() => onClick()}
      background={background}
      fontWeight={700}
      fontSize={14}
      justifyContent={'center'}
      alignItems="center"
      shadow={'up'}
      height="30px"
      width="120px"
      cursor={'pointer'}
      borderTopRightRadius="16px"
      borderTopLeftRadius="16px"
      {...props}
    >
      {title}
    </Flex>
  )
}
