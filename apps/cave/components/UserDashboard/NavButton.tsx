import { Button, Flex, gradientBorder, HStack, Spinner, Text, VStack } from '@concave/ui'
import { useAccount } from 'wagmi'

export const NavButton = ({
  title,
  isLoading,
  isSelected,
  onClick,
  summaryArray,
  isDisabled,
}: {
  title: string
  isLoading?: boolean
  isSelected?: boolean
  onClick?: VoidFunction
  summaryArray?: { label: string }[]
  isDisabled?: boolean
}) => {
  const { isConnected } = useAccount()

  let settings = {
    alignItems: 'unset',
    justifyContent: 'unset',
    flexMl: 2,
    textMt: 2,
    textMb: 1,
    textColor: 'white',
  }

  if (isDisabled) {
    settings = {
      alignItems: 'center',
      justifyContent: 'center',
      flexMl: 0,
      textMt: 0,
      textMb: 0,
      textColor: 'text.low',
    }
  }

  if (isLoading) {
    return <></> //Loading stuff
  }
  return (
    <Button mx={0.5} onClick={onClick}>
      <Flex
        minH={'100px'}
        height="full"
        rounded={'3xl'}
        w={'100%'}
        px={4}
        shadow={isSelected ? 'up' : 'down'}
        fontSize={'sm'}
        cursor={isDisabled ? 'default' : 'pointer'}
        sx={isSelected && { ...gradientBorder({ borderWidth: 2 }) }}
        alignItems={settings.alignItems}
        justifyContent={settings.justifyContent}
      >
        <Flex
          direction={'column'}
          w={'full'}
          justifyContent={'space-around'}
          align="center"
          lineHeight={'1.25rem'}
        >
          <VStack>
            <Text
              color={settings.textColor}
              fontSize={'lg'}
              fontWeight={'bold'}
              mt={settings.textMt}
              mb={settings.textMb}
            >
              {title} {isLoading && <Spinner mx={1} mt={1} size={'sm'} mr={'auto'} />}
            </Text>
            <Flex direction={'column'}>
              {summaryArray?.map((summaryObject, index) => (
                <Text
                  color={'text.accent'}
                  fontWeight="medium"
                  opacity={0.6}
                  p={0}
                  m={0}
                  key={index + title}
                  fontSize={'sm'}
                >
                  {summaryObject.label}
                </Text>
              ))}
            </Flex>
          </VStack>
        </Flex>
      </Flex>
    </Button>
  )
}
