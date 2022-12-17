import { Button, Card, Flex, gradientBorder, Spinner, Text } from '@concave/ui'
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
  summaryArray?: { label: string; data: string | number }[]
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
    <Button
      onClick={onClick}
      transition="all .3s ease"
      opacity={!isSelected && 0.6}
      _hover={{
        transform: 'scale(1.05)',
        shadow: 'Glow Inner',
        opacity: 1,
      }}
    >
      <Card
        h={'85px'}
        w={'165px'}
        bgSize="150%"
        rounded={'xl'}
        shadow={isSelected ? 'Block Up' : '0px 0px 10px #0008'}
        variant={'secondary'}
        sx={isSelected && { ...gradientBorder({ borderWidth: 2 }) }}
        borderGradient={isSelected ? 'primary' : ''}
        cursor={isDisabled ? 'default' : 'pointer'}
        alignItems={settings.alignItems}
        justifyContent={'center'}
        fontSize={'sm'}
      >
        <Flex direction={'column'} align="center" w="full" lineHeight={'1rem'}>
          <Text color={settings.textColor} fontSize={'md'} fontWeight={'bold'} mt={settings.textMt}>
            {title} {isLoading && <Spinner mx={1} size={'sm'} mr={'auto'} />}
          </Text>
          {isConnected && !isLoading ? (
            <>
              {summaryArray?.map((summaryObject, index) => (
                <Text
                  display={'flex'}
                  gap={1}
                  fontWeight={'semibold'}
                  key={index + title}
                  fontSize={'xs'}
                  color="text.low"
                >
                  {summaryObject.label}:{' '}
                  <Text color="white" fontSize={'xs'}>
                    {' '}
                    {summaryObject.data}
                  </Text>
                </Text>
              ))}
            </>
          ) : (
            <></>
          )}
        </Flex>
      </Card>
    </Button>
  )
}
