import { CloseButton, Flex, Text, Tooltip } from '@chakra-ui/react'
import { CloseIcon } from '@concave/icons'
import { NftSorter, NftSorterType } from './hooks/useNftSorter'

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
      _hover={!enabled && { bg: 'secondary.125', textColor: 'gray.300' }}
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
            onClick={() => onClick({ sorter: NftSorterType.NONE, order: 'ASC' })}
          />
        </Tooltip>
      )}
    </Flex>
  )
}
