import { Tooltip } from '@chakra-ui/react'
import { QuestionIcon } from '@concave/icons'
import { Box, Card, Flex, Spinner, Text, useBreakpointValue, WrapItem } from '@concave/ui'
import { Loading } from 'components/Loading'
import { useState } from 'react'

export const ChartCard = ({
  isLoading,
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
}: {
  data: unknown
  chartTitle: string
  isFetching?: boolean
  isLoading?: boolean
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
  const loadingMessage = failureCount ? `Retrying` : 'Loading data'
  const isMobile = useBreakpointValue({ base: true, xl: false })
  const [open, setOpen] = useState(false)

  return (
    <Card fontWeight={'bold'} variant={variant} w={width} p={p} h={height}>
      <WrapItem
        as={Box}
        tabindex="0"
        onClick={() => setOpen((o) => !o)}
        onBlur={() => setOpen(false)}
      >
        <Tooltip closeDelay={500} label={tooltipDescription} isOpen={open}>
          <Box display={'flex'} flexDir={'row'} width={'full'} justifyContent={'space-between'}>
            <Text borderBottom={isMobile && tooltipDescription ? '1px solid white' : ''}>
              {chartTitle}
            </Text>
            {(isFetching || isRefetching) && <Spinner mx={1} mt={1} size={'sm'} mr={'auto'} />}
            {tooltipDescription && !isMobile && (
              <QuestionIcon w={{ base: 6, sm: 5 }} h={{ base: 6, sm: 5 }} />
            )}
          </Box>
        </Tooltip>
      </WrapItem>
      <Flex
        direction={'column'}
        w={'100%'}
        h={'100%'}
        rounded={'2xl'}
        overflow={overflow}
        justifyContent={'center'}
        alignItems={overflow === 'visible' ? 'center' : 'unset'}
      >
        {!isLoading ? <>{children}</> : <Loading size={'md'} label={loadingMessage} isLoading />}
      </Flex>
    </Card>
  )
}
