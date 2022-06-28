import { Flex, Text } from '@chakra-ui/react'
import { Card } from '@concave/ui'

type BondGraphicCardProps = { title: string; src: string }
export const BondGraphicCard = ({ title, src }: BondGraphicCardProps) => {
  return (
    <Card fontWeight={'bold'} variant="secondary" w="440px" h="300px">
      <Text color={'text.low'} fontSize="xl" mt={8} ml={6}>
        Accrual bonds V1
      </Text>
      <Text fontSize={'2xl'} ml={6}>
        {title}
      </Text>
      <Flex mx={'auto'} my="auto" rounded={'2xl'} overflow="hidden">
        <iframe src={src} height="160" width="380" title="chart 1" />
      </Flex>
    </Card>
  )
}
