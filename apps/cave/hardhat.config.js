const CHAIN_IDS = {
  hardhat: 1337, // chain ID for hardhat testing
};

module.exports = {
  networks: {
    hardhat: {
      chainId: CHAIN_IDS.hardhat,
      forking: {
        url: `https://eth-mainnet.alchemyapi.io/v2/wMAXm9ehOGO9DDgYYyO9emzLJzrzsmIh`, // url to RPC node, ${ALCHEMY_KEY} - must be your API key
        blockNumber: 15654650, // a specific block number with which you want to work
      },
    },
  }
}


