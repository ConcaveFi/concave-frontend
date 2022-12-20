import { Box } from '@concave/ui'

export function DataTable({ children }) {
  return (
    <Box w={'100%'} h="fit-content" borderRadius="3xl" mx={4} apply="scrollbar.big" mb={3}>
      {children}
    </Box>
  )
}
