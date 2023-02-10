import { Box } from '@concave/ui'

export function DataTable({
  children,
  shadow,
}: {
  children: JSX.Element | JSX.Element[]
  h?: string
  isExpanded?: boolean
  shadow?: string
}) {
  return (
    <Box
      h="full"
      w={'100%'}
      overflowY={'auto'}
      overflowX="auto"
      borderRadius="3xl"
      px={'0.5rem'}
      mx={4}
      shadow={shadow || 'down'}
      apply="scrollbar.big"
      maxH={'full'}
    >
      {children}
    </Box>
  )
}
