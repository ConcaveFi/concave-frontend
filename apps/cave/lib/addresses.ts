import { chain } from 'wagmi'

export const addresses = {
  [chain.mainnet.id]: {
    frax: '0x853d955aCEf822Db058eb8505911ED77F175b99e',
    dai: '0x6b175474e89094c44da98b954eedeac495271d0f',
    bbtCNV: '0x0000000012a0592C154D552C410030E724b2eA00',
    aCNV: '0x6ff0106d34feee8a8acf2e7b9168480f86b82e2f',
  },
  [chain.ropsten.id]: {
    frax: '0xE7E9F348202f6EDfFF2607025820beE92F51cdAA',
    dai: '0x7B731FFcf1b9C6E0868dA3F1312673A12Da28dc5',
    bbtCNV: '0xc32baea7792bf39b8b89fa33a108d2064db43ee5',
    aCNV: '0x6c64efbbaea3ebec73588a8e20cf058344f5f1cf',
  },
}
