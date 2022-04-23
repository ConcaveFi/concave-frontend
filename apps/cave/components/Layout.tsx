import { Flex, Container } from '@concave/ui'
import React from 'react'
import { SideBar } from './SideBar/SideBar'

export const DefaultLayout = ({ children }) => {
  return (
    <Flex as="main" direction={{ base: 'column', md: 'row' }}>
      <SideBar />
      <Container display="flex" h={{ base: '150vh', md: '100vh' }} maxWidth="container.xl">
        {children}
      </Container>
    </Flex>
  )
}
