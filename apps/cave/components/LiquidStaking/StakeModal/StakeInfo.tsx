import { Box, Text, Stack } from '@concave/ui'
import React from 'react'

const periodToBondRevenueMapping = {
  '360 days': '100%',
  '180 days': '75%',
  '90 days': '50%',
  '45 days': '25%',
}

const periodToDaysMapping = {
  '360 days': 360,
  '180 days': 180,
  '90 days': 90,
  '45 days': 45,
}

const periodToRewardsBoost = {
  '360 days': '2x',
  '180 days': '1.75x',
  '90 days': '1.5x',
  '45 days': '1.25x',
}

function addDays(date, days) {
  var result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

function StakeInfo(props: any) {
  return (
    <Box shadow="up" px={2} py={4} borderRadius="3xl" filter="drop-shadow(0px 0px 27px #81b3ff4f)">
      <Box px={4}>
        <Stack isInline spacing={6}>
          <Stack spacing="1px">
            <Text textAlign="left" fontSize="3xl" fontWeight="bold">
              {/* {props.period} */}
              {periodToRewardsBoost[`${props.period}`]}
            </Text>
            <Text color="text.low" fontSize="sm">
              Rewards Boost
            </Text>
          </Stack>
          <Stack spacing="1px">
            <Text textAlign="left" fontSize="3xl" fontWeight="bold">
              {periodToBondRevenueMapping[`${props.period}`]}
            </Text>
            <Text color="text.low" fontSize="sm">
              Share of Bonding Revenue
            </Text>
          </Stack>
        </Stack>
        <Text mt={6} color="text.low" fontSize="sm">
          The {props.period} staking term will accrue CNV from bond emissions by capturing{` `}
          {periodToBondRevenueMapping[props.period]} of the growth generated from purchased bonds
          every 8 hours. Additionally, the {props.period} term receives a{` `}
          {periodToRewardsBoost[props.period]} boost on base CNV emissions and the quarterly
          dividend derived from protocol profits in non CNV assets.
        </Text>

        <Text mt={5} color="text.low" fontSize="sm" fontWeight="semibold">
          {/* Redeem Date: {props.period} */}
          Redeem Date:{' '}
          {addDays(Date(), periodToDaysMapping[`${props.period}`]).toISOString().slice(0, 10)}
        </Text>
      </Box>

      <Stack mt={4}>
        <Stack px={4} color="text.low" fontSize={12} isInline justify="space-between" mt={3}>
          <Text fontSize="sm">Currently Staked</Text>
          <Text fontSize="sm">Staking Cap</Text>
        </Stack>
        <Box shadow="down" borderRadius="2xl" p={1} position="relative">
          <Box
            shadow="up"
            px={4}
            py={1}
            borderRadius="2xl"
            textAlign="left"
            bg="secondary.50"
            w={`${props.capPercentage}%`}
            fontSize="sm"
          >
            <Text w="150px">{props.stakedCNV} CNV</Text>
          </Box>

          <Text position="absolute" right="4" top="2" fontSize="sm">
            {props.CNVCap} CNV
          </Text>
        </Box>
      </Stack>
    </Box>
  )
}

export default StakeInfo
