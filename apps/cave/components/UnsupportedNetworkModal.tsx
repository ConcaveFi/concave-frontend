import { Text, Button, Modal, Image } from '@concave/ui'
import dynamic from 'next/dynamic'
import { chain, useNetwork } from 'wagmi'

export const UnsupportedNetworkModal = dynamic(() =>
  Promise.resolve(() => {
    const { activeChain, switchNetwork, isSuccess } = useNetwork()

    return (
      <Modal
        bluryOverlay={true}
        title="Unsupported Network"
        titleAlign="center"
        isOpen={activeChain?.id && ![chain.mainnet.id, chain.rinkeby.id].includes(activeChain?.id)}
        onClose={() => {}}
        bodyProps={{ w: '350px', gap: 2 }}
        hideClose
      >
        <Text fontWeight="bold">Please switch to Ethereum</Text>
        <Button
          leftIcon={<Image w="20px" src={`/assets/tokens/eth.svg`} alt="" />}
          onClick={() => switchNetwork?.(chain.mainnet.id)}
          isDisabled={!switchNetwork}
          variant="secondary"
          p={3}
        >
          Connect to Ethereum
        </Button>
        {isSuccess && !switchNetwork && (
          <Text color="text.low" textAlign="center" fontWeight="medium" fontSize="sm">
            Looks like your wallet is locked, or it {`doesn't`} support programatically switching
            networks
            <br />
            Try switching directly in your wallet.
          </Text>
        )}
      </Modal>
    )
  }),
)
