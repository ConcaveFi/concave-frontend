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
      <SpinIcon __css={spinnerStyles} w={10} mb={5} />
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
        <Button
          onClick={onClose}
          borderRadius={'2xl'}
          shadow={
            '0px 5px 14px rgba(0, 0, 0, 0.47), 4px -7px 15px rgba(174, 177, 255, 0.13), inset -1px 1px 2px rgba(128, 186, 255, 0.24)'
          }
          w={'180px'}
          h={'60px'}
          bg={'linear-gradient(265.73deg, #274C63 0%, #182F3E 100%)'}
        >
          <Text fontWeight={600} fontSize={'24px'}>
            Close
          </Text>
        </Button>
      </Flex>
    </>
  )
}
