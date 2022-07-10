import { Flex, useBreakpointValue } from '@chakra-ui/react'
import { Card } from '@concave/ui'

type BondGraphicCardProps = { title: string; src: string }
export const BondGraphicCard = ({ title, src }: BondGraphicCardProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false })
  const isLarger = useBreakpointValue({ md: false, xl: true })
  return (
    <Card
      fontWeight={'bold'}
      variant="secondary"
      w={{ base: '340px', md: '510px', xl: '440px' }}
      mx="auto"
      h="300px"
    >
      {/* <Text color={'text.low'} fontSize="xl" mt={8} ml={6}>
        AccrualBondsV1
      </Text>
      <Text fontSize={'2xl'} ml={6}>
        {title}
      </Text> */}
      <Flex mx={'auto'} my="auto" rounded={'2xl'} overflow="hidden">
        <iframe
          src={src}
          height="260"
          width={isMobile ? '320' : !isLarger ? '470' : '400'}
          title="chart 1"
        />
      </Flex>
    </Card>
  )
}
