import { Container } from '@chakra-ui/react'
import React from 'react'
import { Head, MetaProps } from './MetaHead'
import { TopBar } from './TopBar'

interface PageProps {
  children: React.ReactNode
  customMeta?: MetaProps
}

export const Page = ({ children, customMeta }: PageProps): JSX.Element => {
  return (
    <>
      <Head customMeta={customMeta} />
      <TopBar />
      <main>
        <Container maxWidth="container.xl">{children}</Container>
      </main>
    </>
  )
}
