import { Box } from '@concave/ui'

export function DataTable({
  children,
  h = 'unset',
}: {
  children: JSX.Element | JSX.Element[]
  h?: string
}) {
  return (
    <Box
      h="400px"
      w={'100%'}
      overflowY={'visible'}
      overflowX="hidden"
      borderRadius="3xl"
      px={'0.5rem'}
      mx={4}
      shadow={'down'}
      apply="scrollbar.big"
    >
      {children}
    </Box>
  )
}
