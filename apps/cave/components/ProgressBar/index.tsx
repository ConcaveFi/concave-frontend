import { Box, Flex } from '@concave/ui'
import { Percent } from '@concave/core'
import { LockedIcon, UnlockedIcon } from '@concave/icons'
import { HStack } from '@concave/ui'

export const ProgressBar = ({ percent }: { percent: Percent }) => {
  return (
    <HStack mx={2}>
      <LockedIcon h={`18px`} w={'18px'} />
      <Flex w={'full'} mx="auto" rounded={'2xl'} shadow="down" h={3} p={0.5}>
        <Box
          width={`100%`}
          height="full"
          backgroundImage={'/assets/liquidstaking/progress.svg'}
          backgroundRepeat={'repeat-x'}
          rounded="full"
          backgroundPosition={'center'}
        >
          <Box
            width={`${percent.toFixed()}%`}
            maxW={`full`}
            height="full"
            bg={'stroke.accent'}
            rounded="full"
          />
        </Box>
      </Flex>
      <UnlockedIcon />
    </HStack>
  )
}
