import { Container } from '@concave/ui'
import React from 'react'
import { Head, MetaProps } from './MetaHead'
import Sidebar from './SideBar/SideBar'
import { TopBar } from './TopBar'

interface PageProps {
  children: React.ReactNode
  customMeta?: MetaProps
}

export const Page = ({ children, customMeta }: PageProps): JSX.Element => {
  return (
    <>
      <Head customMeta={customMeta} />
      {/* <TopBar /> */}
      {/* <Sidebar /> */}
      <main>
        <Container maxWidth="container.xl">{children}</Container>
      </main>
    </>
  )
}
