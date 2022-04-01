import { Box, Container } from '@concave/ui'
import React from 'react'
import { MetaHead } from './MetaHead'
import { SideBar } from './SideBar/SideBar'

export const DefaultLayout = ({ children }) => {
  return (
    <Box as="main" display="flex">
      <MetaHead />
      <SideBar />
      <Container maxWidth="container.lg">{children}</Container>
    </Box>
  )
}
