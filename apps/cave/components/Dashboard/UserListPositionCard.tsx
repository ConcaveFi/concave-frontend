import { Box, Flex, Input, Text } from '@concave/ui'
import ChooseButton from 'components/Marketplace/ChooseButton'
import { useState } from 'react'
import { STAKING_CONTRACT } from 'constants/address'
import { StakingV1Abi } from 'contracts/LiquidStaking/LiquidStakingAbi'
import { useAccount, useBalance, useContractWrite, useNetwork } from 'wagmi'
import { CNV } from 'gemswap-sdk'
import { useFetchApi } from 'hooks/cnvData'
import { useRouter } from 'next/router'

// const [lockData, lockCNV] = useContractRead(
//   {
//     addressOrName: '0x2B7Ea66d564399246Da8e3D6265dB8F89af834C8',
//     contractInterface: StakingV1Abi,
//   },
//   'lock',
//   {
//     args: [
//       account.address,
//       ethers.utils.parseEther(String(stakeInput)),
//       periodToPoolParameter[`${props.period}`],
//     ],
//   },
// )


const UserListPositionCard = () => {
  const [expirationDate, setExpirationDate] = useState('')
  const [listingDate, setListingDate] = useState('')
  return (
    <Box
      h={220}
      w={320}
      rounded="2xl"
      background={'linear-gradient(265.73deg, #274C63 0%, #182F3E 100%)'}
      shadow="up"
    >
      <Flex direction={'column'} h={200} mt={5} fontSize={14}>
        <Flex width={'full'} align="center" gap={3}>
          <Flex w={160} py={2} textAlign="end">
            <Text textColor={'text.low'} fontWeight={700} width={'full'}>
              Set Expiration Date:
            </Text>
          </Flex>
          <Flex justifyContent="center" alignItems={'center'}>
            <Input
              value={expirationDate}
              onChange={(result) => setExpirationDate(result.target.value)}
              width="110px"
              height="30px"
              borderRadius={'2xl'}
              pl="4"
            />
          </Flex>
        </Flex>

        <Flex width={'full'} align="center" gap={3}>
          <Flex w={160} py={2} textAlign="end">
            <Text textColor={'text.low'} fontWeight={700} width={'full'}>
              Set Listing Date:
            </Text>
          </Flex>
          <Flex justifyContent="center" alignItems={'center'}>
            <Input
              value={listingDate}
              onChange={(result) => setListingDate(result.target.value)}
              width="110px"
              height="30px"
              borderRadius={'2xl'}
              pl="4"
            />
          </Flex>
        </Flex>

        <Flex width={'full'} align="center" gap={3}>
          <Flex w={160} py={2} textAlign="end">
            <Text textColor={'text.low'} fontWeight={700} width={'full'}>
              Current Value:
            </Text>
          </Flex>
          <Flex
            width={'110px'}
            height="30px"
            shadow={'Up Small'}
            rounded="2xl"
            align="center"
            fontWeight={'700'}
            pl={'4'}
          >
            604 CNV
          </Flex>
        </Flex>

        <Flex width={'full'} align="center" gap={3}>
          <Flex w={160} py={2} textAlign="end">
            <Text textColor={'text.low'} fontWeight={700} width={'full'}>
              Discount:
            </Text>
          </Flex>
          <Flex
            width={'110px'}
            height="30px"
            shadow={'Up Small'}
            rounded="2xl"
            align="center"
            fontWeight={'700'}
            pl={'4'}
          >
            2,4%
          </Flex>
        </Flex>
        <Flex grow={1} justifyContent="center" alignItems={'end'} gap="2">
          <ChooseButton onClick={() => {}} title="List For Sale" backgroundType="blue" />
        </Flex>
      </Flex>
    </Box>
  )
}

export default UserListPositionCard
