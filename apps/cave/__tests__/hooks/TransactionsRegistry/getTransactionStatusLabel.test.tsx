import { StoredTransaction } from '@pcnv/txs-react'
import { getTransactionStatusLabel } from '../../../contexts/Transactions/getTransactionStatusLabel'

describe('Test getTransactionsStatusLabel', () => {
  it('Simulate a nonexistent meta.type, util when name of type is updated', () => {
    const oldValueOnLocalstorage = {
      hash: '0xd9b9ce9c1b60b16dfb14ec73bd6753535a2d00d4ec45a208aedeb56d78b5dc3d',
      chainId: 4,
      sentAt: 1657321362419,
      status: 'confirmed',
      minConfirmations: 1,
      meta: { type: 'list position', action: 'sale', tokenId: 379 },
    } satisfies StoredTransaction

    const label = getTransactionStatusLabel(oldValueOnLocalstorage)
    expect(label).toBeDefined()
  })

  it('Simulate a approve', () => {
    const approve = {
      hash: '0x7b2d96d6466f69e6ed175a0157a2cc108fa94a4a0e144935bf13a321ec28b061',
      chainId: 4,
      sentAt: 1657326230644,
      status: 'confirmed',
      minConfirmations: 1,
      meta: { type: 'approve', tokenSymbol: 'CNV-LP' },
    } satisfies StoredTransaction

    const label = getTransactionStatusLabel(approve)
    expect(label).toBeDefined()
  })
})
