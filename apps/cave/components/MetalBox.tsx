import { Box, Flex, FlexProps } from '@concave/ui'

interface MetalBoxProps extends FlexProps {
  bgVariant?: 'dark' | 'light' | 'empty'
  disableCustomBorder?: boolean
  disableMetal?: boolean
}

export const MetalBox: React.FC<MetalBoxProps> = ({ ...props }) => {
  const bgVariant = props.bgVariant || 'light'

  return (
    <Flex
      bg={props.bg || bgColor[bgVariant]}
      rounded={props.rounded || '2xl'}
      width={props.width}
      height={props.height}
      shadow={props.shadow || 'up'}
    >
      <Box
        display={props.disableMetal && 'none'}
        rounded={'inherit'}
        position={'absolute'}
        bgImage="assets/textures/metal.png"
        height={'inherit'}
        width="inherit"
        bgSize={'10% 35%'}
      />
      <Flex position={'absolute'} rounded="inherit" align={'center'} justify="center" {...props}>
        {props.children}
      </Flex>
    </Flex>
  )
}
const bgColor = {
  dark: 'linear-gradient(223.18deg, #19394C 27.18%, #0A161F 96.11%)',
  light: 'linear-gradient(265.73deg, #274C63 0%, #182F3E 100%)',
  empty: '',
}
