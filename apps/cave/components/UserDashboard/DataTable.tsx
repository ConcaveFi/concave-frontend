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
      w={'100%'}
      h={h}
      maxH={{ lg: '675px', md: '740px', base: '800px' }}
      overflowY={'auto'}
      overflowX="hidden"
      borderRadius="3xl"
      px={'0.5rem'}
      mx={4}
      shadow={'down'}
      apply="scrollbar.big"
      mb={3}
    >
      {children}
    </Box>
  )
}
