import { Card, Flex, Heading, Box } from '@concave/ui'
import React from 'react'
import { useSession } from 'next-auth/react'

export default function PositionsView() {
  const { data: session, status } = useSession()
  const isBrowser = () => typeof window !== 'undefined'

  return (
    <Flex maxW="container.md" direction="column" justifyContent="center" h="full" gap={6}>
      <Heading fontSize="2xl">Your Admin session infos</Heading>
      <Card variant="primary" p={4} w={'600px'} gap={4} shadow={'Up for Blocks'}>
        {status !== 'loading' && isBrowser && (
          <Box fontSize={'0.8rem'} style={{ overflow: 'hidden' }}>
            <pre>{JSON.stringify(session, null, 2)}</pre>
          </Box>
        )}
      </Card>
    </Flex>
  )
}
