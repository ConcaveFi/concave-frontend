import { QuestionIcon } from '@concave/icons'
import { Box, Card, Flex, Spinner, Text, Tooltip } from '@concave/ui'
import { Loading } from 'components/Loading'

export const ChartCard = ({
  isFetching,
  isRefetching,
  chartTitle,
  tooltipDescription,
  variant = 'secondary',
  width = 'full',
  height = '350px',
  p = 4,
  overflow = 'hidden',
  children,
  failureCount,
  data,
}: {
  data: unknown
  chartTitle: string
  isFetching?: boolean
  isRefetching?: boolean
  failureCount?: number
  tooltipDescription?: string
  variant?: 'primary' | 'secondary'
  width?: string
  height?: string
  p?: number
  overflow?: 'hidden' | 'visible'
  children?: JSX.Element | JSX.Element[]
}) => {
  const loadingMessage = failureCount ? `Retrying ... ( ${failureCount} )` : 'Loading data'

  return (
    <Card fontWeight={'bold'} variant={variant} w={width} p={p} h={height}>
      <Box display={'flex'} flexDir={'row'} width={'full'} justifyContent={'space-between'}>
        <Text mr={2}>{chartTitle}</Text>
        {(isFetching || isRefetching) && <Spinner size={'sm'} mr={'auto'} />}
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
        {data != undefined ? (
          <>{children}</>
        ) : (
          <Loading size={'md'} label={loadingMessage} isLoading />
        )}
      </Flex>
    </Card>
  )
}
