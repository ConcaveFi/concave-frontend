import { AddressMap } from '../types'
import { ChainId } from '../enums'

export const STAKING_CONTRACT: AddressMap = {
  [ChainId.ETHEREUM]: '0x93c3A816242E50Ea8871A29BF62cC3df58787FBD',
  [ChainId.RINKEBY]: '0xb0f7D17A61b1fA6A91D855D6c28f809687Ae8a2F',
}

export const BOND_ADDRESS: AddressMap = {
  [ChainId.ETHEREUM]: '',
  [ChainId.ROPSTEN]: '0x82335F5F77D04b95AA09543Bc37Fa70269b0E1d1',
  [ChainId.RINKEBY]: '0x9B4147eb30daFc75CF4A5E33d1Ee72156790c917',
}

/*
  AMM LP Factory
*/
export const FACTORY_ADDRESS: AddressMap = {
  [ChainId.ETHEREUM]: '0x066a5cb7ddc6d55384e2f6ca13d5dd2cd2685cbd',
  [ChainId.ROPSTEN]: '0x541dca491E679514Ab582F5EfB2fCC72a754732a',
  [ChainId.RINKEBY]: '0x7479753A69828EBEDEDe9D6bB347519D422CF782',
}

/*
  AMM Router
*/
export const ROUTER_ADDRESS: AddressMap = {
  [ChainId.ETHEREUM]: '0x0a3e1c20b5384eb97d2ccff9a96bc91f0c77e7db',
  [ChainId.ROPSTEN]: '0x95dDC411d31bBeDd37e9aaABb335b0951Bc2D25a',
  [ChainId.RINKEBY]: '0xE7eBe364065fe297D90EBbA1292E7ba3624b830a',
}

export const CNV_ADDRESS: AddressMap = {
  [ChainId.ETHEREUM]: '0x000000007a58f5f58E697e51Ab0357BC9e260A04',
  [ChainId.ROPSTEN]: '0xB9CED3eB5Ce9d40A735cA3345978aB62Eca0c4d0',
  [ChainId.RINKEBY]: '0x4A8b871784A8e6344126F47d48283a87Ea987f27',
}

export const DAI_ADDRESS: AddressMap = {
  [ChainId.ETHEREUM]: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  [ChainId.RINKEBY]: '0xe1776Da3FBe3bBf198263Cb053d589FC3cfe1b30',
  [ChainId.ROPSTEN]: '0xb9ae584F5A775B2F43C79053A7887ACb2F648dD4',
  [ChainId.KOVAN]: '0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa',
  [ChainId.MATIC]: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
  [ChainId.FANTOM]: '0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E',
  [ChainId.BSC]: '0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3',
  [ChainId.HARMONY]: '0xEf977d2f931C1978Db5F6747666fa1eACB0d0339',
  [ChainId.HECO]: '0x3D760a45D0887DFD89A2F5385a236B29Cb46ED2a',
  [ChainId.OKEX]: '0x21cDE7E32a6CAF4742d00d44B07279e7596d26B9',
  [ChainId.XDAI]: '0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d',
  [ChainId.ARBITRUM]: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
  [ChainId.AVALANCHE]: '0xd586E7F844cEa2F87f50152665BCbc2C279D8d70',
  [ChainId.CELO]: '0x90Ca507a5D4458a4C6C6249d186b6dCb02a5BCCd',
  [ChainId.MOONRIVER]: '0x80A16016cC4A2E6a2CACA8a4a498b1699fF0f844',
  [ChainId.FUSE]: '0x94Ba7A27c7A95863d1bdC7645AC2951E0cca06bA',
  [ChainId.MOONBEAM]: '0xc234A67a4F840E61adE794be47de455361b52413',
}

export const USDC_ADDRESS: AddressMap = {
  [ChainId.ETHEREUM]: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  [ChainId.ROPSTEN]: '0x0D9C8723B343A8368BebE0B5E89273fF8D712e3C',
  [ChainId.KOVAN]: '0xb7a4F3E9097C08dA09517b5aB877F7a917224ede',
  [ChainId.MATIC]: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
  [ChainId.FANTOM]: '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75',
  [ChainId.BSC]: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
  [ChainId.HARMONY]: '0x985458E523dB3d53125813eD68c274899e9DfAb4',
  [ChainId.HECO]: '0x9362Bbef4B8313A8Aa9f0c9808B80577Aa26B73B',
  [ChainId.OKEX]: '0xc946DAf81b08146B1C7A8Da2A851Ddf2B3EAaf85',
  [ChainId.XDAI]: '0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83',
  [ChainId.ARBITRUM]: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
  [ChainId.AVALANCHE]: '0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664',
  [ChainId.MOONRIVER]: '0xE3F5a90F9cb311505cd691a46596599aA1A0AD7D',
  [ChainId.CELO]: '0xef4229c8c3250C675F21BCefa42f58EfbfF6002a',
  [ChainId.TELOS]: '0x818ec0A7Fe18Ff94269904fCED6AE3DaE6d6dC0b',
  [ChainId.FUSE]: '0x620fd5fa44BE6af63715Ef4E65DDFA0387aD13F5',
  [ChainId.MOONBEAM]: '0x8f552a71EFE5eeFc207Bf75485b356A0b3f01eC9',
}

export const WETH9_ADDRESS: AddressMap = {
  [ChainId.ETHEREUM]: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  [ChainId.ROPSTEN]: '0xc778417E063141139Fce010982780140Aa0cD5Ab',
  [ChainId.RINKEBY]: '0xc778417E063141139Fce010982780140Aa0cD5Ab',
  [ChainId.GÖRLI]: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
  [ChainId.KOVAN]: '0xd0A1E359811322d97991E03f863a0C30C2cF029C',
  [ChainId.ARBITRUM]: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
  [ChainId.ARBITRUM_TESTNET]: '0xf8456e5e6A225C2C1D74D8C9a4cB2B1d5dc1153b',
  [ChainId.BSC]: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
  [ChainId.FANTOM]: '0x74b23882a30290451A17c44f4F05243b6b58C76d',
  [ChainId.MATIC]: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
  [ChainId.OKEX]: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
  [ChainId.HECO]: '0x64FF637fB478863B7468bc97D30a5bF3A428a1fD',
  [ChainId.HARMONY]: '0x6983D1E6DEf3690C4d616b13597A09e6193EA013',
  [ChainId.XDAI]: '0x6A023CCd1ff6F2045C3309768eAd9E68F978f6e1',
  [ChainId.AVALANCHE]: '0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB',
  [ChainId.PALM]: '0x726138359C17F1E56bA8c4F737a7CAf724F6010b',
  [ChainId.CELO]: '0x122013fd7dF1C6F636a5bb8f03108E876548b455',
  [ChainId.MOONRIVER]: '0x639A647fbe20b6c8ac19E48E2de44ea792c62c5C',
  [ChainId.TELOS]: '0xfA9343C3897324496A05fC75abeD6bAC29f8A40f',
  [ChainId.FUSE]: '0xa722c13135930332Eb3d749B2F0906559D2C5b99',
  [ChainId.MOONBEAM]: '0x30D2a9F5FDf90ACe8c17952cbb4eE48a55D916A7',
}

export const WNATIVE_ADDRESS: AddressMap = {
  [ChainId.ETHEREUM]: WETH9_ADDRESS[ChainId.ETHEREUM],
  [ChainId.ROPSTEN]: WETH9_ADDRESS[ChainId.ROPSTEN],
  [ChainId.RINKEBY]: WETH9_ADDRESS[ChainId.RINKEBY],
  [ChainId.GÖRLI]: WETH9_ADDRESS[ChainId.GÖRLI],
  [ChainId.KOVAN]: WETH9_ADDRESS[ChainId.KOVAN],
  [ChainId.ARBITRUM]: WETH9_ADDRESS[ChainId.ARBITRUM],
  [ChainId.ARBITRUM_TESTNET]: WETH9_ADDRESS[ChainId.ARBITRUM_TESTNET],
  [ChainId.FANTOM]: '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83',
  [ChainId.FANTOM_TESTNET]: '0xf1277d1Ed8AD466beddF92ef448A132661956621',
  [ChainId.MATIC]: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
  [ChainId.MATIC_TESTNET]: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
  [ChainId.XDAI]: '0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d',
  [ChainId.BSC]: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
  [ChainId.BSC_TESTNET]: '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',
  [ChainId.MOONBEAM_TESTNET]: '0x372d0695E75563D9180F8CE31c9924D7e8aaac47',
  [ChainId.AVALANCHE]: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
  [ChainId.AVALANCHE_TESTNET]: '0xd00ae08403B9bbb9124bB305C09058E32C39A48c',
  [ChainId.HECO]: '0x5545153CCFcA01fbd7Dd11C0b23ba694D9509A6F',
  [ChainId.HECO_TESTNET]: '0x5B2DA6F42CA09C77D577a12BeaD0446148830687',
  [ChainId.HARMONY]: '0xcF664087a5bB0237a0BAd6742852ec6c8d69A27a',
  [ChainId.HARMONY_TESTNET]: '0x7a2afac38517d512E55C0bCe3b6805c10a04D60F',
  [ChainId.OKEX]: '0x8F8526dbfd6E38E3D8307702cA8469Bae6C56C15',
  [ChainId.OKEX_TESTNET]: '0x2219845942d28716c0F7C605765fABDcA1a7d9E0',
  [ChainId.PALM]: '0xF98cABF0a963452C5536330408B2590567611a71',
  [ChainId.CELO]: '0x471EcE3750Da237f93B8E339c536989b8978a438',
  [ChainId.MOONRIVER]: '0xf50225a84382c74CbdeA10b0c176f71fc3DE0C4d',
  [ChainId.FUSE]: '0x0BE9e53fd7EDaC9F859882AfdDa116645287C629',
  [ChainId.TELOS]: '0xD102cE6A4dB07D247fcc28F366A623Df0938CA9E',
  [ChainId.MOONBEAM]: '0xAcc15dC74880C9944775448304B263D191c6077F',
}

export const USDT_ADDRESS: AddressMap = {
  [ChainId.ETHEREUM]: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  [ChainId.ROPSTEN]: '0x110a13FC3efE6A245B50102D2d79B3E76125Ae83',
  [ChainId.KOVAN]: '0x07de306FF27a2B630B1141956844eB1552B956B5',
  [ChainId.MATIC]: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
  [ChainId.FANTOM]: '0x049d68029688eAbF473097a2fC38ef61633A3C7A',
  [ChainId.BSC]: '0x55d398326f99059fF775485246999027B3197955',
  [ChainId.HARMONY]: '0x3C2B8Be99c50593081EAA2A724F0B8285F5aba8f',
  [ChainId.HECO]: '0xa71EdC38d189767582C38A3145b5873052c3e47a',
  [ChainId.OKEX]: '0x382bB369d343125BfB2117af9c149795C6C65C50',
  [ChainId.XDAI]: '0x4ECaBa5870353805a9F068101A40E0f32ed605C6',
  [ChainId.ARBITRUM]: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
  [ChainId.AVALANCHE]: '0xc7198437980c041c805A1EDcbA50c1Ce5db95118',
  [ChainId.CELO]: '0x88eeC49252c8cbc039DCdB394c0c2BA2f1637EA0',
  [ChainId.MOONRIVER]: '0xB44a9B6905aF7c801311e8F4E76932ee959c663C',
  [ChainId.TELOS]: '0xeFAeeE334F0Fd1712f9a8cc375f427D9Cdd40d73',
  [ChainId.FUSE]: '0xFaDbBF8Ce7D5b7041bE672561bbA99f79c532e10',
  [ChainId.MOONBEAM]: '0x8e70cd5b4ff3f62659049e74b6649c6603a0e594',
}
