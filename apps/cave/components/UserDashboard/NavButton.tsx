import { Flex, gradientBorder, Spinner, Text } from '@concave/ui'
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
  summaryArray?: { label: string; data: string }[]
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

  return (
    <button onClick={onClick}>
      <Flex
        minH={'100px'}
        height="full"
        rounded={'3xl'}
        w={'100%'}
        p={3}
        shadow={isSelected ? 'up' : 'down'}
        fontSize={'sm'}
        cursor={isDisabled ? 'default' : 'pointer'}
        sx={isSelected && { ...gradientBorder({ borderWidth: 2 }) }}
        alignItems={settings.alignItems}
        justifyContent={settings.justifyContent}
      >
        <Flex direction={'column'} align="start" lineHeight={'1.25rem'} ml={settings.flexMl}>
          <Text
            color={settings.textColor}
            fontSize={'lg'}
            fontWeight={'bold'}
            mt={settings.textMt}
            mb={settings.textMb}
          >
            {title} {isLoading && <Spinner mx={1} mt={1} size={'sm'} mr={'auto'} />}
          </Text>
          {isConnected && !isLoading ? (
            <>
              {summaryArray?.map((summaryObject, index) => (
                <Text key={index + title} fontSize={'sm'}>
                  {summaryObject.label}: {summaryObject.data}
                </Text>
              ))}
            </>
          ) : (
            <></>
          )}
        </Flex>
      </Flex>
    </button>
  )
}
