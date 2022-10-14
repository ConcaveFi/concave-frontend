import { Card, Flex } from '@concave/ui'

export const DuneChartCard = ({ src }: { src: string }) => {
  return (
    <Card fontWeight={'bold'} variant="secondary" w={'full'} p={4} h="350px">
      <Flex src={src} w={'100%'} h={'full'} as={'iframe'} rounded={'2xl'} overflow="hidden" />
    </Card>
  )
}
