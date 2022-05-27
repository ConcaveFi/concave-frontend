import { Flex, Text } from '@concave/ui'

const DividendsShare = ({ ...props }) => {
  return (
    <Flex mt={6} ml={{ lg: 6, md: 3 }} direction="column" {...props}>
      <Flex
        direction={'column'}
        maxH={'90px'}
        flex={1}
        textAlign="start"
        justify={'center'}
        textColor="gray.00"
      >
        <Text fontWeight={'700'}></Text>
        <Text fontWeight={'700'}></Text>
      </Flex>
      <Flex direction={'column'} flex={1} gap={{ lg: 4, md: 8 }} mt={{ md: 4 }}>
        <Flex direction={'column'} textAlign="start" justify={'center'}>
          <Text fontSize={'13px'} textColor="text.low">
          
          </Text>
          <Text fontSize={'16px'} textColor="text.accent" fontWeight={700}>
          
          </Text>
        </Flex>
        <Flex direction={'column'} textAlign="start" justify={'center'}>
          <Text fontSize={'13px'} textColor="text.low">
          
          </Text>
          <Text opacity={0.8} fontSize={'16px'} textColor="text.accent" fontWeight={700}>
          
          </Text>
        </Flex>
        <Flex direction={'column'} textAlign="start" justify={'center'}>
          <Text fontSize={'13px'} textColor="text.low">
           
          </Text>
          <Text opacity={0.6} fontSize={'16px'} textColor="text.accent" fontWeight={700}>
            
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default DividendsShare
