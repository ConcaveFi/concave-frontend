import { Flex, Text } from '@chakra-ui/react'
import { NftSorter } from './hooks/useNftSorter'

type SorterButton = {
  title: string
  sorter: NftSorter
  enabled: boolean
  onClick: (sorter: NftSorter) => void
}

export const SorterButton = ({ sorter, title, enabled, onClick }: SorterButton) => {
  return (
    <Flex
      width="full"
      p={1}
      textColor={enabled ? 'white' : 'text.low'}
      _hover={{ bg: 'secondary.125', textColor: 'gray.300' }}
      px={2}
      cursor="pointer"
      transition={'.4s all'}
      onClick={() => onClick(sorter)}
    >
      <Text
        userSelect="none"
        fontWeight={'bold'}
        fontSize={'14px'}
        textAlign={'start'}
        width="full"
      >
        {title}
      </Text>
    </Flex>
  )
}
