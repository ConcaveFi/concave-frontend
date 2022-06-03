import { Flex } from '@concave/ui'

interface ChooseButtonProps {
  title: string
  onClick: () => void
  backgroundType?: 'default' | 'blue'
}

export default function ChooseButton(props: ChooseButtonProps) {
  const { title, backgroundType } = props
  const background =
    backgroundType == 'blue' ? 'linear-gradient(90deg, #72639B 0%, #44B9DE 100%)' : ''
  return (
    <Flex
      onClick={() => props.onClick()}
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
      zIndex={1}
    >
      {title}
    </Flex>
  )
}
