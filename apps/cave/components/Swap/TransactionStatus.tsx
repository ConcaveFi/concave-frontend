import { Button, Flex } from '@chakra-ui/react'
import { keyframes } from '@chakra-ui/system'
import { SpinIcon } from '@concave/icons'
import { Text } from '@concave/ui'
import React from 'react'
import { UseSwap } from './useSwap'

const spin = keyframes({
  '0%': {
    transform: 'rotate(0deg)',
  },
  '100%': {
    transform: 'rotate(360deg)',
  },
})

const spinnerStyles = {
  animation: `${spin} 2s linear infinite`,
}
export const TransactionStatus = ({ swap, onClose }: { swap: UseSwap; onClose: () => void }) => {
  return (
    <>
      <SpinIcon __css={spinnerStyles} w={10} mb={5} mt={12} />
      <Text fontSize={'24px'} fontWeight={600}>
        Waiting For Confirmation
      </Text>
      <Text fontWeight={400} fontSize={'18px'} textColor={'Highlight'}>
        Supplying 160.062 DAI.e and 2 AVAX
      </Text>
      <Text mt={5} mb={5} fontWeight={400} textColor={'#5F7A99'} fontSize={'18px'}>
        Confirm this transaction in your wallet
      </Text>
      <Flex>
        <Button onClick={onClose} variant="secondary" borderRadius={'2xl'} w={'180px'} h={'60px'}>
          <Text fontWeight={600} fontSize={'24px'}>
            Close
          </Text>
        </Button>
      </Flex>
    </>
  )
}
