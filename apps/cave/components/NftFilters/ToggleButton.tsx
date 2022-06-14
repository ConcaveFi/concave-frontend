import { Flex, Text } from '@concave/ui'
const UpSmall = `0px 4px 4px rgba(0, 0, 0, 0.25), inset -1px 1px 2px rgba(128, 186, 255, 0.05)`

interface ToggleButtonProps {
  title: string
  active?: boolean
  width?: number
  height?: number
  flexGrow?: boolean
  onClick?: (props: ToggleButtonProps) => void
}

export function ToggleButton(props: ToggleButtonProps) {
  const { title, height, width, flexGrow } = props
  const active = !!props.active
  const textColor = active ? 'white' : '#5F7A99'
  const backgroundBorder = 'linear-gradient(43deg, #72639B 0%, #44B9DE 100%)'
  return (
    <Flex
      _hover={{
        transform: 'scale(1.1)',
      }}
      position="relative"
      transition={'all'}
      transitionDuration={'.3s'}
      direction="row"
      cursor={'pointer'}
      onClick={() => (props.onClick ? props.onClick(props) : '')}
      fontSize={14}
      fontWeight={700}
      alignItems="center"
      textColor={textColor}
      rounded="2xl"
      background={active ? backgroundBorder : ''}
    >
      <Flex
        background={{
          base: 'linear-gradient(239.18deg, #19394C 27.18%, #0A161F 120.11%)',
          md: 'linear-gradient(200.73deg, #274C63 20%, #182F3E 100%)',
        }}
        minWidth={50}
        m={'2px'}
        py={1}
        rounded="2xl"
        wrap={'nowrap'}
        shadow={UpSmall}
        width={width ? width : {}}
        px={4}
      >
        <Text width={'full'} textAlign={'center'}>
          {title}
        </Text>
      </Flex>
    </Flex>
  )
}
