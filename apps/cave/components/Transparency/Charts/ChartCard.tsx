import { QuestionIcon } from '@concave/icons'
import { Box, Card, Flex, Text, Tooltip } from '@concave/ui'
import { Loading } from 'components/Loading'

export const ChartCard = ({
  chartTitle,
  dataLoaded,
  tooltipDescription,
  variant = 'secondary',
  width = 'full',
  height = '350px',
  p = 4,
  overflow = 'hidden',
  children,
}: {
  chartTitle: string
  dataLoaded: boolean
  tooltipDescription?: string
  variant?: 'primary' | 'secondary'
  width?: string
  height?: string
  p?: number
  overflow?: 'hidden' | 'visible'
  children?: JSX.Element | JSX.Element[]
}) => {
  return (
    <Card fontWeight={'bold'} variant={variant} w={width} p={p} h={height}>
      <Box display={'flex'} flexDir={'row'} width={'full'} justifyContent={'space-between'}>
        <Text>{chartTitle}</Text>
        {tooltipDescription && (
          <Tooltip label={tooltipDescription} shouldWrapChildren>
            <QuestionIcon />
          </Tooltip>
        )}
      </Box>
      <Flex
        direction={'column'}
        w={'100%'}
        h={'100%'}
        rounded={'2xl'}
        overflow={overflow}
        justifyContent={'center'}
        alignItems={overflow === 'visible' ? 'center' : 'unset'}
      >
        {dataLoaded ? <>{children}</> : <Loading size={'md'} label={'Loading data'} isLoading />}
      </Flex>
    </Card>
  )
}
