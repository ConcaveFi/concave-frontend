import { Flex, Text, Tooltip } from '@chakra-ui/react'
import { CloseIcon } from '@concave/icons'
import { NftSort } from './hooks/useNftSort'

type SortOptionProps = {
  title: string
  sorter: NftSort
  enabled: boolean
  onClick: (sorter: NftSort) => void
}

export const SortOption = ({ sorter, title, enabled, onClick }: SortOptionProps) => {
  return (
    <Flex
      width="full"
      // py={'2px'}
      textColor={enabled ? 'white' : 'gray.500'}
      _hover={!enabled && { bg: 'blue.300', textColor: 'white' }}
      px={4}
      flex={1}
      cursor={!enabled && 'pointer'}
      transition={'.4s all'}
      onClick={() => !enabled && onClick(sorter)}
      align="center"
    >
      <Text userSelect="none" fontWeight={'bold'} fontSize={'sm'} textAlign={'start'} width="full">
        {title}
      </Text>
      {enabled && (
        <Tooltip
          label="Remove sort"
          textColor={'white'}
          textShadow="0px 0px 10px #333"
          bg="text.low"
          fontWeight={'bold'}
        >
          <CloseIcon
            mt={-1}
            width={'12px'}
            height="12px"
            cursor={'pointer'}
            color="text.low"
            onClick={() => onClick(undefined)}
          />
        </Tooltip>
      )}
    </Flex>
  )
}
