import { Flex, Text } from '@concave/ui'
import { CNV } from '@concave/core'
import useAddTokenToWallet, { injectedTokenResponse } from 'hooks/useAddTokenToWallet'
import { useConnect } from 'wagmi'
import { GlassPanel } from '../TreasuryManagementCard'

export default function RedeemMobileCard() {
  const [{ data }] = useConnect()

  // TODO make token chain dinamic, refactor useAddTokenToWallet hook
  const { loading: loadingtoWallet, addingToWallet }: injectedTokenResponse = useAddTokenToWallet({
    tokenAddress: CNV[1].address,
    tokenChainId: CNV[1].chainId,
  })

  return (
    <GlassPanel
      textShadow="0px 0px 27px rgba(129, 179, 255, 0.31)"
      width={'340px'}
      height="350px"
      direction={'column'}
      align={'center'}
    >
      <Text fontSize={'2xl'} mx="auto" my={'5'} fontWeight="bold">
        Redeem CNV
      </Text>
      <Text textColor={'text.low'} fontWeight="bold">
        Redeem your tokens for CNV below
      </Text>
      <Flex direction="column" gap={3} my={6}>
        <RedeemButton onClick={() => {}} title="aCNV" value={0} />
        <RedeemButton onClick={() => {}} title="pCNV" value={0} />
        <RedeemButton onClick={() => {}} title="bbtCNV" value={0} />
      </Flex>
      <Text
        fontWeight={'bold'}
        textColor="text.low"
        fontSize={'lg'}
        onClick={addingToWallet}
        cursor="pointer"
      >
        Add CNV to your {data?.connector?.name}
      </Text>
    </GlassPanel>
  )
}

interface RedeemButtonProps {
  onClick: () => void
  title: string
  value: string | number
}
const RedeemButton = (props: RedeemButtonProps) => {
  return (
    <GlassPanel
      onClick={props.onClick}
      width="300px"
      height={'40px'}
      rounded={'full'}
      _active={{ transform: 'scale(0.95)' }}
      transition="all 0.3s"
      justify={'center'}
      align="center"
      cursor={'pointer'}
      userSelect="none"
    >
      <Text fontWeight={'bold'} fontSize="xl">
        {props.title + ' - ' + props.value}
      </Text>
    </GlassPanel>
  )
}
