import { CloseButton, Flex, Text, Tooltip } from '@chakra-ui/react'
import { CloseIcon } from '@concave/icons'
import { NftSort, NftSortMethod } from './hooks/useNftSort'

type SorterButton = {
  title: string
  sorter: NftSort
  enabled: boolean
  onClick: (sorter: NftSort) => void
}

export const SorterButton = ({ sorter, title, enabled, onClick }: SorterButton) => {
  return (
    <Flex
      width="full"
      p={1}
      textColor={enabled ? 'white' : 'text.low'}
      rounded="lg"
      _hover={!enabled && { shadow: 'Up Small', textColor: 'gray.300' }}
      px={2}
      cursor={!enabled && 'pointer'}
      transition={'.4s all'}
      onClick={() => !enabled && onClick(sorter)}
      align="center"
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
      {enabled && (
        <Tooltip
          label="Remove Sorter"
          textColor={'white'}
          textShadow="0px 0px 10px #333"
          bg="text.low"
          fontWeight={'bold'}
        >
          <CloseIcon
            width={'12px'}
            height="12px"
            cursor={'pointer'}
            color="text.low"
            onClick={() => onClick({ sort: NftSortMethod.NONE, order: 'ASC' })}
          />
        </Tooltip>
      )}
    </Flex>
  )
}
