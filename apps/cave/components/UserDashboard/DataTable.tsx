import { Box, VStack } from '@concave/ui'

export function DataTable({
  children,
}: {
  children: JSX.Element | JSX.Element[]
  h?: string
  isExpanded?: boolean
  shadow?: string
}) {
  return (
    <Box
      h={'full'}
      w={'full'}
      shadow={'Down Big'}
      borderRadius={'xl'}
      overflowY={'auto'}
      overflowX="auto"
      pt={2}
      px={'0.5rem'}
      apply="scrollbar.big"
    >
      {children}
    </Box>
  )
}
