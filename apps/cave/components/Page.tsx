import { Container, HStack } from '@concave/ui'
import React from 'react'
import { Head, MetaProps } from './MetaHead'

import Sidebar from './Sidebar'
interface PageProps {
  children: React.ReactNode
  customMeta?: MetaProps
}

export const Page = ({ children, customMeta }: PageProps): JSX.Element => {
  return (
    <>
      <Head customMeta={customMeta} />

      <main>
        <HStack>
          <Sidebar />

          <Container maxWidth="container.xl">{children}</Container>
        </HStack>
      </main>
    </>
  )
}
