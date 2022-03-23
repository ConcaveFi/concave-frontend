import { Button, Flex } from '@chakra-ui/react'
import { SubmittedIcon } from '@concave/icons'
import { Text } from '@concave/ui'
import React from 'react'
import { UseSwap } from './useSwap'

export const TransactionSubmitted = ({ swap, onClose }: { swap: UseSwap; onClose: () => void }) => {
  return (
    <>
      <SubmittedIcon w={10} mb={5} mt={12} />
      <Text align={'center'} fontSize={'24px'} fontWeight={600}>
        Transaction Submitted
        <Text fontWeight={400} fontSize={'18px'} textColor={'Highlight'}>
          View on Explorer
        </Text>
      </Text>

      <Flex>
        <Button
          onClick={onClose}
          borderRadius={'2xl'}
          variant="secondary"
          mt={4}
          w={'180px'}
          h={'60px'}
        >
          <Text fontWeight={600} fontSize={'24px'}>
            Close
          </Text>
        </Button>
      </Flex>
    </>
  )
}
