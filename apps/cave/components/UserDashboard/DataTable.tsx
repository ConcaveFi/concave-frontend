import { Box } from '@concave/ui'

export function DataTable({ children }) {
  return (
    <>
      <Box
        w={'100%'}
        maxH={{ lg: '675px', md: '740px', base: '800px' }}
        overflowY={'scroll'}
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
    </>
  )
}
