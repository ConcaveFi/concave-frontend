import { Container, Flex } from '@chakra-ui/react'
import React from 'react'
import { Page } from '../components/Page'
import GcnvTitle from 'components/GcnvTitle'
import SuppliedAssetsCard from 'components/Lending/suppliedassets'
import YourBorrowAssetsCard from 'components/Lending/yourborrowassets'

function lending() {
  return (
    <Page>
      <Container maxW="container.lg">
        <Flex direction="column" gap={12}>
          <GcnvTitle title="Lending and Borrowing" description="placeholder" />
          <Flex gap={6} flexWrap="wrap" justify="left">
            <SuppliedAssetsCard buttonLabel={0} />

            <Flex gap={6} flexWrap="wrap" justify="right">
              <YourBorrowAssetsCard buttonLabel={0} />
            </Flex>
          </Flex>
        </Flex>
      </Container>
      <Container maxW="container.lg">
        <Flex direction="column" gap={12}>
          <GcnvTitle title="Supply" description="Earn interest on your deposit" />
        </Flex>
      </Container>
    </Page>
  )
}

export default lending
