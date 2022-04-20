import { Stack } from '@concave/ui'
import React from 'react'
import GcnvTitle from 'components/GcnvTitle'
import Placeholder from 'components/Placeholder'

function bond() {
  return (
    <Stack w="full">
      <GcnvTitle title="Dynamic Bond Market" description="" />
      <Placeholder text="Bonds" />
    </Stack>
  )
}

export default bond
