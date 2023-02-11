import { ChakraTooltip } from '@concave/ui'
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
  w,
  height = '350px',
  p = 4,
  overflow = 'hidden',
  children,
  failureCount,
  flex,
}: {
  data: unknown
  chartTitle: string
  isFetching?: boolean
  isLoading?: boolean
  isRefetching?: boolean
  failureCount?: number
  tooltipDescription?: string
  variant?: 'primary' | 'secondary'
  w?: string | number
  height?: string
  p?: number
  overflow?: 'hidden' | 'visible'
  flex?: number
  children?: JSX.Element | JSX.Element[]
}) => {
  const loadingMessage = failureCount ? `Retrying` : 'Loading data'
  const isMobile = useBreakpointValue({ base: true, xl: false })
  const [open, setOpen] = useState(false)
  return (
    <Box w={w} minW={30} flex={1} h={height} minH={40}>
      <Card fontWeight={'bold'} variant={variant} p={p} h={'full'} w={'full'} minH={300} flex={1}>
        <WrapItem
          as={Box}
          tabindex="0"
          onClick={() => setOpen((o) => !o)}
          onBlur={() => setOpen(false)}
        >
          <ChakraTooltip closeDelay={500} label={tooltipDescription} isOpen={open}>
            <Box display={'flex'} flexDir={'row'} width={'full'} justifyContent={'space-between'}>
              <Text borderBottom={isMobile && tooltipDescription ? '1px solid white' : ''}>
                {chartTitle}
              </Text>
              {(isFetching || isRefetching) && <Spinner mx={1} mt={1} size={'sm'} mr={'auto'} />}
              {tooltipDescription && !isMobile && (
                <QuestionIcon w={{ base: 6, sm: 5 }} h={{ base: 6, sm: 5 }} />
              )}
            </Box>
          </ChakraTooltip>
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
    </Box>
  )
}
