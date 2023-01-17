import { Box } from '@concave/ui'

export function DataTable({
  children,
  h = 'unset',
  isExpanded,
}: {
  children: JSX.Element | JSX.Element[]
  h?: string
  isExpanded?: boolean
}) {
  return (
    <Box
      h="full"
      w={'100%'}
      overflowY={'auto'}
      overflowX="hidden"
      borderRadius="3xl"
      px={'0.5rem'}
      mx={4}
      shadow={'down'}
      apply="scrollbar.big"
      maxH={{ base: '', lg: isExpanded ? '664px' : '280x' }}
    >
      {children}
    </Box>
  )
}
