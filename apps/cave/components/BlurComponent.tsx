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
      p={2}
    >
      {children}
      <Box
        width={'full'}
        height={'full'}
        position={'absolute'}
        backdropFilter="blur(8px)"
        backdropBlur={'8px'}
        m={1}
        {...boxProps}
      />
      <Box zIndex={2} position={'absolute'}>
        {overlayElement}
      </Box>
    </Flex>
  )
}
