import { Container, Flex, HStack } from '@chakra-ui/react'
import React from 'react'
import { Head, MetaProps } from './MetaHead'
import { TopBar } from './TopBar'
import Sidebar from './sidebar'
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
