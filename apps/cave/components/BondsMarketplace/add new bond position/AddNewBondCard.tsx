import { Button, Flex, Heading, Text } from '@concave/ui'
import { ButtonLink } from 'components/ButtonLink'
import React from 'react'
import { MdOutlineDashboard } from 'react-icons/md'

export function AddNewBondCard() {
  return (
    <>
      <Flex
        my={3}
        justify={'center'}
        flexDirection="column"
        maxWidth={{ sm: '185px', lg: '518px' }}
        align={'center'}
      ></Flex>
    </>
  )
}
