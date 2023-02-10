import { Box, Flex, Text } from '@concave/ui'

export const BlurComponent = ({
  children = <></>,
  message,
}: {
  children: JSX.Element
  message: string
}) => {
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
        width={'100%'}
        height={`100%`}
        position={'absolute'}
        backdropFilter="blur(8px)"
        backdropBlur={'16px'}
        top={0}
        right={0}
      />
      <Text position={'absolute'} fontSize={'lg'} fontWeight={'bold'}>
        {message}
      </Text>
    </Flex>
  )
}
