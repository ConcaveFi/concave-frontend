import React, { useEffect, useState } from 'react'
import { Card, Flex, Heading } from '@concave/ui'
import { useSession } from 'next-auth/react'

function User() {
  const { data: session, status } = useSession()
  const [content, setContent] = useState()
  const [roles, setRoles] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/jwt/msg')
      const json = await res.json()
      if (json.content) {
        setContent(json.content)
      }
    }
    fetchData()
  }, [session])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/jwt')
      const json = await res.json()
      if (json) {
        setRoles(json)
      }
    }
    fetchData()
  }, [session])

  return (
    <Flex maxW="container.md" direction="column" justifyContent="center" h="full" gap={6}>
      <Heading fontSize="2xl">user page</Heading>
      <Card variant="primary" p={4} w={'600px'} gap={4} shadow={'Up for Blocks'}>
        <div>
          {status !== 'unauthenticated' ? '🟢' : '🔴'} {content}
        </div>
        <div>{roles && <pre>{JSON.stringify(roles, null, 2)}</pre>}</div>
      </Card>
    </Flex>
  )
}

export default User
