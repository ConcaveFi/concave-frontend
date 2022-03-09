import { Container } from '@concave/ui'
import React from 'react'
import { Head, MetaProps } from './MetaHead'
import SideBar from './SideBar/SideBar'
import { TopBar } from './TopBar'

interface PageProps {
  children: React.ReactNode
  customMeta?: MetaProps
}

export const Page = ({ children, customMeta }: PageProps): JSX.Element => {
  return (
    <>
      <Head customMeta={customMeta} />
      <main>
        <SideBar>
          <Container maxWidth="container.xl">{children}</Container>
        </SideBar>
      </main>
    </>
  )
}
