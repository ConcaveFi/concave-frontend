import { Box, Collapse, Flex, useDisclosure } from '@concave/ui'
import DividendsShare from './UserPosition/StakingRewards'
import MarketplaceListing from './UserPosition/MarketplaceListing'
import NftPositionContainer from './UserPosition/NftPositionContainer'
import RedeemCardViewer from './UserPosition/RedeemViewer'
import { useState } from 'react'

export type nftContract = {
  maturity: number
  poolID: number
  shares: { _hex: string; _isBigNumber: boolean }
  rewardDebt: { _hex: string; _isBigNumber: boolean }
}

interface NftPositionCardProps {
  contract: nftContract
}

const UserPositionCard = (props: NftPositionCardProps) => {
  const { contract } = props
  const { maturity, poolID, shares, rewardDebt } = contract

  const sharesDecimals = parseInt(shares?._hex, 16) / 1000000000000000000
  const gained = parseInt(rewardDebt?._hex, 16) / 1000000000000000000

  const dateToRedeem = epochConverter(maturity)
  const currentData = new Date()
  const redeemIn = dateToRedeem.getTime() - currentData.getTime()
  const [active, setActive] = useState(true)

  return (
    <Box
      pos={'relative'}
      borderRadius={'2xl'}
      // width={{ lg: '700px', md: '520px' }}
      maxHeight={{ lg: '300px', md: '400px' }}
      bg={'linear-gradient(223.18deg, #19394C 27.18%, #0A161F 96.11%)'}
      mr={1}
      mb={3}
    >
      <Flex shadow={'down'} bgSize="20% 30%" bgImage={'/assets/textures/metal.png'} rounded="2xl">
        <Box
          bg="linear-gradient(265.73deg, #274C63 0%, #182F3E 100%)"
          rounded="2xl"
          maxWidth={{ lg: '550px', md: '380px' }}
        >
          <Flex bgSize="20% 30%" bgImage={'/assets/textures/metal.png'} shadow={'up'} rounded="2xl">
            <Flex direction={'column'}>
              <NftPositionContainer
                onChange={() => setActive(!active)}
                stakeType={poolID}
                redeemIn={redeemIn}
              />
              <Collapse in={active}>
                <RedeemCardViewer gained={gained} redeemIn={redeemIn} initial={sharesDecimals} />
                <MarketplaceListing />
              </Collapse>
            </Flex>
          </Flex>
        </Box>
        <Collapse in={active}>
          <DividendsShare />
        </Collapse>
      </Flex>
    </Box>
  )
}
export default UserPositionCard

const epochConverter = (epoch: number) => {
  const timeInMillis = epoch * 1000
  const dateFromEpoch = new Date(timeInMillis)
  return dateFromEpoch
}
