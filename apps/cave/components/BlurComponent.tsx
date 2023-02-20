import { Box, BoxProps, Flex, Text } from '@concave/ui'

export const BlurComponent = ({
  children = <></>,
  disabled,
  overlayElement = <></>,
  ...boxProps
}: {
  disabled?: boolean
  children: JSX.Element
  overlayElement?: JSX.Element
} & BoxProps) => {
  if (disabled) {
    return children
  }
  return (
    <Flex
      position="relative"
      width="full"
      height="full"
      justifyContent="center"
      alignItems="center"
    >
      {children}
      <Box
        borderRadius={'60px'}
        zIndex={2}
        width={'99%'}
        height={`99%`}
        position={'absolute'}
        backdropFilter="blur(16px)"
        backdropBlur={'16px'}
        m={1}
        {...boxProps}
      />
      <Box zIndex={2} position={'absolute'}>
        {overlayElement}
      </Box>
    </Flex>
  )
}
