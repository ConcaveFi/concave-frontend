import React from 'react'
import { Box, Container } from '@concave/ui'
import { MetaHead } from './MetaHead'
import { SideBar } from './SideBar/SideBar'

export const DefaultLayout = ({ children }) => {
  return (
    <Box as="main" display="flex">
      <MetaHead />
      <SideBar />
      <Container maxWidth="container.xl">{children}</Container>
    </Box>
  )
}
