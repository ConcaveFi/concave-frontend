require('dotenv').config()

const CHAIN_IDS = {
  hardhat: 1337, // chain ID for hardhat testing
};

module.exports = {
  networks: {
    hardhat: {
      chainId: CHAIN_IDS.hardhat,
      forking: {
        url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_KEY}`, // url to RPC node,  - must be your API key
        blockNumber: 16385572, // a specific block number with which you want to work
      },
    },
  }
}
